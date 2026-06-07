import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const departments = ['All', 'Tax & Accounting', 'Bookkeeping', 'Payroll', 'Technology', 'Client Success'];

const openRoles = [
  { title: 'Senior Tax Manager', dept: 'Tax & Accounting', location: 'Remote / US', type: 'Full-Time', salary: '$95K – $130K', desc: 'Lead a team of CPAs handling complex multi-state filings, S-Corp elections, and year-round tax strategy for a portfolio of 150+ small business clients.', requirements: ['CPA license required', '7+ years in public accounting', 'Multi-state experience', 'Strong client communication'] },
  { title: 'Tax Resolution Specialist (EA/CPA)', dept: 'Tax & Accounting', location: 'Remote / US', type: 'Full-Time', salary: '$75K – $105K', desc: 'Represent business clients before the IRS — handling audits, notices, penalty abatement, and OIC submissions. You\'ll be the client\'s advocate from first letter to final resolution.', requirements: ['EA or CPA required', 'IRS representation experience', 'Knowledge of Collections & Appeals', 'Detail-oriented problem solver'] },
  { title: 'Staff Accountant – Tax Preparation', dept: 'Tax & Accounting', location: 'Remote / US', type: 'Full-Time', salary: '$55K – $75K', desc: 'Prepare federal and state returns for a diverse client base — individuals, LLCs, S-Corps, and partnerships. Work alongside senior CPAs who will actively develop your skills.', requirements: ['CPA candidate or licensed', '2+ years tax prep experience', 'Proficiency in ProConnect or similar', 'Highly organized'] },
  { title: 'Senior Bookkeeper', dept: 'Bookkeeping', location: 'Remote / US', type: 'Full-Time', salary: '$60K – $80K', desc: 'Own the monthly close process for a dedicated portfolio of clients. Reconcile accounts, deliver financial statements, and be the first call when clients have questions about their numbers.', requirements: ['3+ years bookkeeping experience', 'QuickBooks Online ProAdvisor preferred', 'Strong reconciliation skills', 'Client-facing communication'] },
  { title: 'Bookkeeping Team Lead', dept: 'Bookkeeping', location: 'Remote / US', type: 'Full-Time', salary: '$75K – $95K', desc: 'Lead a team of 8 bookkeepers, maintain quality standards, onboard new clients, and work cross-functionally with the tax team to ensure seamless service delivery.', requirements: ['5+ years bookkeeping', 'Prior team management', 'QuickBooks & Xero expertise', 'Process-driven mindset'] },
  { title: 'Payroll Specialist', dept: 'Payroll', location: 'Remote / US', type: 'Full-Time', salary: '$55K – $72K', desc: 'Process biweekly and monthly payroll for 50+ business clients, handle multi-state withholdings, file 940/941 forms, and manage W-2 and 1099 preparation at year-end.', requirements: ['2+ years payroll processing', 'Multi-state payroll experience', 'Familiarity with Gusto or ADP', 'Compliance knowledge (FLSA, FUTA)'] },
  { title: 'Full-Stack Engineer', dept: 'Technology', location: 'Remote / US', type: 'Full-Time', salary: '$110K – $155K', desc: 'Build and maintain the EazyTaxes client portal — a real-time financial dashboard used by 10,000+ business owners. Work on document ingestion, API integrations, and security infrastructure.', requirements: ['4+ years React + Node.js', 'REST API & PostgreSQL', 'Security-conscious development', 'Fintech experience a plus'] },
  { title: 'Client Success Manager', dept: 'Client Success', location: 'Remote / US', type: 'Full-Time', salary: '$60K – $80K', desc: 'Be the primary point of contact for a portfolio of 80+ Growth and Enterprise clients. Drive retention, manage escalations, conduct quarterly business reviews, and identify upsell opportunities.', requirements: ['3+ years client success or account management', 'Financial services background preferred', 'Proactive communicator', 'CRM proficiency (HubSpot)'] },
];

const benefits = [
  { icon: 'health_and_safety', title: 'Full Health Coverage', desc: '100% employer-paid medical, dental, and vision for you. 50% covered for dependents.' },
  { icon: 'beach_access', title: 'Unlimited PTO', desc: 'We trust our team. Take the time you need to rest, recharge, and come back at your best.' },
  { icon: 'home_work', title: '100% Remote', desc: 'Work from anywhere in the US. No commute, no office politics — just great work with a great team.' },
  { icon: 'savings', title: '401(k) + Match', desc: '4% employer match on 401(k) contributions. We invest in your future the same way you invest in ours.' },
  { icon: 'school', title: 'CPA Exam Support', desc: 'Full exam fee reimbursement, paid study time, and a $2,000 bonus when you pass all four sections.' },
  { icon: 'devices', title: 'Home Office Budget', desc: '$1,500 onboarding stipend to set up your workspace. $500 annual tech refresh allowance.' },
  { icon: 'calendar_month', title: 'Flexible Hours', desc: 'Core hours 10am–3pm ET. Outside of that, structure your day around when you do your best work.' },
  { icon: 'trending_up', title: 'Growth Path', desc: 'Structured promotion tracks, semi-annual performance reviews, and real advancement opportunities.' },
];

const values = [
  { icon: 'psychology', title: 'We hire adults', desc: 'No micromanagement. We give you context, resources, and trust — and get out of your way.' },
  { icon: 'groups', title: 'Team-first culture', desc: 'Your teammates genuinely want you to succeed. We celebrate wins together and solve problems together.' },
  { icon: 'speed', title: 'Bias for action', desc: 'We move fast and iterate. If something isn\'t working, we fix it quickly without blame.' },
  { icon: 'forum', title: 'Radical candor', desc: 'We give honest feedback because we care about each other\'s growth. No sugar-coating, no politics.' },
];

const hiringSteps = [
  { num: '01', title: 'Apply Online', desc: 'Submit your resume and a short note about why this role excites you. No cover letter essay required.' },
  { num: '02', title: 'Recruiter Screen', desc: 'A 20-minute video call with our talent team to discuss your background and answer your questions about the role.' },
  { num: '03', title: 'Skills Assessment', desc: 'A role-specific take-home task (max 90 minutes) to demonstrate your technical skills in a real-world scenario.' },
  { num: '04', title: 'Team Interview', desc: 'Two 45-minute conversations — one with your future manager, one with a cross-functional peer. Casual, not a grilling.' },
  { num: '05', title: 'Offer', desc: 'We move fast. Most candidates receive an offer within 48 hours of their final interview.' },
];

export default function Careers() {
  const [activeDept, setActiveDept] = useState('All');
  const [expandedRole, setExpandedRole] = useState(null);

  const filtered = openRoles.filter(r => activeDept === 'All' || r.dept === activeDept);

  return (
    <div className="bg-white text-gray-900 font-body overflow-x-clip">

      {/* ══ HERO ══ */}
      <section className="relative bg-gray-900 pt-36 pb-32 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 0)', backgroundSize: '28px 28px' }} />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-brand-orange/15 blur-[130px] pointer-events-none" />
        <div className="relative max-w-[1100px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
            <span className="inline-flex items-center gap-2 bg-white/10 border border-white/15 text-white/80 text-xs font-bold px-4 py-2 rounded-full mb-8 uppercase tracking-widest">
              <span className="material-symbols-outlined text-brand-orange text-[14px]">work</span>
              We're Hiring
            </span>
            <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-[1.1] mb-6">
              Build your career at a firm that <span className="text-brand-orange italic font-normal">actually cares.</span>
            </h1>
            <p className="text-lg text-gray-400 leading-relaxed mb-10">
              EazyTaxes is a remote-first accounting firm serving 10,000+ businesses across the US. We're growing fast and looking for talented CPAs, bookkeepers, engineers, and client success professionals to join us.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="#open-roles" className="inline-flex items-center bg-brand-orange hover:bg-brand-orangeDark text-white font-bold rounded-full px-8 py-4 shadow-[0_6px_25px_rgba(250,130,0,0.4)] transition-all hover:-translate-y-0.5">
                View Open Roles
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="ml-2"><path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </a>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.2 }}
            className="hidden lg:grid grid-cols-2 gap-4">
            {[
              { value: '100%', label: 'Remote', icon: 'home_work' },
              { value: '8', label: 'Open Roles', icon: 'work' },
              { value: 'A+', label: 'Glassdoor', icon: 'star' },
              { value: '94%', label: 'Would Recommend', icon: 'thumb_up' },
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

      {/* ══ CULTURE VALUES ══ */}
      <section className="py-20 bg-[#f8f8f8]">
        <div className="max-w-[1100px] mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <span className="text-brand-orange text-xs font-extrabold uppercase tracking-widest mb-4 block">How We Work</span>
            <h2 className="text-3xl md:text-[2.75rem] font-extrabold">Our <span className="text-brand-orange">culture</span></h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v, i) => (
              <motion.div key={v.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="bg-white rounded-2xl p-7 shadow-[0_4px_25px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_35px_rgba(0,0,0,0.09)] transition-shadow">
                <div className="w-11 h-11 rounded-xl bg-orange-50 text-brand-orange flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-[20px]">{v.icon}</span>
                </div>
                <h3 className="font-extrabold mb-2">{v.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ BENEFITS ══ */}
      <section className="py-20 bg-white">
        <div className="max-w-[1100px] mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <span className="text-brand-orange text-xs font-extrabold uppercase tracking-widest mb-4 block">Perks & Benefits</span>
            <h2 className="text-3xl md:text-[2.75rem] font-extrabold">We take care of <span className="text-brand-orange">our people</span></h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {benefits.map((b, i) => (
              <motion.div key={b.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                className="bg-[#f8f8f8] rounded-2xl p-7 hover:bg-white hover:shadow-[0_8px_35px_rgba(0,0,0,0.07)] transition-all border border-transparent hover:border-gray-100">
                <div className="w-11 h-11 rounded-xl bg-white shadow-sm border border-gray-100 flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-brand-orange text-[20px]">{b.icon}</span>
                </div>
                <h3 className="font-extrabold mb-2 text-[15px]">{b.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ OPEN ROLES ══ */}
      <section id="open-roles" className="py-20 bg-[#f8f8f8]">
        <div className="max-w-[1100px] mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <span className="text-brand-orange text-xs font-extrabold uppercase tracking-widest mb-4 block">Join Our Team</span>
            <h2 className="text-3xl md:text-[2.75rem] font-extrabold">Open <span className="text-brand-orange">positions</span></h2>
          </motion.div>
          {/* Filter */}
          <div className="flex flex-wrap gap-2 mb-8">
            {departments.map(d => (
              <button key={d} onClick={() => setActiveDept(d)}
                className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${activeDept === d ? 'bg-gray-900 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-400'}`}>
                {d}
              </button>
            ))}
          </div>
          {/* Roles */}
          <div className="space-y-4">
            <AnimatePresence mode="wait">
              {filtered.map((role, i) => (
                <motion.div key={role.title} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ delay: i * 0.05 }}
                  className="bg-white rounded-2xl border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.04)] overflow-hidden">
                  <button onClick={() => setExpandedRole(expandedRole === role.title ? null : role.title)}
                    className="w-full flex flex-col sm:flex-row items-start sm:items-center gap-4 p-6 text-left hover:bg-gray-50/50 transition-colors">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="text-[11px] font-extrabold uppercase tracking-wider text-brand-orange bg-orange-50 px-2.5 py-1 rounded-full">{role.dept}</span>
                        <span className="text-[11px] font-semibold text-gray-400">{role.type}</span>
                      </div>
                      <h3 className="font-extrabold text-xl text-gray-900">{role.title}</h3>
                      <div className="flex flex-wrap gap-4 mt-2">
                        <span className="flex items-center gap-1.5 text-xs text-gray-500">
                          <span className="material-symbols-outlined text-[14px]">location_on</span>{role.location}
                        </span>
                        <span className="flex items-center gap-1.5 text-xs text-gray-500">
                          <span className="material-symbols-outlined text-[14px]">payments</span>{role.salary}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <Link to="/contact" onClick={e => e.stopPropagation()}
                        className="bg-gray-900 hover:bg-gray-700 text-white font-bold text-sm px-6 py-2.5 rounded-full transition-all">
                        Apply Now
                      </Link>
                      <motion.span animate={{ rotate: expandedRole === role.title ? 180 : 0 }} transition={{ duration: 0.2 }}
                        className="material-symbols-outlined text-gray-400 text-xl">expand_more</motion.span>
                    </div>
                  </button>
                  <AnimatePresence initial={false}>
                    {expandedRole === role.title && (
                      <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
                        <div className="px-6 pb-6 border-t border-gray-50 pt-5 grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div>
                            <h4 className="font-extrabold text-sm mb-3">About This Role</h4>
                            <p className="text-sm text-gray-500 leading-relaxed">{role.desc}</p>
                          </div>
                          <div>
                            <h4 className="font-extrabold text-sm mb-3">Requirements</h4>
                            <ul className="space-y-2">
                              {role.requirements.map(req => (
                                <li key={req} className="flex items-start gap-2 text-sm text-gray-500">
                                  <span className="material-symbols-outlined text-brand-orange text-[16px] mt-0.5 flex-shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                                  {req}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ══ HIRING PROCESS ══ */}
      <section className="py-20 bg-white">
        <div className="max-w-[900px] mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <span className="text-brand-orange text-xs font-extrabold uppercase tracking-widest mb-4 block">What to Expect</span>
            <h2 className="text-3xl md:text-[2.75rem] font-extrabold">Our hiring <span className="text-brand-orange">process</span></h2>
          </motion.div>
          <div className="space-y-6">
            {hiringSteps.map((step, i) => (
              <motion.div key={step.num} initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="flex gap-6 items-start">
                <div className="w-14 h-14 rounded-2xl bg-orange-50 border-2 border-orange-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-brand-orange font-extrabold text-sm">{step.num}</span>
                </div>
                <div className="pt-2 flex-1 pb-6 border-b border-gray-50">
                  <h3 className="font-extrabold text-lg mb-1">{step.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
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
              Don't see the right role? <span className="text-brand-orange">Reach out anyway.</span>
            </h2>
            <p className="text-gray-400 text-lg mb-10">We're always interested in meeting exceptional CPAs, bookkeepers, and operators. Send us your resume and a note about what you're looking for.</p>
            <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-brand-orange hover:bg-brand-orangeDark text-white font-bold px-10 py-4 rounded-full shadow-[0_6px_25px_rgba(250,130,0,0.4)] transition-all hover:-translate-y-0.5">
              <span className="material-symbols-outlined text-[18px]">send</span>
              Send Your Resume
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
