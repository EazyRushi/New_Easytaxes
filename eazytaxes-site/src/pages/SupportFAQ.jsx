import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const faqGroups = [
  {
    category: 'Getting Started',
    icon: 'rocket_launch',
    faqs: [
      { q: 'How do I get started with EazyTaxes?', a: 'Simply schedule a free consultation through our website. A licensed CPA will review your business situation, recommend the right plan, and walk you through onboarding — which typically takes less than one business day.' },
      { q: 'What information do I need to provide?', a: 'To get started, we typically need your prior year tax returns, current year bank statements, and any relevant business documents (formation docs, payroll records). We\'ll send you a secure checklist after your consultation.' },
      { q: 'How long does onboarding take?', a: 'Most clients are fully onboarded within 1–2 business days. We\'ll set up your client portal, connect your accounts, and assign your dedicated accountant during this period.' },
      { q: 'Do I need to come to an office?', a: 'No. EazyTaxes is fully remote. Everything is handled securely online through our client portal, video calls, and e-signatures. We serve clients in all 50 states.' },
    ],
  },
  {
    category: 'Tax Services',
    icon: 'receipt_long',
    faqs: [
      { q: 'What types of tax returns do you file?', a: 'We file all entity types — personal (1040), sole proprietor (Schedule C), LLC, S-Corp (1120-S), C-Corp (1120), partnership (1065), and non-profit (Form 990). We also handle multi-state filings.' },
      { q: 'When is my tax return due?', a: 'Federal business returns are due March 15 (partnerships and S-Corps) or April 15 (C-Corps and individuals). State deadlines vary. We track all deadlines for you and file extensions when needed.' },
      { q: 'Can you help with back taxes or unfiled returns?', a: 'Yes. We specialize in catching up on prior-year unfiled returns and resolving back tax liabilities. We\'ll communicate directly with the IRS on your behalf throughout the process.' },
      { q: 'What is a quarterly estimated tax payment?', a: 'If you\'re self-employed or own a business, you generally must pay estimated taxes quarterly (April 15, June 15, September 15, January 15). We calculate the correct amounts and remind you before each deadline.' },
    ],
  },
  {
    category: 'Bookkeeping',
    icon: 'menu_book',
    faqs: [
      { q: 'How does monthly bookkeeping work?', a: 'Each month, we reconcile all your bank and credit card accounts, categorize every transaction, and deliver your P&L, balance sheet, and cash flow statement by the 15th of the following month.' },
      { q: 'What accounting software do you use?', a: 'We work natively in QuickBooks Online and Xero. We also support FreshBooks and Wave. If you\'re not yet on accounting software, we\'ll set you up as part of onboarding at no extra charge.' },
      { q: 'Can you catch up on months of backlogged bookkeeping?', a: 'Yes — we offer bookkeeping catch-up services for clients who are months or even years behind. Pricing depends on the volume of transactions and is quoted upfront.' },
    ],
  },
  {
    category: 'Payroll',
    icon: 'payments',
    faqs: [
      { q: 'How does your payroll service work?', a: 'We process payroll on your preferred schedule (weekly, biweekly, or monthly), handle all tax withholdings, file 940/941 forms, issue direct deposits, and manage year-end W-2 and 1099 preparation.' },
      { q: 'Can you handle contractors (1099 workers)?', a: 'Yes. We track contractor payments throughout the year and prepare and file all 1099-NEC forms by the January 31 deadline.' },
      { q: 'What states do you run payroll in?', a: 'We run payroll in all 50 states, including states with complex local tax requirements like New York City, California, and Pennsylvania.' },
    ],
  },
  {
    category: 'Billing & Plans',
    icon: 'credit_card',
    faqs: [
      { q: 'Can I change my plan after signing up?', a: 'Yes. You can upgrade or downgrade at any time. Changes take effect at the start of your next billing cycle. There are no penalties or fees for switching.' },
      { q: 'Is there a free trial?', a: 'Yes. Starter and Growth plans both include a 30-day free trial. No credit card is required to begin your trial.' },
      { q: 'What payment methods do you accept?', a: 'We accept all major credit cards (Visa, Mastercard, Amex), ACH bank transfers, and checks for annual plans. All payments are processed securely through Stripe.' },
      { q: 'What happens if I cancel?', a: 'You can cancel at any time from your account dashboard with no cancellation fee. We\'ll deliver your final financial statements and help you transition your data to your next provider.' },
    ],
  },
  {
    category: 'Security & Privacy',
    icon: 'lock',
    faqs: [
      { q: 'How is my financial data protected?', a: 'All data is encrypted in transit and at rest using AES-256 encryption. Our infrastructure meets SOC 2 Type II standards, and we use multi-factor authentication on all staff and client accounts.' },
      { q: 'Do you share my data with third parties?', a: 'Never. Your financial data is used solely to provide your accounting services. We do not sell, share, or monetize client data in any form.' },
      { q: 'What happens to my data if I cancel?', a: 'After cancellation, you\'ll have 90 days to export your data. After that, data is securely deleted from our systems in accordance with our data retention policy.' },
    ],
  },
];

const supportChannels = [
  { icon: 'chat', title: 'Live Chat', desc: 'Chat with our support team in real time during business hours.', action: 'Start Chat', color: 'bg-blue-50 text-[#1b75ff]' },
  { icon: 'mail', title: 'Email Support', desc: 'Send us a message and get a response within 4 business hours.', action: 'support@eazytaxes.com', color: 'bg-orange-50 text-brand-orange' },
  { icon: 'call', title: 'Phone Support', desc: 'Speak directly with your dedicated accountant. Growth & Enterprise plans.', action: '(800) 222-6868', color: 'bg-green-50 text-green-600' },
  { icon: 'calendar_month', title: 'Schedule a Call', desc: 'Book a 30-minute session with a licensed CPA at a time that works for you.', action: 'Book a Call', color: 'bg-purple-50 text-purple-600' },
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

export default function SupportFAQ() {
  const [activeGroup, setActiveGroup] = useState(faqGroups[0].category);
  const [search, setSearch] = useState('');

  const currentGroup = faqGroups.find(g => g.category === activeGroup);
  const searchResults = search.length > 1
    ? faqGroups.flatMap(g => g.faqs.filter(f => f.q.toLowerCase().includes(search.toLowerCase()) || f.a.toLowerCase().includes(search.toLowerCase())))
    : null;

  return (
    <div className="bg-white text-gray-900 font-body overflow-x-clip">

      {/* ══════ HERO ══════ */}
      <section className="relative bg-gray-900 pt-32 pb-40 text-center">
        <div className="absolute inset-0 opacity-[0.06]" style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 0)',
          backgroundSize: '28px 28px'
        }} />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-brand-orange/15 blur-[120px] pointer-events-none" />
        <div className="relative max-w-[800px] mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
            <span className="inline-flex items-center gap-2 bg-white/10 border border-white/15 text-white/80 text-xs font-bold px-4 py-2 rounded-full mb-8 uppercase tracking-widest">
              <span className="material-symbols-outlined text-brand-orange text-[14px]">help</span>
              Support & FAQ
            </span>
            <h1 className="text-5xl md:text-[4.5rem] font-extrabold text-white leading-[1.1] mb-6">
              How can we <span className="text-brand-orange italic font-normal">help you?</span>
            </h1>
            <p className="text-lg text-gray-400 max-w-xl mx-auto mb-10 leading-relaxed">
              Browse common questions, or reach out directly — we respond within 4 business hours.
            </p>
            {/* Search */}
            <div className="relative max-w-lg mx-auto">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-[20px]">search</span>
              <input
                type="text"
                placeholder="Search questions..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full bg-white text-gray-900 pl-12 pr-5 py-4 rounded-full text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-orange shadow-[0_8px_30px_rgba(0,0,0,0.15)]"
              />
              {search && (
                <button onClick={() => setSearch('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  <span className="material-symbols-outlined text-[20px]">close</span>
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════ SUPPORT CHANNELS ══════ */}
      <section className="bg-[#f8f8f8] pt-0 pb-16">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 -mt-20 relative z-10">
            {supportChannels.map((ch, i) => (
              <motion.div key={ch.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.08 }}
                className="bg-white rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-gray-100 hover:shadow-[0_8px_35px_rgba(0,0,0,0.1)] transition-all">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${ch.color}`}>
                  <span className="material-symbols-outlined text-[20px]">{ch.icon}</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{ch.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed mb-4">{ch.desc}</p>
                <Link to="/contact" className="text-xs font-bold text-brand-orange hover:underline flex items-center gap-1">
                  {ch.action}
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ FAQ SECTION ══════ */}
      <section className="py-20 bg-[#f8f8f8]">
        <div className="max-w-[1100px] mx-auto px-6">

          {/* Search results */}
          {searchResults ? (
            <div>
              <p className="text-sm text-gray-500 mb-6 font-medium">{searchResults.length} result{searchResults.length !== 1 ? 's' : ''} for "<span className="font-bold text-gray-900">{search}</span>"</p>
              <div className="bg-white rounded-2xl border border-gray-100 px-6 py-2 shadow-[0_4px_25px_rgba(0,0,0,0.04)]">
                {searchResults.length > 0
                  ? searchResults.map(faq => <FaqItem key={faq.q} q={faq.q} a={faq.a} />)
                  : <p className="py-10 text-center text-gray-400 text-sm">No results found. Try different keywords or <Link to="/contact" className="text-brand-orange font-bold">contact us directly</Link>.</p>
                }
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Category Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl border border-gray-100 p-3 shadow-[0_4px_20px_rgba(0,0,0,0.04)] sticky top-28">
                  {faqGroups.map(group => (
                    <button key={group.category} onClick={() => setActiveGroup(group.category)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-sm font-bold transition-all mb-1 ${activeGroup === group.category ? 'bg-orange-50 text-brand-orange' : 'text-gray-600 hover:bg-gray-50'}`}>
                      <span className={`material-symbols-outlined text-[18px] ${activeGroup === group.category ? 'text-brand-orange' : 'text-gray-400'}`}>{group.icon}</span>
                      {group.category}
                    </button>
                  ))}
                </div>
              </div>

              {/* FAQ List */}
              <div className="lg:col-span-3">
                <AnimatePresence mode="wait">
                  <motion.div key={activeGroup} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.2 }}>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center">
                        <span className="material-symbols-outlined text-brand-orange text-[20px]">{currentGroup?.icon}</span>
                      </div>
                      <h2 className="text-2xl font-extrabold">{activeGroup}</h2>
                    </div>
                    <div className="bg-white rounded-2xl border border-gray-100 px-6 py-2 shadow-[0_4px_25px_rgba(0,0,0,0.04)]">
                      {currentGroup?.faqs.map(faq => <FaqItem key={faq.q} q={faq.q} a={faq.a} />)}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ══════ STILL NEED HELP ══════ */}
      <section className="py-20 bg-white border-y border-gray-100">
        <div className="max-w-[900px] mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="material-symbols-outlined text-brand-orange text-4xl mb-4 block" style={{ fontVariationSettings: "'FILL' 1" }}>support_agent</span>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Still have questions?</h2>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">Our team of licensed CPAs is standing by. We typically respond within 4 business hours.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-[#1b75ff] hover:bg-[#155bcd] text-white font-bold rounded-full px-9 py-4 shadow-[0_6px_25px_rgba(27,117,255,0.4)] transition-all hover:-translate-y-0.5">
                <span className="material-symbols-outlined text-[18px]">calendar_month</span>
                Schedule a Free Consultation
              </Link>
              <a href="tel:8002226868" className="inline-flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold rounded-full px-9 py-4 transition-all">
                <span className="material-symbols-outlined text-[18px]">call</span>
                (800) 222-6868
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════ CTA ══════ */}
      <section className="py-20 bg-gray-900 text-white text-center">
        <div className="max-w-[700px] mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Ready to get <span className="text-brand-orange">started?</span></h2>
          <p className="text-gray-400 mb-8">Join thousands of businesses that trust EazyTaxes with their taxes, books, and payroll.</p>
          <Link to="/pricing" className="inline-flex items-center bg-brand-orange hover:bg-brand-orangeDark text-white font-bold rounded-full px-10 py-4 shadow-[0_6px_25px_rgba(250,130,0,0.4)] transition-all hover:-translate-y-0.5">
            View Pricing Plans
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="ml-2"><path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
