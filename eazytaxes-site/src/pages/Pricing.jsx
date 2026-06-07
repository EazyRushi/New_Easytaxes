import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

/* ─── Data ─────────────────────────────────────────────────────── */

const plans = [
  {
    name: 'Starter',
    monthlyPrice: 149,
    annualPrice: 119,
    desc: 'Perfect for freelancers, solopreneurs, and side-hustles that need clean books and a filed return.',
    accent: 'border-gray-200',
    popular: false,
    cta: 'Get Started',
    ctaClass: 'bg-gray-900 hover:bg-gray-700 text-white',
    iconBg: 'bg-gray-100',
    iconColor: 'text-gray-600',
    icon: 'person',
  },
  {
    name: 'Growth',
    monthlyPrice: 299,
    annualPrice: 239,
    desc: 'For growing small businesses with employees that need payroll, tax planning, and proactive advice.',
    accent: 'border-brand-orange',
    popular: true,
    cta: 'Start Free Trial',
    ctaClass: 'bg-brand-orange hover:bg-brand-orangeDark text-white shadow-[0_6px_25px_rgba(250,130,0,0.4)]',
    iconBg: 'bg-orange-50',
    iconColor: 'text-brand-orange',
    icon: 'trending_up',
  },
  {
    name: 'Enterprise',
    monthlyPrice: 599,
    annualPrice: 479,
    desc: 'For established companies that need the full stack — fractional CFO, SOC 2, unlimited payroll.',
    accent: 'border-gray-200',
    popular: false,
    cta: 'Contact Sales',
    ctaClass: 'bg-gray-900 hover:bg-gray-700 text-white',
    iconBg: 'bg-gray-100',
    iconColor: 'text-gray-600',
    icon: 'domain',
  },
];

const featureRows = [
  {
    category: 'Bookkeeping', icon: 'menu_book',
    features: [
      { label: 'Monthly bank reconciliation',               starter: true,        growth: true,       enterprise: true },
      { label: 'Financial statements (P&L, balance sheet)', starter: true,        growth: true,       enterprise: true },
      { label: 'Accounts payable & receivable tracking',    starter: false,       growth: true,       enterprise: true },
      { label: 'Inventory accounting',                      starter: false,       growth: false,      enterprise: true },
    ],
  },
  {
    category: 'Tax Services', icon: 'receipt_long',
    features: [
      { label: 'Annual business tax return',                starter: true,        growth: true,       enterprise: true },
      { label: 'Federal & state filings, all 50 states',   starter: true,        growth: true,       enterprise: true },
      { label: 'Quarterly estimated tax payments',          starter: false,       growth: true,       enterprise: true },
      { label: 'Tax strategy & planning sessions',          starter: false,       growth: true,       enterprise: true },
      { label: 'R&D tax credit analysis',                   starter: false,       growth: false,      enterprise: true },
      { label: 'Multi-state nexus compliance',              starter: false,       growth: false,      enterprise: true },
    ],
  },
  {
    category: 'Payroll', icon: 'payments',
    features: [
      { label: 'Payroll processing',                        starter: false,       growth: true,       enterprise: true },
      { label: 'Number of employees',                       starter: '—',         growth: 'Up to 10', enterprise: 'Unlimited' },
      { label: 'Direct deposit & paystubs',                 starter: false,       growth: true,       enterprise: true },
      { label: 'Payroll tax filings (940, 941)',            starter: false,       growth: true,       enterprise: true },
      { label: 'W-2 & 1099 preparation',                   starter: false,       growth: true,       enterprise: true },
    ],
  },
  {
    category: 'Advisory', icon: 'lightbulb',
    features: [
      { label: 'Dedicated accountant',                      starter: true,        growth: true,       enterprise: true },
      { label: 'Monthly CFO check-in call',                 starter: false,       growth: true,       enterprise: true },
      { label: 'Fractional CFO service',                    starter: false,       growth: false,      enterprise: true },
      { label: 'Investor-ready financials',                 starter: false,       growth: false,      enterprise: true },
      { label: 'Budget & cash-flow forecasting',            starter: false,       growth: true,       enterprise: true },
    ],
  },
  {
    category: 'Compliance & Audit', icon: 'shield',
    features: [
      { label: 'Audit support & representation',            starter: true,        growth: true,       enterprise: true },
      { label: 'IRS correspondence handling',               starter: true,        growth: true,       enterprise: true },
      { label: 'SOC 2 readiness consulting',                starter: false,       growth: false,      enterprise: true },
      { label: 'Workers comp audit support',                starter: false,       growth: true,       enterprise: true },
    ],
  },
  {
    category: 'Support', icon: 'support_agent',
    features: [
      { label: 'Email & chat support',                      starter: true,        growth: true,       enterprise: true },
      { label: 'Phone support',                             starter: false,       growth: true,       enterprise: true },
      { label: 'Priority response (< 4 hrs)',               starter: false,       growth: true,       enterprise: true },
      { label: 'Dedicated account manager',                 starter: false,       growth: false,      enterprise: true },
    ],
  },
];

const faqs = [
  { q: 'Is there a free trial?', a: 'Yes. Growth and Starter plans come with a 30-day free trial. No credit card required to start.' },
  { q: 'Can I switch plans later?', a: 'Absolutely. You can upgrade or downgrade at any time. Changes take effect at the start of your next billing cycle.' },
  { q: 'What if I need services not listed?', a: 'Contact our team — we offer custom engagements for businesses with unique needs such as multi-entity structures, international operations, or M&A transactions.' },
  { q: 'Do annual plans auto-renew?', a: 'Yes, both monthly and annual plans renew automatically. You can cancel at any time from your account dashboard with no cancellation fee.' },
  { q: 'What accounting software do you support?', a: 'We work with QuickBooks Online, Xero, FreshBooks, Wave, and can migrate you from any platform as part of onboarding.' },
  { q: 'Is my data secure?', a: 'Yes. We use 256-bit encryption, two-factor authentication, and bank-level security protocols to protect all client data.' },
];

const testimonials = [
  { quote: 'Switching to EazyTaxes saved us $12,000 in our first year. The quarterly strategy sessions alone are worth it.', name: 'Marcus Rivera', role: 'CEO, Rivera Construction', plan: 'Growth' },
  { quote: 'As a freelancer, taxes used to terrify me. Now I send my docs and everything is handled.', name: 'Priya Patel', role: 'Independent Consultant', plan: 'Starter' },
  { quote: 'The fractional CFO service gave us investor-ready financials that helped us close our Series A.', name: 'Jordan Lee', role: 'Founder, NexaFlow', plan: 'Enterprise' },
];

/* ─── Sub-components ────────────────────────────────────────────── */

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-5 text-left gap-4 group">
        <span className="font-bold text-gray-900 text-[15px] group-hover:text-brand-orange transition-colors">{q}</span>
        <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.2 }}
          className="material-symbols-outlined text-brand-orange flex-shrink-0 text-2xl">add</motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25, ease: 'easeInOut' }} className="overflow-hidden">
            <p className="pb-5 text-gray-500 leading-relaxed text-sm">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function CheckCell({ value }) {
  if (value === true) return (
    <span className="material-symbols-outlined text-emerald-500 text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
  );
  if (value === false) return <span className="material-symbols-outlined text-gray-200 text-[20px]">remove</span>;
  return <span className="text-[13px] font-bold text-gray-700">{value}</span>;
}

/* ─── Page ──────────────────────────────────────────────────────── */

export default function Pricing() {
  const [annual, setAnnual] = useState(false);
  const [openCategory, setOpenCategory] = useState(null);

  return (
    <div className="w-full bg-white text-gray-900 font-body overflow-x-clip">

      {/* ══════════════════════════════════════════════════ */}
      {/* HERO */}
      {/* ══════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-gray-900 pt-32 pb-28 text-center">
        {/* Dot grid */}
        <div className="absolute inset-0 opacity-[0.06]" style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 0)',
          backgroundSize: '28px 28px'
        }} />
        {/* Orange glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-brand-orange/20 blur-[120px] pointer-events-none" />

        <div className="relative max-w-[800px] mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
            <span className="inline-flex items-center gap-2 bg-white/10 border border-white/15 text-white/80 text-xs font-bold px-4 py-2 rounded-full mb-8 uppercase tracking-widest">
              <span className="material-symbols-outlined text-brand-orange text-[14px]">verified</span>
              Transparent Pricing — No Surprises
            </span>
            <h1 className="text-5xl md:text-[4rem] lg:text-[4.5rem] font-extrabold text-white leading-[1.1] mb-6">
              Simple, flat-rate plans.<br />
              <span className="text-brand-orange italic font-normal">No surprise bills.</span>
            </h1>
            <p className="text-lg text-gray-400 max-w-xl mx-auto mb-10 leading-relaxed">
              Every plan includes a dedicated accountant, real-time financials, and year-round support. Pick the plan that fits where your business is today.
            </p>

            {/* Toggle */}
            <div className="inline-flex items-center gap-1 bg-white/10 border border-white/15 rounded-full p-1">
              <button onClick={() => setAnnual(false)}
                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${!annual ? 'bg-white text-gray-900 shadow-md' : 'text-white/60 hover:text-white'}`}>
                Monthly
              </button>
              <button onClick={() => setAnnual(true)}
                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all flex items-center gap-2 ${annual ? 'bg-white text-gray-900 shadow-md' : 'text-white/60 hover:text-white'}`}>
                Annual
                <span className="bg-brand-orange text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full">Save 20%</span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════ */}
      {/* PRICING CARDS */}
      {/* ══════════════════════════════════════════════════ */}
      <section className="bg-[#f8f8f8] pt-0 pb-24">
        <div className="max-w-[1100px] mx-auto px-6">
          {/* Cards float up over hero */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 -mt-14 items-stretch">
            {plans.map((plan, idx) => (
              <motion.div key={plan.name}
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + idx * 0.1 }}
                className={`relative flex flex-col rounded-2xl border-2 bg-white overflow-hidden ${plan.accent} ${plan.popular ? 'shadow-[0_20px_60px_rgba(250,130,0,0.18)]' : 'shadow-[0_8px_40px_rgba(0,0,0,0.07)]'} ${plan.popular ? 'md:-mt-6' : ''}`}
              >
                {plan.popular && (
                  <div className="bg-brand-orange text-white text-center py-2.5 text-xs font-extrabold uppercase tracking-widest">
                    ★ Most Popular
                  </div>
                )}

                <div className="p-8 flex flex-col flex-1">
                  {/* Plan header */}
                  <div className="flex items-center gap-3 mb-5">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${plan.iconBg}`}>
                      <span className={`material-symbols-outlined text-[20px] ${plan.iconColor}`}>{plan.icon}</span>
                    </div>
                    <div>
                      <h3 className="font-extrabold text-xl text-gray-900 leading-none">{plan.name}</h3>
                    </div>
                  </div>

                  <p className="text-gray-500 text-sm leading-relaxed mb-7">{plan.desc}</p>

                  {/* Price */}
                  <div className="mb-2">
                    <div className="flex items-end gap-1.5">
                      <span className="text-[3.25rem] font-extrabold text-gray-900 leading-none">
                        ${annual ? plan.annualPrice : plan.monthlyPrice}
                      </span>
                      <span className="text-gray-400 text-sm mb-2">/month</span>
                    </div>
                    <AnimatePresence mode="wait">
                      {annual ? (
                        <motion.p key="saving" initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                          className="text-emerald-600 text-xs font-bold mt-1">
                          You save ${(plan.monthlyPrice - plan.annualPrice) * 12}/year
                        </motion.p>
                      ) : (
                        <motion.p key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                          className="text-transparent text-xs mt-1 select-none">—</motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  <Link to="/contact"
                    className={`block w-full text-center py-3.5 rounded-xl font-bold text-sm transition-all mt-6 mb-4 ${plan.ctaClass}`}>
                    {plan.cta}
                    <svg className="inline ml-2 w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>

                  <p className="text-[11px] text-gray-400 font-medium text-center mb-6">
                    {annual ? 'Billed annually · ' : 'Billed monthly · '}Cancel anytime
                  </p>

                  {/* Feature bullets */}
                  <div className="border-t border-gray-100 pt-6 mt-auto space-y-3">
                    {plan.name === 'Starter' && [
                      'Monthly reconciliation',
                      'P&L + balance sheet',
                      'Annual tax return',
                      'Dedicated accountant',
                      'Audit support',
                    ].map(f => <FeatureLine key={f} text={f} active />)}

                    {plan.name === 'Growth' && [
                      'Everything in Starter',
                      'Payroll (up to 10 employees)',
                      'Quarterly tax estimates',
                      'Tax strategy sessions',
                      'Monthly CFO call',
                      'Budget & cash-flow',
                      'Phone & priority support',
                    ].map(f => <FeatureLine key={f} text={f} active orange={f === 'Everything in Starter'} />)}

                    {plan.name === 'Enterprise' && [
                      'Everything in Growth',
                      'Unlimited payroll',
                      'Fractional CFO service',
                      'R&D tax credit analysis',
                      'Investor-ready financials',
                      'SOC 2 readiness',
                      'Dedicated account manager',
                    ].map(f => <FeatureLine key={f} text={f} active orange={f === 'Everything in Growth'} />)}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <p className="text-center text-gray-500 text-sm mt-10">
            Need something custom?{' '}
            <Link to="/contact" className="text-brand-orange font-bold hover:underline">Contact our sales team →</Link>
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════ */}
      {/* TRUST STRIP */}
      {/* ══════════════════════════════════════════════════ */}
      <section className="py-12 bg-white border-y border-gray-100">
        <div className="max-w-[1000px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { icon: 'verified', label: 'Licensed CPAs & EAs', sub: 'All 50 states' },
              { icon: 'lock', label: 'Bank-level Security', sub: '256-bit encryption' },
              { icon: 'cancel', label: 'No Contracts', sub: 'Cancel anytime' },
              { icon: 'support_agent', label: 'Year-Round Support', sub: '365 days a year' },
            ].map((b, i) => (
              <motion.div key={b.label} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center">
                  <span className="material-symbols-outlined text-brand-orange text-2xl">{b.icon}</span>
                </div>
                <p className="font-bold text-gray-900 text-sm">{b.label}</p>
                <p className="text-gray-400 text-xs">{b.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════ */}
      {/* FEATURE COMPARISON TABLE */}
      {/* ══════════════════════════════════════════════════ */}
      <section className="py-24 bg-[#f8f8f8]">
        <div className="max-w-[1100px] mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl md:text-[2.75rem] font-extrabold mb-4">
              Compare <span className="text-brand-orange">all features</span>
            </h2>
            <p className="text-gray-500 max-w-lg mx-auto">Every plan includes the foundation — upgrade as your business grows.</p>
          </motion.div>

          {/* Desktop table */}
          <div className="hidden md:block overflow-x-auto rounded-2xl border border-gray-200 shadow-[0_4px_30px_rgba(0,0,0,0.05)] bg-white">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left px-8 py-6 font-bold text-gray-500 w-[44%] text-xs uppercase tracking-widest">Feature</th>
                  {plans.map((p) => (
                    <th key={p.name} className={`px-6 py-6 text-center w-[18.6%] ${p.popular ? 'bg-orange-50/60' : ''}`}>
                      <span className={`block font-extrabold text-base mb-0.5 ${p.popular ? 'text-brand-orange' : 'text-gray-900'}`}>{p.name}</span>
                      <span className="block text-[11px] text-gray-400 font-medium">
                        ${annual ? p.annualPrice : p.monthlyPrice}/mo
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {featureRows.map((group, gIdx) => (
                  <React.Fragment key={group.category}>
                    <tr className="bg-gray-50 border-t border-gray-100">
                      <td colSpan={4} className="px-8 py-3 font-extrabold text-xs uppercase tracking-widest text-gray-400 flex items-center gap-2">
                        <span className="material-symbols-outlined text-brand-orange text-[15px]">{group.icon}</span>
                        {group.category}
                      </td>
                    </tr>
                    {group.features.map((feat, fIdx) => (
                      <tr key={feat.label} className={`border-t border-gray-50 hover:bg-gray-50/50 transition-colors ${fIdx % 2 === 1 ? 'bg-white' : 'bg-gray-50/20'}`}>
                        <td className="px-8 py-4 text-gray-700 text-[13px]">{feat.label}</td>
                        <td className="px-6 py-4 text-center"><CheckCell value={feat.starter} /></td>
                        <td className="px-6 py-4 text-center bg-orange-50/30"><CheckCell value={feat.growth} /></td>
                        <td className="px-6 py-4 text-center"><CheckCell value={feat.enterprise} /></td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile accordion table */}
          <div className="md:hidden space-y-3">
            {featureRows.map((group) => (
              <div key={group.category} className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
                <button onClick={() => setOpenCategory(openCategory === group.category ? null : group.category)}
                  className="w-full flex items-center justify-between px-5 py-4">
                  <span className="flex items-center gap-2 font-bold text-gray-900 text-sm">
                    <span className="material-symbols-outlined text-brand-orange text-[18px]">{group.icon}</span>
                    {group.category}
                  </span>
                  <motion.span animate={{ rotate: openCategory === group.category ? 180 : 0 }} transition={{ duration: 0.2 }}
                    className="material-symbols-outlined text-gray-400 text-xl">expand_more</motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {openCategory === group.category && (
                    <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }}
                      transition={{ duration: 0.25 }} className="overflow-hidden">
                      <div className="border-t border-gray-100">
                        {/* Mobile header */}
                        <div className="grid grid-cols-4 px-4 py-2 bg-gray-50 text-[10px] font-bold uppercase tracking-wider text-gray-400">
                          <span className="col-span-1">Feature</span>
                          {plans.map(p => <span key={p.name} className={`text-center ${p.popular ? 'text-brand-orange' : ''}`}>{p.name}</span>)}
                        </div>
                        {group.features.map((feat, i) => (
                          <div key={feat.label} className={`grid grid-cols-4 px-4 py-3 border-t border-gray-50 items-center ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/40'}`}>
                            <span className="col-span-1 text-[11px] text-gray-600 pr-2 leading-tight">{feat.label}</span>
                            <span className="flex justify-center"><CheckCell value={feat.starter} /></span>
                            <span className="flex justify-center bg-orange-50/40 py-1 rounded"><CheckCell value={feat.growth} /></span>
                            <span className="flex justify-center"><CheckCell value={feat.enterprise} /></span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════ */}
      {/* TESTIMONIALS */}
      {/* ══════════════════════════════════════════════════ */}
      <section className="py-24 bg-white">
        <div className="max-w-[1100px] mx-auto px-6">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-3xl md:text-[2.75rem] font-extrabold text-center mb-16">
            Loved by <span className="text-brand-orange">thousands of businesses</span>
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div key={t.name} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-[#f8f8f8] rounded-2xl p-7 flex flex-col gap-5">
                {/* Stars */}
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, s) => (
                    <span key={s} className="material-symbols-outlined text-brand-orange text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  ))}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed flex-1 italic">"{t.quote}"</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-sm text-gray-900">{t.name}</p>
                    <p className="text-xs text-gray-400">{t.role}</p>
                  </div>
                  <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-white border border-gray-200 text-gray-500">{t.plan} Plan</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════ */}
      {/* FAQ */}
      {/* ══════════════════════════════════════════════════ */}
      <section className="py-24 bg-[#f8f8f8]">
        <div className="max-w-[750px] mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl md:text-[2.75rem] font-extrabold mb-4">
              Pricing <span className="text-brand-orange">FAQ</span>
            </h2>
            <p className="text-gray-500">Everything you need to know before signing up.</p>
          </motion.div>
          <div className="bg-white rounded-2xl px-6 py-2 border border-gray-100 shadow-[0_4px_25px_rgba(0,0,0,0.04)]">
            {faqs.map((faq) => <FaqItem key={faq.q} q={faq.q} a={faq.a} />)}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════ */}
      {/* BOTTOM CTA */}
      {/* ══════════════════════════════════════════════════ */}
      <section className="relative py-28 bg-gray-900 text-white text-center overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05]" style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 0)',
          backgroundSize: '28px 28px'
        }} />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand-orange/15 blur-[100px] pointer-events-none" />
        <div className="relative max-w-[700px] mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-5 leading-tight">
              Start with a <span className="text-brand-orange">free consultation</span>
            </h2>
            <p className="text-gray-400 text-lg mb-10 max-w-md mx-auto leading-relaxed">
              No commitment, no credit card. Just 30 minutes with a real accountant who understands your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact"
                className="inline-flex items-center justify-center gap-2 bg-[#1b75ff] hover:bg-[#155bcd] text-white font-bold px-10 py-4 rounded-full shadow-[0_6px_25px_rgba(27,117,255,0.4)] transition-all hover:-translate-y-0.5 text-[15px]">
                <span className="material-symbols-outlined text-[18px]">calendar_month</span>
                Schedule Free Consultation
              </Link>
              <Link to="/calculators"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-white font-bold px-10 py-4 rounded-full border border-white/15 transition-all text-[15px]">
                <span className="material-symbols-outlined text-[18px]">calculate</span>
                Tax Savings Calculator
              </Link>
            </div>
            <div className="flex flex-wrap justify-center gap-6 mt-12 text-sm text-gray-500">
              {['Licensed CPAs', '30-Day Free Trial', 'Cancel Anytime', '4.8/5 Rated'].map(t => (
                <span key={t} className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-brand-orange text-[14px]">check_circle</span>{t}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}

function FeatureLine({ text, active, orange }) {
  return (
    <div className="flex items-start gap-2.5">
      <span className={`material-symbols-outlined text-[16px] flex-shrink-0 mt-0.5 ${orange ? 'text-brand-orange' : active ? 'text-emerald-500' : 'text-gray-300'}`}
        style={{ fontVariationSettings: "'FILL' 1" }}>
        {orange ? 'arrow_forward' : active ? 'check_circle' : 'remove'}
      </span>
      <span className={`text-sm leading-snug ${orange ? 'text-brand-orange font-bold' : 'text-gray-600'}`}>{text}</span>
    </div>
  );
}
