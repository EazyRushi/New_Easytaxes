import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const partnerTypes = [
  {
    id: 'referral',
    icon: 'share',
    title: 'Referral Partner',
    badge: 'Most Popular',
    badgeColor: 'bg-orange-50 text-brand-orange',
    desc: 'Refer clients to EazyTaxes and earn a recurring commission for every client you send our way. Perfect for business coaches, financial advisors, and anyone who works with small business owners.',
    commission: '15%',
    commissionLabel: 'Recurring monthly commission',
    benefits: [
      'Earn 15% recurring commission per referred client',
      'No minimum referrals — earn from your very first',
      'Real-time tracking dashboard',
      'Dedicated partner success manager',
      'Co-marketing assets & materials',
      'Monthly direct deposit payouts',
    ],
    idealFor: ['Business Coaches', 'Financial Advisors', 'Insurance Agents', 'Business Attorneys', 'HR Consultants'],
  },
  {
    id: 'integration',
    icon: 'api',
    title: 'Technology Partner',
    badge: '',
    badgeColor: '',
    desc: 'Build integrations with the EazyTaxes platform to enhance your product offering. Ideal for SaaS platforms, banking apps, and tools serving the small business market.',
    commission: 'Rev Share',
    commissionLabel: 'Negotiated per partnership',
    benefits: [
      'Access to EazyTaxes public API',
      'Co-selling & co-marketing opportunities',
      'Featured in EazyTaxes partner marketplace',
      'Joint press release and launch support',
      'Dedicated technical integration support',
      'Access to sandbox testing environment',
    ],
    idealFor: ['Accounting Software', 'Banking Platforms', 'POS Systems', 'E-commerce Platforms', 'HR & Payroll Tools'],
  },
  {
    id: 'affiliate',
    icon: 'campaign',
    title: 'Affiliate Partner',
    badge: '',
    badgeColor: '',
    desc: 'Promote EazyTaxes to your audience and earn commissions on new signups. Ideal for content creators, media companies, and blogs targeting small business owners.',
    commission: '$150',
    commissionLabel: 'Per qualified signup',
    benefits: [
      '$150 per qualified new client signup',
      'Custom tracking links & promo codes',
      'Monthly performance reports',
      'Creative assets & brand guidelines',
      'Priority support via partner portal',
      'Bonus incentives for high volume',
    ],
    idealFor: ['Finance Bloggers', 'YouTube Creators', 'Podcast Hosts', 'Newsletter Publishers', 'Social Media Influencers'],
  },
];

const currentPartners = [
  { name: 'QuickBooks', category: 'Accounting Software', desc: 'Certified QuickBooks ProAdvisor partnership — seamless two-way sync for all clients.' },
  { name: 'Gusto', category: 'HR & Payroll', desc: 'Deep integration with Gusto payroll for automated payroll-to-bookkeeping sync.' },
  { name: 'Shopify', category: 'E-commerce', desc: 'Official Shopify partner — automatic revenue reconciliation for e-commerce clients.' },
  { name: 'Stripe', category: 'Payments', desc: 'Stripe transaction data flows directly into client bookkeeping with zero manual entry.' },
  { name: 'Mercury', category: 'Banking', desc: 'Startup banking integration — real-time transaction sync for startup clients.' },
  { name: 'Xero', category: 'Accounting Software', desc: 'Xero Platinum Partner — full-service support for clients on the Xero platform.' },
];

const faqs = [
  { q: 'How long does it take to get approved as a partner?', a: 'Most referral and affiliate partner applications are reviewed within 2 business days. Technology partnerships involve a discovery call and typically take 5–7 business days to structure.' },
  { q: 'When do I get paid?', a: 'Referral and affiliate commissions are paid monthly by direct deposit, on the 15th of each month for the prior month\'s activity. You need a minimum of $50 in earned commissions to trigger a payout.' },
  { q: 'Is there a minimum number of referrals required?', a: 'No minimum for referral partners. Send one client or one hundred — you earn on every single one.' },
  { q: 'Can I be both a referral partner and an affiliate?', a: 'Yes. Many partners participate in both programs simultaneously. Your partner dashboard tracks all activity in one place.' },
  { q: 'Do you have exclusivity requirements?', a: 'No exclusivity requirements for referral or affiliate partners. Technology partnerships may include preferred partner status for mutual integrations, which we discuss during the onboarding process.' },
];

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button onClick={() => setOpen(!open)} className="w-full flex items-start justify-between py-5 text-left gap-4 group">
        <span className="font-bold text-gray-900 text-[15px] group-hover:text-brand-orange transition-colors leading-snug">{q}</span>
        <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.2 }}
          className="material-symbols-outlined text-brand-orange flex-shrink-0 text-2xl mt-0.5">add</motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
            <p className="pb-5 text-gray-500 leading-relaxed text-sm">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Partnerships() {
  const [activeType, setActiveType] = useState('referral');
  const activePartner = partnerTypes.find(p => p.id === activeType);

  return (
    <div className="bg-white text-gray-900 font-body overflow-x-clip">

      {/* ══ HERO ══ */}
      <section className="relative bg-gray-900 pt-36 pb-32 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 0)', backgroundSize: '28px 28px' }} />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-brand-orange/15 blur-[130px] pointer-events-none" />
        <div className="relative max-w-[1100px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
            <span className="inline-flex items-center gap-2 bg-white/10 border border-white/15 text-white/80 text-xs font-bold px-4 py-2 rounded-full mb-8 uppercase tracking-widest">
              <span className="material-symbols-outlined text-brand-orange text-[14px]">handshake</span>
              Partner Program
            </span>
            <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-[1.1] mb-6">
              Grow together.<br /><span className="text-brand-orange italic font-normal">Earn together.</span>
            </h1>
            <p className="text-lg text-gray-400 leading-relaxed mb-10">
              Join hundreds of partners who refer clients, build integrations, and co-market with EazyTaxes. We make it simple to earn recurring income while delivering real value to your audience.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#partner-types" className="inline-flex items-center bg-brand-orange hover:bg-brand-orangeDark text-white font-bold rounded-full px-8 py-4 shadow-[0_6px_25px_rgba(250,130,0,0.4)] transition-all hover:-translate-y-0.5">
                Become a Partner
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="ml-2"><path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </a>
              <Link to="/contact" className="inline-flex items-center bg-white/10 hover:bg-white/15 text-white font-bold rounded-full px-8 py-4 border border-white/15 transition-all">
                Talk to Partner Team
              </Link>
            </div>
          </motion.div>
          {/* Stats grid */}
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.2 }}
            className="hidden lg:grid grid-cols-2 gap-4">
            {[
              { value: '500+', label: 'Active Partners', icon: 'groups' },
              { value: '15%', label: 'Recurring Commission', icon: 'percent' },
              { value: '$2.1M', label: 'Paid to Partners', icon: 'payments' },
              { value: '2 Days', label: 'Avg Approval Time', icon: 'speed' },
            ].map((stat, i) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
                <span className="material-symbols-outlined text-brand-orange text-3xl mb-3 block">{stat.icon}</span>
                <p className="text-3xl font-extrabold text-white">{stat.value}</p>
                <p className="text-gray-400 text-xs font-semibold mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══ PARTNER TYPES ══ */}
      <section id="partner-types" className="py-24 bg-[#f8f8f8]">
        <div className="max-w-[1100px] mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <span className="text-brand-orange text-xs font-extrabold uppercase tracking-widest mb-4 block">Choose Your Path</span>
            <h2 className="text-3xl md:text-[2.75rem] font-extrabold">Partnership <span className="text-brand-orange">programs</span></h2>
          </motion.div>

          {/* Type selector */}
          <div className="flex flex-wrap gap-3 justify-center mb-10">
            {partnerTypes.map(pt => (
              <button key={pt.id} onClick={() => setActiveType(pt.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition-all ${activeType === pt.id ? 'bg-gray-900 text-white shadow-md' : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-400'}`}>
                <span className="material-symbols-outlined text-[18px]">{pt.icon}</span>
                {pt.title}
                {pt.badge && <span className="bg-brand-orange text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full">{pt.badge}</span>}
              </button>
            ))}
          </div>

          {/* Active type detail */}
          <AnimatePresence mode="wait">
            <motion.div key={activeType} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.2 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left: Overview */}
              <div className="bg-white rounded-2xl p-8 shadow-[0_4px_25px_rgba(0,0,0,0.05)] border border-gray-100">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-12 h-12 rounded-xl bg-orange-50 text-brand-orange flex items-center justify-center">
                    <span className="material-symbols-outlined">{activePartner.icon}</span>
                  </div>
                  <div>
                    <h3 className="font-extrabold text-xl">{activePartner.title}</h3>
                    <div className="flex items-baseline gap-1 mt-0.5">
                      <span className="text-2xl font-extrabold text-brand-orange">{activePartner.commission}</span>
                      <span className="text-xs text-gray-400">{activePartner.commissionLabel}</span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">{activePartner.desc}</p>
                <h4 className="font-extrabold text-sm mb-3">Ideal For</h4>
                <div className="flex flex-wrap gap-2">
                  {activePartner.idealFor.map(item => (
                    <span key={item} className="px-3 py-1.5 bg-[#f8f8f8] rounded-full text-xs font-bold text-gray-600 border border-gray-200">{item}</span>
                  ))}
                </div>
              </div>
              {/* Right: Benefits */}
              <div className="bg-gray-900 rounded-2xl p-8 text-white">
                <h3 className="font-extrabold text-xl mb-6">What you get</h3>
                <ul className="space-y-4">
                  {activePartner.benefits.map(b => (
                    <li key={b} className="flex items-start gap-3 text-sm text-gray-300">
                      <span className="material-symbols-outlined text-brand-orange text-[18px] flex-shrink-0 mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                      {b}
                    </li>
                  ))}
                </ul>
                <Link to="/contact"
                  className="mt-8 w-full flex items-center justify-center gap-2 bg-brand-orange hover:bg-brand-orangeDark text-white font-bold px-8 py-4 rounded-xl transition-all shadow-[0_4px_14px_rgba(250,130,0,0.3)]">
                  Apply as {activePartner.title}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ══ HOW IT WORKS ══ */}
      <section className="py-20 bg-white">
        <div className="max-w-[900px] mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <span className="text-brand-orange text-xs font-extrabold uppercase tracking-widest mb-4 block">Simple Process</span>
            <h2 className="text-3xl md:text-[2.75rem] font-extrabold">Getting started is <span className="text-brand-orange">easy</span></h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { num: '01', icon: 'app_registration', title: 'Apply', desc: 'Fill out a short application. We review all applications within 2 business days.' },
              { num: '02', icon: 'verified_user', title: 'Get Approved', desc: 'Receive your partner ID, tracking links, and access to the partner dashboard.' },
              { num: '03', icon: 'share', title: 'Start Referring', desc: 'Share your unique link. When a client signs up through you, it\'s tracked automatically.' },
              { num: '04', icon: 'payments', title: 'Get Paid', desc: 'Commissions accumulate in real time. Paid monthly by direct deposit on the 15th.' },
            ].map((step, i) => (
              <motion.div key={step.num} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="text-center">
                <div className="w-14 h-14 rounded-2xl bg-orange-50 border-2 border-orange-100 flex items-center justify-center mx-auto mb-4">
                  <span className="material-symbols-outlined text-brand-orange text-[22px]">{step.icon}</span>
                </div>
                <p className="text-[10px] font-extrabold text-gray-300 mb-1">{step.num}</p>
                <h3 className="font-extrabold mb-2">{step.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CURRENT PARTNERS ══ */}
      <section className="py-20 bg-[#f8f8f8]">
        <div className="max-w-[1100px] mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <span className="text-brand-orange text-xs font-extrabold uppercase tracking-widest mb-4 block">Our Ecosystem</span>
            <h2 className="text-3xl md:text-[2.75rem] font-extrabold">Trusted <span className="text-brand-orange">technology partners</span></h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {currentPartners.map((p, i) => (
              <motion.div key={p.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                className="bg-white rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-100 flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#f8f8f8] border border-gray-100 flex items-center justify-center flex-shrink-0">
                  <span className="font-extrabold text-gray-900 text-sm">{p.name[0]}</span>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-extrabold">{p.name}</h3>
                    <span className="text-[10px] font-bold text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full border border-gray-200">{p.category}</span>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed">{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FAQ ══ */}
      <section className="py-20 bg-white">
        <div className="max-w-[750px] mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <h2 className="text-3xl md:text-[2.75rem] font-extrabold">Partner <span className="text-brand-orange">FAQ</span></h2>
          </motion.div>
          <div className="bg-[#f8f8f8] rounded-2xl px-6 py-2 border border-gray-100">
            {faqs.map(faq => <FaqItem key={faq.q} q={faq.q} a={faq.a} />)}
          </div>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section className="relative py-28 bg-gray-900 text-white text-center overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 0)', backgroundSize: '28px 28px' }} />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand-orange/15 blur-[100px] pointer-events-none" />
        <div className="relative max-w-[700px] mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-5 leading-tight">
              Ready to start <span className="text-brand-orange">earning?</span>
            </h2>
            <p className="text-gray-400 text-lg mb-10 max-w-md mx-auto">Apply today and earn your first commission within days. Our partner team will have you up and running in under 48 hours.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-brand-orange hover:bg-brand-orangeDark text-white font-bold px-10 py-4 rounded-full shadow-[0_6px_25px_rgba(250,130,0,0.4)] transition-all hover:-translate-y-0.5">
                <span className="material-symbols-outlined text-[18px]">handshake</span>
                Apply to Partner Program
              </Link>
              <Link to="/contact" className="inline-flex items-center justify-center bg-white/10 hover:bg-white/15 text-white font-bold rounded-full px-10 py-4 border border-white/15 transition-all">
                Talk to Partner Team
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
