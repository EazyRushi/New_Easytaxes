import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const regions = [
  {
    name: 'Northeast',
    icon: 'location_city',
    color: 'bg-blue-50 text-[#1b75ff]',
    states: [
      { name: 'New York', abbr: 'NY', city: 'New York City', highlight: true },
      { name: 'New Jersey', abbr: 'NJ', city: 'Newark' },
      { name: 'Pennsylvania', abbr: 'PA', city: 'Philadelphia' },
      { name: 'Massachusetts', abbr: 'MA', city: 'Boston' },
      { name: 'Connecticut', abbr: 'CT', city: 'Hartford' },
      { name: 'Rhode Island', abbr: 'RI', city: 'Providence' },
      { name: 'Vermont', abbr: 'VT', city: 'Burlington' },
      { name: 'New Hampshire', abbr: 'NH', city: 'Manchester' },
      { name: 'Maine', abbr: 'ME', city: 'Portland' },
    ],
  },
  {
    name: 'Southeast',
    icon: 'wb_sunny',
    color: 'bg-orange-50 text-brand-orange',
    states: [
      { name: 'Florida', abbr: 'FL', city: 'Miami', highlight: true },
      { name: 'Georgia', abbr: 'GA', city: 'Atlanta', highlight: true },
      { name: 'North Carolina', abbr: 'NC', city: 'Charlotte' },
      { name: 'South Carolina', abbr: 'SC', city: 'Columbia' },
      { name: 'Virginia', abbr: 'VA', city: 'Richmond' },
      { name: 'Tennessee', abbr: 'TN', city: 'Nashville' },
      { name: 'Alabama', abbr: 'AL', city: 'Birmingham' },
      { name: 'Mississippi', abbr: 'MS', city: 'Jackson' },
      { name: 'Kentucky', abbr: 'KY', city: 'Louisville' },
      { name: 'West Virginia', abbr: 'WV', city: 'Charleston' },
      { name: 'Maryland', abbr: 'MD', city: 'Baltimore' },
      { name: 'Delaware', abbr: 'DE', city: 'Wilmington' },
    ],
  },
  {
    name: 'Midwest',
    icon: 'agriculture',
    color: 'bg-green-50 text-green-600',
    states: [
      { name: 'Illinois', abbr: 'IL', city: 'Chicago', highlight: true },
      { name: 'Texas', abbr: 'TX', city: 'Houston', highlight: true },
      { name: 'Ohio', abbr: 'OH', city: 'Columbus' },
      { name: 'Michigan', abbr: 'MI', city: 'Detroit' },
      { name: 'Indiana', abbr: 'IN', city: 'Indianapolis' },
      { name: 'Wisconsin', abbr: 'WI', city: 'Milwaukee' },
      { name: 'Minnesota', abbr: 'MN', city: 'Minneapolis' },
      { name: 'Missouri', abbr: 'MO', city: 'St. Louis' },
      { name: 'Iowa', abbr: 'IA', city: 'Des Moines' },
      { name: 'Kansas', abbr: 'KS', city: 'Wichita' },
      { name: 'Nebraska', abbr: 'NE', city: 'Omaha' },
      { name: 'South Dakota', abbr: 'SD', city: 'Sioux Falls' },
      { name: 'North Dakota', abbr: 'ND', city: 'Fargo' },
    ],
  },
  {
    name: 'Southwest',
    icon: 'local_fire_department',
    color: 'bg-red-50 text-red-500',
    states: [
      { name: 'California', abbr: 'CA', city: 'Los Angeles', highlight: true },
      { name: 'Arizona', abbr: 'AZ', city: 'Phoenix' },
      { name: 'Nevada', abbr: 'NV', city: 'Las Vegas' },
      { name: 'New Mexico', abbr: 'NM', city: 'Albuquerque' },
      { name: 'Oklahoma', abbr: 'OK', city: 'Oklahoma City' },
      { name: 'Arkansas', abbr: 'AR', city: 'Little Rock' },
      { name: 'Louisiana', abbr: 'LA', city: 'New Orleans' },
    ],
  },
  {
    name: 'Northwest & Mountain',
    icon: 'terrain',
    color: 'bg-purple-50 text-purple-600',
    states: [
      { name: 'Washington', abbr: 'WA', city: 'Seattle', highlight: true },
      { name: 'Oregon', abbr: 'OR', city: 'Portland' },
      { name: 'Colorado', abbr: 'CO', city: 'Denver' },
      { name: 'Utah', abbr: 'UT', city: 'Salt Lake City' },
      { name: 'Idaho', abbr: 'ID', city: 'Boise' },
      { name: 'Montana', abbr: 'MT', city: 'Billings' },
      { name: 'Wyoming', abbr: 'WY', city: 'Cheyenne' },
      { name: 'Alaska', abbr: 'AK', city: 'Anchorage' },
      { name: 'Hawaii', abbr: 'HI', city: 'Honolulu' },
    ],
  },
];

const highlights = [
  { city: 'New York City', state: 'NY', img: 'https://images.unsplash.com/photo-1522083165195-3424ed129620?auto=format&fit=crop&w=600&q=80', desc: 'Serving NYC businesses, LLCs, and high-earners with NYC-specific tax compliance.' },
  { city: 'Los Angeles', state: 'CA', img: 'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?auto=format&fit=crop&w=600&q=80', desc: 'California tax compliance, entertainment industry filings, and multi-state nexus.' },
  { city: 'Miami', state: 'FL', img: 'https://images.unsplash.com/photo-1533106497176-45ae19e68ba2?auto=format&fit=crop&w=600&q=80', desc: 'Florida\'s no-income-tax advantage — we help you maximize your savings here.' },
  { city: 'Chicago', state: 'IL', img: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=600&q=80', desc: 'Illinois business tax, Chicago city tax, and small business services in the Midwest.' },
  { city: 'Houston', state: 'TX', img: 'https://images.unsplash.com/photo-1530089711124-9ca31fb9e863?auto=format&fit=crop&w=600&q=80', desc: 'Texas franchise tax, energy sector filings, and LLC formation for the Lone Star State.' },
  { city: 'Atlanta', state: 'GA', img: 'https://images.unsplash.com/photo-1575368166122-b72a07095b90?auto=format&fit=crop&w=600&q=80', desc: 'Georgia small business services, startup formation, and state tax compliance.' },
];

export default function Locations() {
  const [activeRegion, setActiveRegion] = useState('All');
  const [search, setSearch] = useState('');

  const allStates = regions.flatMap(r => r.states);
  const searchFiltered = search.length > 1
    ? allStates.filter(s => s.name.toLowerCase().includes(search.toLowerCase()) || s.abbr.toLowerCase().includes(search.toLowerCase()) || s.city.toLowerCase().includes(search.toLowerCase()))
    : null;

  const displayRegions = activeRegion === 'All' ? regions : regions.filter(r => r.name === activeRegion);

  return (
    <div className="bg-white text-gray-900 font-body overflow-x-clip">

      {/* ══════ HERO ══════ */}
      <section className="relative overflow-hidden bg-gray-900 pt-32 pb-28 text-center">
        <div className="absolute inset-0 opacity-[0.06]" style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 0)',
          backgroundSize: '28px 28px'
        }} />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-brand-orange/15 blur-[120px] pointer-events-none" />
        <div className="relative max-w-[900px] mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
            <span className="inline-flex items-center gap-2 bg-white/10 border border-white/15 text-white/80 text-xs font-bold px-4 py-2 rounded-full mb-8 uppercase tracking-widest">
              <span className="material-symbols-outlined text-brand-orange text-[14px]">location_on</span>
              All 50 States
            </span>
            <h1 className="text-5xl md:text-[4.5rem] font-extrabold text-white leading-[1.1] mb-6">
              CPA solutions <span className="text-brand-orange italic font-normal">everywhere</span> you do business.
            </h1>
            <p className="text-lg text-gray-400 max-w-xl mx-auto mb-10 leading-relaxed">
              EazyTaxes operates in all 50 states. No matter where your business is registered or where you operate, we've got you covered.
            </p>
            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 text-white">
              {[['50', 'States Covered'], ['10K+', 'Clients Served'], ['All', 'Entity Types'], ['100%', 'Remote Service']].map(([val, label]) => (
                <div key={label} className="text-center">
                  <p className="text-3xl font-extrabold text-brand-orange">{val}</p>
                  <p className="text-xs text-gray-400 font-semibold mt-0.5">{label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════ HIGHLIGHTED CITIES ══════ */}
      <section className="bg-[#f8f8f8] pt-0 pb-20">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="-mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {highlights.map((h, i) => (
              <motion.div key={h.city} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * i }}
                className="bg-white rounded-2xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)] transition-all group border border-gray-100">
                <div className="aspect-[16/8] overflow-hidden relative">
                  <img src={h.img} alt={h.city} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />
                  <div className="absolute bottom-3 left-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-white text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>location_on</span>
                    <span className="text-white font-extrabold text-lg">{h.city}</span>
                    <span className="bg-brand-orange text-white text-[10px] font-bold px-2 py-0.5 rounded-full">{h.state}</span>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-sm text-gray-500 leading-relaxed mb-4">{h.desc}</p>
                  <Link to="/contact" className="text-brand-orange font-bold text-xs flex items-center gap-1 hover:gap-2 transition-all">
                    Get CPA Help in {h.city}
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ ALL STATES ══════ */}
      <section className="py-20 bg-white">
        <div className="max-w-[1100px] mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl md:text-[2.75rem] font-extrabold mb-4">
              Active in <span className="text-brand-orange">all 50 states</span>
            </h2>
            <p className="text-gray-500 max-w-lg mx-auto">Our licensed CPAs handle state-specific compliance, filings, and registrations across every jurisdiction.</p>
          </motion.div>

          {/* Controls */}
          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            {/* Search */}
            <div className="relative flex-1 max-w-sm">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-[18px]">search</span>
              <input type="text" placeholder="Search state or city..." value={search} onChange={e => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:border-brand-orange text-sm" />
            </div>
            {/* Region Filter */}
            <div className="flex flex-wrap gap-2">
              {['All', ...regions.map(r => r.name)].map(r => (
                <button key={r} onClick={() => { setActiveRegion(r); setSearch(''); }}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${activeRegion === r && !search ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                  {r}
                </button>
              ))}
            </div>
          </div>

          {/* Search results */}
          {searchFiltered ? (
            <div>
              <p className="text-sm text-gray-500 mb-6">{searchFiltered.length} state{searchFiltered.length !== 1 ? 's' : ''} found</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {searchFiltered.map(s => <StateCard key={s.abbr} state={s} />)}
              </div>
            </div>
          ) : (
            <div className="space-y-10">
              {displayRegions.map((region, ri) => (
                <motion.div key={region.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: ri * 0.06 }}>
                  <div className="flex items-center gap-3 mb-5">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${region.color}`}>
                      <span className="material-symbols-outlined text-[18px]">{region.icon}</span>
                    </div>
                    <h3 className="font-extrabold text-xl text-gray-900">{region.name}</h3>
                    <span className="text-xs text-gray-400 font-medium">{region.states.length} states</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                    {region.states.map(s => <StateCard key={s.abbr} state={s} />)}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ══════ REMOTE SERVICE BANNER ══════ */}
      <section className="py-16 bg-[#f8f8f8] border-y border-gray-100">
        <div className="max-w-[1000px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { icon: 'public', title: '100% Remote', desc: 'No office visit needed. Everything is handled securely online, wherever you are.' },
              { icon: 'verified', title: 'State-Licensed CPAs', desc: 'Our CPAs hold active licenses in multiple states to serve you in full compliance.' },
              { icon: 'speed', title: 'Same-Day Start', desc: 'Onboard today and your dedicated accountant is assigned within one business day.' },
            ].map((item, i) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center mx-auto mb-4">
                  <span className="material-symbols-outlined text-brand-orange">{item.icon}</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ CTA ══════ */}
      <section className="relative py-28 bg-gray-900 text-white text-center overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 0)', backgroundSize: '28px 28px' }} />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand-orange/15 blur-[100px] pointer-events-none" />
        <div className="relative max-w-[700px] mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-5 leading-tight">
              No matter where you are,<br /><span className="text-brand-orange">we've got you covered.</span>
            </h2>
            <p className="text-gray-400 text-lg mb-10 max-w-md mx-auto">Schedule a free consultation with a CPA who knows your state's tax laws inside and out.</p>
            <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-[#1b75ff] hover:bg-[#155bcd] text-white font-bold px-10 py-4 rounded-full shadow-[0_6px_25px_rgba(27,117,255,0.4)] transition-all hover:-translate-y-0.5 text-[15px]">
              <span className="material-symbols-outlined text-[18px]">calendar_month</span>
              Schedule a Free Consultation
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

function StateCard({ state }) {
  return (
    <Link to="/contact"
      className={`group flex items-center gap-3 bg-white border rounded-xl px-4 py-3.5 hover:border-brand-orange hover:shadow-[0_4px_20px_rgba(250,130,0,0.1)] transition-all ${state.highlight ? 'border-orange-200 bg-orange-50/30' : 'border-gray-100'}`}>
      <span className={`text-sm font-extrabold w-8 flex-shrink-0 ${state.highlight ? 'text-brand-orange' : 'text-gray-400'}`}>{state.abbr}</span>
      <div className="overflow-hidden">
        <p className="font-bold text-[13px] text-gray-900 group-hover:text-brand-orange transition-colors truncate">{state.name}</p>
        <p className="text-[11px] text-gray-400 truncate">{state.city}</p>
      </div>
    </Link>
  );
}
