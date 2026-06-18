import { useState } from 'react';
import {
  ScrollFadeUp,
  ScrollSlideIn,
  ScrollBlurReveal,
  ScrollRevealText,
} from '../components/animations/ScrollAnimations';

const API = import.meta.env.VITE_API_URL ?? 'http://localhost:4000/api';

const BLANK = { firstName: '', lastName: '', email: '', inquiryType: 'Tax & Compliance', message: '' };

export default function Contact() {
  const [form, setForm]     = useState(BLANK);
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errMsg, setErrMsg] = useState('');

  const set = (k) => (e) => setForm(p => ({ ...p, [k]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrMsg('');
    try {
      const res = await fetch(`${API}/contact`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Submission failed');
      setStatus('success');
      setForm(BLANK);
    } catch (err) {
      setErrMsg(err.message);
      setStatus('error');
    }
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden editorial-gradient -mt-20 pt-20">
        <div className="noise-overlay absolute inset-0 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 w-full">
          <ScrollBlurReveal className="max-w-3xl" offset={["start 0.95", "start 0.55"]}>
            <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl text-white leading-tight mb-8">
              Connect <br/>
              <span className="italic text-secondary-fixed-dim">With Us.</span>
            </h1>
            <p className="text-on-primary-container text-xl max-w-xl leading-relaxed">
              Schedule an advisory session with our managing directors or reach out for specialized compliance support.
            </p>
          </ScrollBlurReveal>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-16">
          <ScrollSlideIn direction="left" distance={80}>
            <h2 className="font-headline text-4xl text-primary mb-8">
              <ScrollRevealText text="Start the Conversation" tag="span" />
            </h2>
            <p className="font-body text-on-surface-variant text-lg mb-12">
              Our team is ready to analyze your financial architecture and provide actionable insights. Fill out the form, and a senior advisor will be in touch within 24 hours.
            </p>

            <div className="space-y-8">
              <ScrollFadeUp offset={["start 0.9", "start 0.6"]}>
                <div className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-secondary text-3xl">location_on</span>
                  <div>
                    <h4 className="font-headline text-xl text-primary mb-2">Headquarters</h4>
                    <p className="text-on-surface-variant">100 Financial District Ave<br/>New York, NY 10005</p>
                  </div>
                </div>
              </ScrollFadeUp>
              <ScrollFadeUp offset={["start 0.85", "start 0.55"]}>
                <div className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-secondary text-3xl">mail</span>
                  <div>
                    <h4 className="font-headline text-xl text-primary mb-2">Email</h4>
                    <p className="text-on-surface-variant">advisory@eazytaxes.com</p>
                  </div>
                </div>
              </ScrollFadeUp>
              <ScrollFadeUp offset={["start 0.8", "start 0.5"]}>
                <div className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-secondary text-3xl">phone</span>
                  <div>
                    <h4 className="font-headline text-xl text-primary mb-2">Phone</h4>
                    <p className="text-on-surface-variant">+1 (800) 555-0199</p>
                  </div>
                </div>
              </ScrollFadeUp>
            </div>
          </ScrollSlideIn>

          <ScrollSlideIn direction="right" distance={80} className="bg-surface-container-highest p-10 rounded-xl shadow-editorial">

            {status === 'success' ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-16">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-green-600 text-4xl">check_circle</span>
                </div>
                <h3 className="font-headline text-2xl text-primary mb-3">Message Sent!</h3>
                <p className="text-on-surface-variant mb-6">We've received your inquiry and a confirmation email is on its way. A senior advisor will be in touch within 24 hours.</p>
                <button onClick={() => setStatus('idle')} className="text-sm text-secondary font-semibold hover:underline">Send another message</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-label text-xs uppercase tracking-widest text-primary font-bold mb-2">First Name *</label>
                    <input
                      type="text"
                      value={form.firstName}
                      onChange={set('firstName')}
                      required
                      className="w-full bg-white border border-outline-variant/30 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:border-secondary-container transition-all"
                    />
                  </div>
                  <div>
                    <label className="block font-label text-xs uppercase tracking-widest text-primary font-bold mb-2">Last Name</label>
                    <input
                      type="text"
                      value={form.lastName}
                      onChange={set('lastName')}
                      className="w-full bg-white border border-outline-variant/30 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:border-secondary-container transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="block font-label text-xs uppercase tracking-widest text-primary font-bold mb-2">Corporate Email *</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={set('email')}
                    required
                    className="w-full bg-white border border-outline-variant/30 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:border-secondary-container transition-all"
                  />
                </div>
                <div>
                  <label className="block font-label text-xs uppercase tracking-widest text-primary font-bold mb-2">Inquiry Type</label>
                  <select
                    value={form.inquiryType}
                    onChange={set('inquiryType')}
                    className="w-full bg-white border border-outline-variant/30 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:border-secondary-container transition-all appearance-none"
                  >
                    <option>Tax & Compliance</option>
                    <option>Assurance & SOC 2</option>
                    <option>CFO Advisory</option>
                    <option>Other Services</option>
                  </select>
                </div>
                <div>
                  <label className="block font-label text-xs uppercase tracking-widest text-primary font-bold mb-2">Message *</label>
                  <textarea
                    rows="4"
                    value={form.message}
                    onChange={set('message')}
                    required
                    className="w-full bg-white border border-outline-variant/30 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:border-secondary-container transition-all"
                  />
                </div>

                {status === 'error' && (
                  <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-700">
                    {errMsg}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full bg-primary text-white font-label font-bold uppercase tracking-widest py-4 rounded-lg hover:bg-primary-container transition-all mt-4 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {status === 'loading' ? (
                    <>
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                      </svg>
                      Sending…
                    </>
                  ) : 'Submit Inquiry'}
                </button>
              </form>
            )}
          </ScrollSlideIn>
        </div>
      </section>
    </div>
  );
}
