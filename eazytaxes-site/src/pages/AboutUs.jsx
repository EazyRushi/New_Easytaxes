import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const stats = [
  { value: '10K+', label: 'Businesses Served' },
  { value: '$2.4B+', label: 'Capital Advised' },
  { value: '50', label: 'States Active' },
  { value: '99.8%', label: 'Client Retention' },
];

const values = [
  { icon: 'verified', title: 'Accuracy First', desc: 'Every number we touch is reviewed twice. We never sacrifice precision for speed — your finances are too important.' },
  { icon: 'handshake', title: 'Radical Transparency', desc: 'No hidden fees, no surprise bills, no fine print. You always know exactly what you\'re paying and what you\'re getting.' },
  { icon: 'rocket_launch', title: 'Proactive, Not Reactive', desc: 'We don\'t wait for tax season to think about your taxes. We\'re building your strategy 365 days a year.' },
  { icon: 'lock', title: 'Uncompromising Security', desc: 'Bank-level encryption, SOC 2-aligned infrastructure, and strict data policies protect your financial life.' },
  { icon: 'people', title: 'People Over Paperwork', desc: 'We hire CPAs who communicate like humans — clear, responsive, and genuinely invested in your success.' },
  { icon: 'trending_up', title: 'Growth Mindset', desc: 'We grow with you. From your first LLC to your Series A, our services scale exactly as your business does.' },
];

const team = [
  { name: 'James Harrington', role: 'Founder & CEO', bio: '20+ years in public accounting. Former Big 4 partner. Built EazyTaxes to make enterprise-grade tax strategy accessible to every small business.', img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80' },
  { name: 'Priya Nair', role: 'Chief Tax Officer', bio: 'CPA, 15 years specializing in multi-state compliance and tax resolution. Led the IRS advocacy division at a top-10 national firm before joining EazyTaxes.', img: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=400&q=80' },
  { name: 'Marcus Webb', role: 'Head of Bookkeeping', bio: 'Built the bookkeeping infrastructure from zero to 5,000+ monthly clients. Obsessed with clean data and financial clarity for business owners.', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80' },
  { name: 'Sofia Reyes', role: 'Head of Payroll', bio: 'Former payroll director at a 2,000-person company. Brought that institutional payroll expertise to small businesses that deserve the same quality.', img: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?auto=format&fit=crop&w=400&q=80' },
  { name: 'David Chen', role: 'Head of Technology', bio: 'Led engineering teams at two fintech startups. Architected the EazyTaxes client portal and security infrastructure from the ground up.', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80' },
  { name: 'Lena Kovacs', role: 'Director of Client Success', bio: '10 years in financial services client management. Ensures every EazyTaxes client has a seamless experience from day one through every tax season.', img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80' },
];

const timeline = [
  { year: '2014', title: 'Founded in New York', desc: 'James Harrington leaves his Big 4 partnership to build a better accounting firm — one that actually communicates with clients.' },
  { year: '2016', title: 'First 500 Clients', desc: 'Word-of-mouth growth drives EazyTaxes to 500 small business clients across New York and New Jersey.' },
  { year: '2018', title: 'Went 100% Remote', desc: 'We go fully remote before it was mainstream — enabling us to serve clients in all 50 states with a distributed team of CPAs.' },
  { year: '2020', title: 'Launched Payroll Division', desc: 'Responding to client demand, we build a full-service payroll division — now processing payroll for 3,000+ businesses.' },
  { year: '2022', title: '5,000+ Active Clients', desc: 'EazyTaxes crosses 5,000 active clients and $1B in capital advised. We hire our 100th CPA.' },
  { year: '2024', title: 'Platform Launch', desc: 'We launch the EazyTaxes client portal — real-time financials, document upload, and direct messaging with your accountant.' },
  { year: '2025', title: '10,000+ Businesses Served', desc: 'EazyTaxes is trusted by over 10,000 businesses across all 50 states. The mission stays the same: make great accounting accessible to everyone.' },
];

const press = ['Forbes', 'Bloomberg', 'Inc.', 'Entrepreneur', 'TechCrunch', 'WSJ'];

export default function AboutUs() {
  return (
    <div className="bg-white text-gray-900 font-body overflow-x-clip">

      {/* ══ HERO ══ */}
      <section className="relative bg-gray-900 pt-36 pb-32 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 0)', backgroundSize: '28px 28px' }} />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-brand-orange/15 blur-[130px] pointer-events-none" />
        <div className="relative max-w-[1100px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
            <span className="inline-flex items-center gap-2 bg-white/10 border border-white/15 text-white/80 text-xs font-bold px-4 py-2 rounded-full mb-8 uppercase tracking-widest">
              <span className="material-symbols-outlined text-brand-orange text-[14px]">info</span>
              About EazyTaxes
            </span>
            <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-[1.1] mb-6">
              We built the firm<br />we <span className="text-brand-orange italic font-normal">always wanted.</span>
            </h1>
            <p className="text-lg text-gray-400 leading-relaxed mb-10">
              EazyTaxes started with a simple belief: small businesses deserve the same quality of tax strategy, bookkeeping, and financial advice as Fortune 500 companies — without the Fortune 500 price tag.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/contact" className="inline-flex items-center bg-[#1b75ff] hover:bg-[#155bcd] text-white font-bold rounded-full px-8 py-4 shadow-[0_6px_25px_rgba(27,117,255,0.4)] transition-all hover:-translate-y-0.5">
                Work With Us
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="ml-2"><path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </Link>
              <Link to="/careers" className="inline-flex items-center bg-white/10 hover:bg-white/15 text-white font-bold rounded-full px-8 py-4 border border-white/15 transition-all">
                Join Our Team
              </Link>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.2 }}
            className="relative hidden lg:block">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden">
              <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80" alt="EazyTaxes team" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent" />
            </div>
            {/* Floating stat */}
            <div className="absolute -bottom-5 -left-5 bg-white rounded-2xl p-5 shadow-[0_10px_40px_rgba(0,0,0,0.15)]">
              <p className="text-3xl font-extrabold text-brand-orange">2014</p>
              <p className="text-xs font-bold text-gray-500 mt-0.5">Founded in New York</p>
            </div>
            <div className="absolute -top-5 -right-5 bg-brand-orange rounded-2xl p-5 shadow-[0_10px_40px_rgba(250,130,0,0.3)]">
              <p className="text-3xl font-extrabold text-white">10K+</p>
              <p className="text-xs font-bold text-white/80 mt-0.5">Businesses Served</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══ STATS ══ */}
      <section className="py-14 bg-[#f8f8f8] border-y border-gray-100">
        <div className="max-w-[1000px] mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
              <p className="text-4xl font-extrabold text-gray-900 mb-1">{s.value}</p>
              <p className="text-sm text-gray-500 font-semibold">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══ MISSION ══ */}
      <section className="py-24 bg-white">
        <div className="max-w-[1100px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="aspect-[4/3] rounded-2xl overflow-hidden relative">
              <img src="https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=800&q=80" alt="Mission" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-white font-extrabold text-xl leading-snug">"Great accounting shouldn't be a luxury. It should be the baseline."</p>
                <p className="text-white/70 text-sm mt-2">— James Harrington, Founder</p>
              </div>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <span className="text-brand-orange text-xs font-extrabold uppercase tracking-widest mb-4 block">Our Mission</span>
            <h2 className="text-4xl font-extrabold leading-tight mb-6">
              Democratizing access to <span className="text-brand-orange">world-class accounting</span>
            </h2>
            <p className="text-gray-500 leading-relaxed mb-5">
              For too long, the best tax strategies and financial advice were reserved for large corporations with big budgets. Small business owners were stuck with generic software or overpriced local firms that barely had time to return a call.
            </p>
            <p className="text-gray-500 leading-relaxed mb-8">
              We built EazyTaxes to change that. By combining licensed CPAs with modern technology, we deliver the kind of proactive, personalized financial guidance that used to cost 10x more — to businesses of every size, in every state.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[['Licensed CPAs & EAs', 'verified'], ['All 50 States', 'public'], ['100% Remote', 'cloud'], ['No Contracts', 'cancel']].map(([label, icon]) => (
                <div key={label} className="flex items-center gap-3 bg-[#f8f8f8] rounded-xl p-4">
                  <span className="material-symbols-outlined text-brand-orange text-[20px]">{icon}</span>
                  <span className="font-bold text-sm text-gray-900">{label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══ VALUES ══ */}
      <section className="py-24 bg-[#f8f8f8]">
        <div className="max-w-[1100px] mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="text-brand-orange text-xs font-extrabold uppercase tracking-widest mb-4 block">What We Stand For</span>
            <h2 className="text-3xl md:text-[2.75rem] font-extrabold">Our <span className="text-brand-orange">core values</span></h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <motion.div key={v.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="bg-white rounded-2xl p-8 shadow-[0_4px_25px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_35px_rgba(0,0,0,0.09)] transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-orange-50 text-brand-orange flex items-center justify-center mb-5">
                  <span className="material-symbols-outlined">{v.icon}</span>
                </div>
                <h3 className="font-extrabold text-lg mb-3">{v.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ TIMELINE ══ */}
      <section className="py-24 bg-white">
        <div className="max-w-[900px] mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="text-brand-orange text-xs font-extrabold uppercase tracking-widest mb-4 block">Our Journey</span>
            <h2 className="text-3xl md:text-[2.75rem] font-extrabold">From startup to <span className="text-brand-orange">10,000+ clients</span></h2>
          </motion.div>
          <div className="relative">
            <div className="absolute left-[28px] top-0 bottom-0 w-px bg-gray-100 hidden md:block" />
            <div className="space-y-10">
              {timeline.map((item, i) => (
                <motion.div key={item.year} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                  className="flex gap-6 items-start">
                  <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-orange-50 border-2 border-orange-100 flex items-center justify-center relative z-10">
                    <span className="text-brand-orange font-extrabold text-xs">{item.year}</span>
                  </div>
                  <div className="pt-2 pb-6 border-b border-gray-50 flex-1">
                    <h3 className="font-extrabold text-lg mb-1">{item.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ TEAM ══ */}
      <section className="py-24 bg-[#f8f8f8]">
        <div className="max-w-[1100px] mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="text-brand-orange text-xs font-extrabold uppercase tracking-widest mb-4 block">The People Behind EazyTaxes</span>
            <h2 className="text-3xl md:text-[2.75rem] font-extrabold">Meet the <span className="text-brand-orange">leadership team</span></h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((member, i) => (
              <motion.div key={member.name} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="bg-white rounded-2xl overflow-hidden shadow-[0_4px_25px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_35px_rgba(0,0,0,0.09)] transition-all group">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={member.img} alt={member.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6">
                  <h3 className="font-extrabold text-lg mb-0.5">{member.name}</h3>
                  <p className="text-brand-orange text-xs font-extrabold uppercase tracking-wider mb-3">{member.role}</p>
                  <p className="text-sm text-gray-500 leading-relaxed">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PRESS ══ */}
      <section className="py-14 bg-white border-y border-gray-100">
        <div className="max-w-[900px] mx-auto px-6">
          <p className="text-center text-xs font-extrabold uppercase tracking-widest text-gray-400 mb-8">As Featured In</p>
          <div className="flex flex-wrap justify-center items-center gap-10 opacity-40">
            {press.map(p => <span key={p} className="text-xl font-extrabold text-gray-800 tracking-tight">{p}</span>)}
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
              Ready to work with a firm that <span className="text-brand-orange">actually cares?</span>
            </h2>
            <p className="text-gray-400 text-lg mb-10 max-w-md mx-auto">Schedule a free 30-minute consultation with a licensed CPA — no commitment, no pressure.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-[#1b75ff] hover:bg-[#155bcd] text-white font-bold px-10 py-4 rounded-full shadow-[0_6px_25px_rgba(27,117,255,0.4)] transition-all hover:-translate-y-0.5">
                <span className="material-symbols-outlined text-[18px]">calendar_month</span>
                Schedule a Free Consultation
              </Link>
              <Link to="/pricing" className="inline-flex items-center justify-center bg-white/10 hover:bg-white/15 text-white font-bold rounded-full px-10 py-4 border border-white/15 transition-all">
                View Pricing
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
