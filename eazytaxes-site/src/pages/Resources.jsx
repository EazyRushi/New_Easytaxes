import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const categories = ['All', 'Tax Strategy', 'Bookkeeping', 'Payroll', 'Business Formation', 'IRS & Compliance'];

const posts = [
  {
    img: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80',
    category: 'Tax Strategy',
    date: 'May 28, 2025',
    readTime: '6 min read',
    title: 'How to Prepare Your Business for Tax Changes in 2026',
    desc: 'New regulations are coming. Here\'s what every small business owner needs to know before year-end — and the moves to make now.',
    featured: true,
  },
  {
    img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    category: 'Tax Strategy',
    date: 'May 15, 2025',
    readTime: '5 min read',
    title: 'Small Business Tax Deductions You Might Be Missing',
    desc: 'Most business owners leave thousands on the table. This guide covers the top overlooked deductions for LLCs and S-Corps.',
    featured: false,
  },
  {
    img: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=800&q=80',
    category: 'Bookkeeping',
    date: 'Apr 30, 2025',
    readTime: '7 min read',
    title: 'How to Set Up Bookkeeping for Your Small Business',
    desc: 'A step-by-step guide that walks you through setting up clean, organized financial records from day one.',
    featured: false,
  },
  {
    img: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80',
    category: 'Business Formation',
    date: 'Apr 18, 2025',
    readTime: '4 min read',
    title: 'LLC vs S-Corp: Which Is Right for Your Business?',
    desc: 'The entity you choose impacts your taxes for years. We break down the real differences and when to elect S-Corp status.',
    featured: false,
  },
  {
    img: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=800&q=80',
    category: 'Payroll',
    date: 'Apr 5, 2025',
    readTime: '5 min read',
    title: 'The Complete Guide to Payroll Taxes for Small Business',
    desc: 'Everything you need to know about FICA, FUTA, state withholdings, and quarterly deposits — explained in plain English.',
    featured: false,
  },
  {
    img: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80',
    category: 'IRS & Compliance',
    date: 'Mar 20, 2025',
    readTime: '8 min read',
    title: 'Got an IRS Notice? Here\'s Exactly What to Do',
    desc: 'Don\'t panic. Most IRS notices are routine — but every one requires a timely, accurate response. Here\'s the playbook.',
    featured: false,
  },
  {
    img: 'https://images.unsplash.com/photo-1434626881859-194d67b2b86f?auto=format&fit=crop&w=800&q=80',
    category: 'Tax Strategy',
    date: 'Mar 8, 2025',
    readTime: '6 min read',
    title: 'Quarterly Estimated Taxes: A Complete Guide',
    desc: 'Missing quarterly payments triggers penalties. We cover who needs to pay, how to calculate the right amount, and when.',
    featured: false,
  },
  {
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    category: 'Bookkeeping',
    date: 'Feb 25, 2025',
    readTime: '4 min read',
    title: 'Why Clean Books Are Your Best Tax Strategy',
    desc: 'Organized financials don\'t just make your accountant happy — they directly reduce your tax bill and audit risk.',
    featured: false,
  },
  {
    img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80',
    category: 'Business Formation',
    date: 'Feb 10, 2025',
    readTime: '5 min read',
    title: 'How to Get an EIN: Step-by-Step Guide',
    desc: 'Your Employer Identification Number is required for banking, hiring, and taxes. Here\'s how to get one fast.',
    featured: false,
  },
];

export default function Resources() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [visibleCount, setVisibleCount] = useState(6);

  const filtered = posts.filter(p => activeCategory === 'All' || p.category === activeCategory);
  const visible = filtered.slice(0, visibleCount);
  const featuredPost = posts.find(p => p.featured);
  const gridPosts = visible.filter(p => !p.featured);

  return (
    <div className="bg-white text-gray-900 font-body overflow-x-clip">

      {/* ══════ HERO ══════ */}
      <section className="relative bg-gray-900 pt-32 pb-40">
        <div className="absolute inset-0 opacity-[0.06]" style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 0)',
          backgroundSize: '28px 28px'
        }} />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-brand-orange/15 blur-[120px] pointer-events-none" />
        <div className="relative max-w-[1100px] mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
            <span className="inline-flex items-center gap-2 bg-white/10 border border-white/15 text-white/80 text-xs font-bold px-4 py-2 rounded-full mb-8 uppercase tracking-widest">
              <span className="material-symbols-outlined text-brand-orange text-[14px]">article</span>
              Blog & Resources
            </span>
            <h1 className="text-5xl md:text-[4.5rem] font-extrabold text-white leading-[1.1] mb-6 max-w-3xl">
              Tax tips & <span className="text-brand-orange italic font-normal">business insights.</span>
            </h1>
            <p className="text-lg text-gray-400 max-w-xl leading-relaxed">
              Practical guides, tax strategies, and financial advice written by our licensed CPAs — no jargon, just actionable knowledge.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ══════ FEATURED POST ══════ */}
      {activeCategory === 'All' && featuredPost && (
        <section className="bg-[#f8f8f8] pt-0 pb-0">
          <div className="max-w-[1100px] mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
              className="-mt-20 relative z-10 bg-white rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.1)] border border-gray-100 grid grid-cols-1 lg:grid-cols-2">
              <div className="aspect-[16/9] lg:aspect-auto overflow-hidden">
                <img src={featuredPost.img} alt={featuredPost.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-5">
                  <span className="px-3 py-1 bg-orange-50 text-brand-orange text-xs font-extrabold rounded-full uppercase tracking-wider">{featuredPost.category}</span>
                  <span className="text-xs text-gray-400 font-medium">Featured</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-extrabold mb-4 leading-snug hover:text-brand-orange transition-colors cursor-pointer">{featuredPost.title}</h2>
                <p className="text-gray-500 leading-relaxed mb-8">{featuredPost.desc}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-brand-orange rounded-full flex items-center justify-center text-white font-bold text-sm">E</div>
                    <div>
                      <p className="font-bold text-sm">EazyTaxes Staff</p>
                      <p className="text-xs text-gray-400">{featuredPost.date} · {featuredPost.readTime}</p>
                    </div>
                  </div>
                  <Link to="/contact" className="inline-flex items-center gap-1.5 text-brand-orange font-bold text-sm hover:gap-3 transition-all">
                    Read More <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* ══════ FILTER + GRID ══════ */}
      <section className="py-20 bg-[#f8f8f8]">
        <div className="max-w-[1100px] mx-auto px-6">

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-12">
            {categories.map(cat => (
              <button key={cat} onClick={() => { setActiveCategory(cat); setVisibleCount(6); }}
                className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${activeCategory === cat ? 'bg-gray-900 text-white shadow-md' : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-400'}`}>
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="wait">
              {gridPosts.map((post, i) => (
                <motion.div key={post.title}
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }} transition={{ delay: i * 0.06 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_35px_rgba(0,0,0,0.1)] transition-all hover:-translate-y-1 group cursor-pointer border border-gray-100">
                  <div className="aspect-[16/10] overflow-hidden">
                    <img src={post.img} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-2.5 py-1 bg-orange-50 text-brand-orange text-[11px] font-extrabold rounded-full uppercase tracking-wider">{post.category}</span>
                      <span className="text-[11px] text-gray-400">{post.readTime}</span>
                    </div>
                    <h3 className="font-bold text-lg mb-2 leading-snug group-hover:text-brand-orange transition-colors">{post.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed mb-5">{post.desc}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                      <p className="text-xs text-gray-400">{post.date}</p>
                      <Link to="/contact" className="text-brand-orange font-bold text-xs flex items-center gap-1 hover:gap-2 transition-all">
                        Read <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Load More */}
          {visibleCount < filtered.length && (
            <div className="text-center mt-12">
              <button onClick={() => setVisibleCount(v => v + 3)}
                className="inline-flex items-center gap-2 bg-white border border-gray-200 hover:border-brand-orange text-gray-700 hover:text-brand-orange font-bold px-8 py-3.5 rounded-full transition-all shadow-sm">
                <span className="material-symbols-outlined text-[18px]">expand_more</span>
                Load More Articles
              </button>
            </div>
          )}

          {filtered.length === 0 && (
            <div className="text-center py-20 text-gray-400">
              <span className="material-symbols-outlined text-5xl mb-3 block">search_off</span>
              <p className="font-bold">No posts in this category yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* ══════ NEWSLETTER ══════ */}
      <section className="py-20 bg-white border-y border-gray-100">
        <div className="max-w-[700px] mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="material-symbols-outlined text-brand-orange text-4xl mb-4 block">mail</span>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Stay <span className="text-brand-orange">tax-smart</span></h2>
            <p className="text-gray-500 mb-8">Get our weekly tax tips, deadline reminders, and strategy guides delivered to your inbox.</p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input type="email" placeholder="your@email.com"
                className="flex-1 px-5 py-3.5 rounded-full border border-gray-200 focus:outline-none focus:border-brand-orange text-sm" />
              <button className="bg-brand-orange hover:bg-brand-orangeDark text-white font-bold px-7 py-3.5 rounded-full transition-all shadow-[0_4px_14px_rgba(250,130,0,0.3)] whitespace-nowrap">
                Subscribe Free
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-3">No spam. Unsubscribe anytime.</p>
          </motion.div>
        </div>
      </section>

      {/* ══════ CTA ══════ */}
      <section className="py-20 bg-gray-900 text-white text-center">
        <div className="max-w-[700px] mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Ready to put this into <span className="text-brand-orange">action?</span></h2>
          <p className="text-gray-400 mb-8">Schedule a free consultation and get a personalized tax strategy from a licensed CPA.</p>
          <Link to="/contact" className="inline-flex items-center bg-[#1b75ff] hover:bg-[#155bcd] text-white font-bold rounded-full px-10 py-4 shadow-[0_6px_25px_rgba(27,117,255,0.4)] transition-all hover:-translate-y-0.5">
            Schedule a Free Consultation
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="ml-2"><path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
