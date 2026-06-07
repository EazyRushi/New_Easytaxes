import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const overallRating = 4.8;
const totalReviews = 2847;

const ratingBreakdown = [
  { stars: 5, count: 2310, pct: 81 },
  { stars: 4, count: 398, pct: 14 },
  { stars: 3, count: 85, pct: 3 },
  { stars: 2, count: 34, pct: 1 },
  { stars: 1, count: 20, pct: 1 },
];

const platforms = [
  { name: 'Google', rating: '4.9', reviews: '1,240', icon: 'search' },
  { name: 'Trustpilot', rating: '4.8', reviews: '890', icon: 'verified' },
  { name: 'BBB', rating: 'A+', reviews: 'Accredited', icon: 'shield' },
  { name: 'Yelp', rating: '4.7', reviews: '480', icon: 'star' },
];

const categories = ['All', 'Tax Services', 'Bookkeeping', 'Payroll', 'Formation', 'Audit Defense'];

const reviews = [
  { name: 'Sarah Chen', company: 'Bloom Studio LLC', role: 'Founder', plan: 'Growth', category: 'Tax Services', rating: 5, date: 'May 2025', img: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=100&q=80', review: "I've worked with EazyTaxes for 3 years now. Their professionalism and responsiveness is unmatched. My taxes are done right, every single time. My dedicated CPA actually knows my business — she proactively flagged a deduction I had been missing for two years. Saved me over $4,000.", featured: true },
  { name: 'Marcus Rivera', company: 'Rivera Construction', role: 'CEO', plan: 'Enterprise', category: 'Tax Services', rating: 5, date: 'Apr 2025', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80', review: "Switching to EazyTaxes saved us over $12,000 in our first year. The quarterly strategy sessions alone are worth the investment. We went from scrambling at tax time to having a real plan year-round.", featured: true },
  { name: 'Priya Patel', company: 'Independent Consultant', role: 'Self-Employed', plan: 'Starter', category: 'Bookkeeping', rating: 5, date: 'Apr 2025', img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=100&q=80', review: "As a freelancer, taxes used to terrify me. Now I just send my docs and everything is handled. Best decision I ever made for my business. The bookkeeping alone saves me 5 hours a month.", featured: false },
  { name: 'Jordan Lee', company: 'NexaFlow Inc.', role: 'Founder', plan: 'Enterprise', category: 'Formation', rating: 5, date: 'Mar 2025', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=100&q=80', review: "The fractional CFO service gave us investor-ready financials that helped us close our Series A. Our lead investor specifically commented on how clean our books were. EazyTaxes is a core part of our team.", featured: true },
  { name: 'Amanda Torres', company: 'The Nourish Kitchen', role: 'Owner', plan: 'Growth', category: 'Payroll', rating: 5, date: 'Mar 2025', img: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?auto=format&fit=crop&w=100&q=80', review: "Running a restaurant with 22 employees, payroll is a nightmare. EazyTaxes handles everything — tip credits, overtime, quarterly filings. I haven't had a single payroll issue in 18 months. Pure peace of mind.", featured: false },
  { name: 'Kevin Park', company: 'Park Digital Agency', role: 'Director', plan: 'Growth', category: 'Bookkeeping', rating: 5, date: 'Feb 2025', img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=100&q=80', review: "Clean, accurate books delivered by the 10th of every month. When I raise my next round, I'm not going to be scrambling to put together financials. EazyTaxes has done that work for me every single month.", featured: false },
  { name: 'Dr. Lisa Hammond', company: 'Hammond Family Dental', role: 'Practice Owner', plan: 'Enterprise', category: 'Tax Services', rating: 5, date: 'Feb 2025', img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80', review: "My previous CPA missed a depreciation election that cost me $8,000. EazyTaxes caught it in the first review, filed an amended return, and got me a refund. I've been with them ever since.", featured: false },
  { name: 'Roberto Vasquez', company: 'V&V Trucking LLC', role: 'Owner-Operator', plan: 'Starter', category: 'Tax Services', rating: 5, date: 'Jan 2025', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80', review: "IFTA filing, per diem deductions, equipment depreciation — they know trucking inside and out. Saved me $6,500 my first year. They respond same day. I've recommended them to 6 other truckers.", featured: false },
  { name: 'Michelle Okonkwo', company: 'Bright Path Nonprofit', role: 'Executive Director', plan: 'Growth', category: 'Tax Services', rating: 5, date: 'Jan 2025', img: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=100&q=80', review: "990 filing, grant tracking, donor records — all handled seamlessly. Our board auditor had zero comments this year. That has never happened before. EazyTaxes changed our organization.", featured: false },
  { name: 'Tyler Brooks', company: 'Brooks E-Commerce', role: 'CEO', plan: 'Growth', category: 'Bookkeeping', rating: 4, date: 'Dec 2024', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80', review: "Great service overall. Shopify and Amazon integration works perfectly. Books are always clean. Only reason for 4 stars is that onboarding took a few extra days. But once we were up and running, it's been flawless.", featured: false },
  { name: 'Nina Shah', company: 'Shah Law PLLC', role: 'Attorney', plan: 'Starter', category: 'Audit Defense', rating: 5, date: 'Dec 2024', img: 'https://images.unsplash.com/photo-1598550874175-4d0ef436c909?auto=format&fit=crop&w=100&q=80', review: "Got an IRS audit notice and panicked. EazyTaxes took over completely — handled all correspondence, attended the audit, and got the full amount dismissed. I didn't have to do a single thing.", featured: false },
  { name: 'Chris Dawson', company: 'Dawson Realty Group', role: 'Broker', plan: 'Growth', category: 'Tax Services', rating: 5, date: 'Nov 2024', img: 'https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=crop&w=100&q=80', review: "1031 exchange on three properties in one year — EazyTaxes handled every piece without breaking a sweat. Cost segregation study saved me $22,000 in taxes in year one. Worth every penny.", featured: false },
];

const caseStudies = [
  { company: 'Rivera Construction', industry: 'Construction', result: '$12,400 saved in Year 1', desc: 'By restructuring as an S-Corp and optimizing quarterly estimates, we reduced Marcus\'s tax burden by 22% while adding full payroll and bookkeeping services.', icon: 'construction', color: 'bg-blue-50 text-[#1b75ff]' },
  { company: 'NexaFlow Inc.', industry: 'SaaS Startup', result: 'Series A Closed', desc: 'Investor-ready financials, R&D tax credit analysis ($85K recovered), and fractional CFO services that helped NexaFlow\'s lead investor say yes.', icon: 'rocket_launch', color: 'bg-orange-50 text-brand-orange' },
  { company: 'Hammond Family Dental', industry: 'Healthcare', result: '$8,000 Refund Recovered', desc: 'Caught a missed depreciation election from a prior-year return. Filed amended return and recovered $8,000. Now handles full practice accounting.', icon: 'medical_services', color: 'bg-green-50 text-green-600' },
];

function Stars({ count, size = 'text-[16px]' }) {
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map(i => (
        <span key={i} className={`material-symbols-outlined ${size} ${i <= count ? 'text-brand-orange' : 'text-gray-200'}`}
          style={{ fontVariationSettings: i <= count ? "'FILL' 1" : "'FILL' 0" }}>star</span>
      ))}
    </div>
  );
}

export default function Reviews() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [visibleCount, setVisibleCount] = useState(6);

  const filtered = reviews.filter(r => activeCategory === 'All' || r.category === activeCategory);
  const visible = filtered.slice(0, visibleCount);

  return (
    <div className="bg-white text-gray-900 font-body overflow-x-clip">

      {/* ══ HERO ══ */}
      <section className="relative bg-gray-900 pt-36 pb-28 overflow-hidden text-center">
        <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 0)', backgroundSize: '28px 28px' }} />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-brand-orange/15 blur-[120px] pointer-events-none" />
        <div className="relative max-w-[800px] mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
            <span className="inline-flex items-center gap-2 bg-white/10 border border-white/15 text-white/80 text-xs font-bold px-4 py-2 rounded-full mb-8 uppercase tracking-widest">
              <span className="material-symbols-outlined text-brand-orange text-[14px]">star</span>
              Client Reviews
            </span>
            <h1 className="text-5xl md:text-[4.5rem] font-extrabold text-white leading-[1.1] mb-6">
              Don't take our word <span className="text-brand-orange italic font-normal">for it.</span>
            </h1>
            <p className="text-lg text-gray-400 max-w-xl mx-auto mb-10">
              Over 10,000 businesses trust EazyTaxes. Here's what they have to say.
            </p>
            {/* Big rating display */}
            <div className="inline-flex flex-col items-center gap-3">
              <p className="text-7xl font-extrabold text-white">{overallRating}</p>
              <Stars count={5} size="text-[28px]" />
              <p className="text-gray-400 text-sm">{totalReviews.toLocaleString()} verified reviews</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══ RATING BREAKDOWN + PLATFORMS ══ */}
      <section className="bg-[#f8f8f8] py-16">
        <div className="max-w-[1100px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Rating bars */}
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="bg-white rounded-2xl p-8 shadow-[0_4px_25px_rgba(0,0,0,0.05)] border border-gray-100">
            <h3 className="font-extrabold text-xl mb-6">Rating Breakdown</h3>
            <div className="space-y-3">
              {ratingBreakdown.map(r => (
                <div key={r.stars} className="flex items-center gap-3">
                  <span className="text-sm font-bold text-gray-600 w-4">{r.stars}</span>
                  <span className="material-symbols-outlined text-brand-orange text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} whileInView={{ width: `${r.pct}%` }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.1 }}
                      className="h-full bg-brand-orange rounded-full" />
                  </div>
                  <span className="text-xs text-gray-400 font-semibold w-8">{r.pct}%</span>
                </div>
              ))}
            </div>
          </motion.div>
          {/* Platform ratings */}
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="bg-white rounded-2xl p-8 shadow-[0_4px_25px_rgba(0,0,0,0.05)] border border-gray-100">
            <h3 className="font-extrabold text-xl mb-6">Ratings Across Platforms</h3>
            <div className="grid grid-cols-2 gap-4">
              {platforms.map((p, i) => (
                <div key={p.name} className="bg-[#f8f8f8] rounded-xl p-4 flex items-center gap-3">
                  <div className="w-9 h-9 bg-white rounded-lg shadow-sm flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-brand-orange text-[18px]">{p.icon}</span>
                  </div>
                  <div>
                    <p className="font-extrabold text-lg leading-none">{p.rating}</p>
                    <p className="text-xs font-bold text-gray-500">{p.name}</p>
                    <p className="text-[11px] text-gray-400">{p.reviews}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══ FEATURED REVIEWS ══ */}
      <section className="py-20 bg-white">
        <div className="max-w-[1100px] mx-auto px-6">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-3xl md:text-[2.75rem] font-extrabold text-center mb-16">
            Featured <span className="text-brand-orange">client stories</span>
          </motion.h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {reviews.filter(r => r.featured).map((r, i) => (
              <motion.div key={r.name} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className={`rounded-2xl p-8 flex flex-col gap-5 ${i === 1 ? 'bg-gray-900 text-white' : 'bg-[#f8f8f8]'}`}>
                <Stars count={r.rating} />
                <p className={`text-sm leading-relaxed flex-1 italic ${i === 1 ? 'text-gray-300' : 'text-gray-600'}`}>"{r.review}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                  <img src={r.img} alt={r.name} className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
                  <div>
                    <p className={`font-extrabold text-sm ${i === 1 ? 'text-white' : 'text-gray-900'}`}>{r.name}</p>
                    <p className={`text-[11px] ${i === 1 ? 'text-gray-400' : 'text-gray-500'}`}>{r.role}, {r.company}</p>
                  </div>
                  <span className={`ml-auto text-[11px] font-bold px-2.5 py-1 rounded-full ${i === 1 ? 'bg-white/10 text-gray-300' : 'bg-white border border-gray-200 text-gray-500'}`}>{r.plan}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CASE STUDIES ══ */}
      <section className="py-20 bg-[#f8f8f8]">
        <div className="max-w-[1100px] mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <span className="text-brand-orange text-xs font-extrabold uppercase tracking-widest mb-4 block">Real Results</span>
            <h2 className="text-3xl md:text-[2.75rem] font-extrabold">Client <span className="text-brand-orange">case studies</span></h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {caseStudies.map((cs, i) => (
              <motion.div key={cs.company} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-[0_4px_25px_rgba(0,0,0,0.05)] border border-gray-100 hover:shadow-[0_8px_35px_rgba(0,0,0,0.09)] transition-shadow">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${cs.color}`}>
                  <span className="material-symbols-outlined">{cs.icon}</span>
                </div>
                <p className="text-xs font-extrabold uppercase tracking-widest text-gray-400 mb-1">{cs.industry}</p>
                <h3 className="font-extrabold text-xl mb-2">{cs.company}</h3>
                <div className="bg-orange-50 rounded-xl px-4 py-2.5 mb-4 inline-block">
                  <p className="text-brand-orange font-extrabold text-sm">{cs.result}</p>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">{cs.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ ALL REVIEWS ══ */}
      <section className="py-20 bg-white">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map(cat => (
              <button key={cat} onClick={() => { setActiveCategory(cat); setVisibleCount(6); }}
                className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${activeCategory === cat ? 'bg-gray-900 text-white' : 'bg-[#f8f8f8] border border-gray-200 text-gray-600 hover:border-gray-400'}`}>
                {cat}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <AnimatePresence mode="wait">
              {visible.map((r, i) => (
                <motion.div key={r.name + r.date} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ delay: i * 0.05 }}
                  className="bg-[#f8f8f8] rounded-2xl p-6 flex flex-col gap-4 border border-gray-100 hover:border-orange-200 transition-colors">
                  <div className="flex items-start justify-between gap-3">
                    <Stars count={r.rating} size="text-[14px]" />
                    <span className="text-[11px] text-gray-400 flex-shrink-0">{r.date}</span>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed flex-1 italic">"{r.review}"</p>
                  <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
                    <img src={r.img} alt={r.name} className="w-9 h-9 rounded-full object-cover flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-extrabold text-sm truncate">{r.name}</p>
                      <p className="text-[11px] text-gray-400 truncate">{r.company}</p>
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-white border border-gray-200 text-gray-500 flex-shrink-0">{r.category}</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          {visibleCount < filtered.length && (
            <div className="text-center mt-10">
              <button onClick={() => setVisibleCount(v => v + 6)}
                className="inline-flex items-center gap-2 bg-[#f8f8f8] border border-gray-200 hover:border-brand-orange text-gray-700 hover:text-brand-orange font-bold px-8 py-3.5 rounded-full transition-all">
                <span className="material-symbols-outlined text-[18px]">expand_more</span>
                Load More Reviews
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section className="relative py-28 bg-gray-900 text-white text-center overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 0)', backgroundSize: '28px 28px' }} />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand-orange/15 blur-[100px] pointer-events-none" />
        <div className="relative max-w-[700px] mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Stars count={5} size="text-[28px]" />
            <h2 className="text-4xl md:text-5xl font-extrabold mt-6 mb-5 leading-tight">
              Join <span className="text-brand-orange">10,000+</span> happy clients
            </h2>
            <p className="text-gray-400 text-lg mb-10">Schedule a free consultation and see why businesses across the country choose EazyTaxes.</p>
            <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-[#1b75ff] hover:bg-[#155bcd] text-white font-bold px-10 py-4 rounded-full shadow-[0_6px_25px_rgba(27,117,255,0.4)] transition-all hover:-translate-y-0.5">
              <span className="material-symbols-outlined text-[18px]">calendar_month</span>
              Schedule a Free Consultation
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
