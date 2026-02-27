"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/product/Navbar';
import Footer from '@/components/product/Footer';

import {
  Mail, Phone, MapPin, Send, ShieldCheck, Cpu,
  Clock, Globe2, Sparkles, CheckCircle2,
  Home,
  ChevronRight,
} from 'lucide-react';

const PRODUCTS = [
  'Manee – AI Communication Officer',
  'CRM-X – Autonomous Growth Engine',
  'LMS-X – Immersive AI Learning Platform',
  'EduX – AI Infrastructure for Institutions',
  'TwinX – Intelligent Executive AI Assistant',
  'LegalOS – Autonomous Legal Intelligence',
  'ErpX – AI Finance Command Center',
  'HrX – AI Recruitment & Interview Engine',
  'SuppX – Autonomous Support Intelligence',
];

const INDUSTRIES = [
  'Technology & SaaS', 'Financial Services', 'Healthcare & Life Sciences',
  'Education & EdTech', 'Legal & Compliance', 'Retail & E-commerce',
  'Manufacturing', 'Government & Public Sector', 'Other',
];

const CONTACT_INFO = [
  {
    icon: <Phone size={16} />,
    label: 'Sales & Enterprise',
    value: '+91 870023 6923',
    sub: 'Mon–Sat, 9AM–7PM IST',
  },
  {
    icon: <Mail size={16} />,
    label: 'Email',
    value: 'info@careerlabconsulting.com',
    sub: 'Typical reply within 12 minutes',
  },
  {
    icon: <MapPin size={16} />,
    label: 'Headquarters',
    value: 'India',
    sub: 'Global Deployment Available',
  },
];

const STATS = [
  { value: '500+', label: 'Businesses Onboarded' },
  { value: '3–14', label: 'Days to Deploy' },
  { value: '24/7', label: 'Enterprise Support' },
];

const DotGrid = () => (
  <div
    className="pointer-events-none absolute inset-0"
    style={{
      backgroundImage: 'radial-gradient(circle, rgba(99,102,241,0.15) 1px, transparent 1px)',
      backgroundSize: '32px 32px',
    }}
  />
);

const GlowBlob = ({ className }: { className?: string }) => (
  <div className={`pointer-events-none absolute rounded-full blur-[120px] opacity-20 ${className}`} />
);

const MultiSelect = ({ options, selected, onChange }: {
  options: string[];
  selected: string[];
  onChange: (val: string[]) => void;
}) => {
  const toggle = (opt: string) => {
    onChange(selected.includes(opt) ? selected.filter(o => o !== opt) : [...selected, opt]);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-52 overflow-y-auto pr-1 custom-scroll">
      {options.map((opt, i) => {
        const active = selected.includes(opt);
        return (
          <button
            key={i}
            type="button"
            onClick={() => toggle(opt)}
            className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg border text-xs font-semibold text-left transition-all duration-200 ${
              active
                ? 'bg-indigo-500/15 border-indigo-500/50 text-indigo-300'
                : 'bg-white/[0.03] border-white/[0.07] text-slate-400 hover:border-white/20 hover:text-slate-300'
            }`}
          >
            <div className={`shrink-0 w-4 h-4 rounded border flex items-center justify-center transition-colors ${
              active ? 'bg-indigo-500 border-indigo-500' : 'border-white/20'
            }`}>
              {active && <CheckCircle2 size={10} className="text-white" />}
            </div>
            <span className="leading-snug">{opt}</span>
          </button>
        );
      })}
    </div>
  );
};

const Breadcrumb = () => (
  <nav className="relative z-20 flex items-center justify-center pt-3 sm:pt-0 px-4 pb-8 pointer-events-auto">
    <ol className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/5 bg-white/[0.02] backdrop-blur-md">
      <li className="flex items-center">
        <Link href="/" className="text-slate-400 hover:text-indigo-400 transition-colors">
          <Home size={14} />
        </Link>
      </li>
      <li className="flex items-center text-slate-700">
        <ChevronRight size={12} />
      </li>
      <li className="flex items-center">
        <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-white-400/80 cursor-default">
          Contact-Us
        </span>
      </li>
    </ol>
  </nav>
);

const fieldCls =
  'w-full bg-[#0f1729] border border-white/[0.09] hover:border-indigo-500/40 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200 font-normal';

const labelCls = 'block text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400 mb-2 ml-0.5';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '', company: '', email: '', phone: '',
    industry: '', employees: '', products: [] as string[], message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = (key: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setFormData(prev => ({ ...prev, [key]: e.target.value }));


  const validate = () => {
  const newErrors: Record<string, string> = {};

  if (!formData.name.trim() || formData.name.trim().length < 2) {
    newErrors.name = "Full name must be at least 2 characters.";
  }

  if (!formData.company.trim()) {
    newErrors.company = "Company name is required.";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.email)) {
    newErrors.email = "Enter a valid email address.";
  }

  if (!formData.industry) {
    newErrors.industry = "Please select your industry.";
  }

  if (formData.products.length === 0) {
    newErrors.products = "Select at least one product.";
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setLoading(true);
      const res = await fetch(
        `https://clc-products-backend.vercel.app/api/contact`,
        {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        setSubmitted(true);
        setFormData({
          name: '',
          company: '',
          email: '',
          phone: '',
          industry: '',
          employees: '',
          products: [],
          message: '',
        });
        setErrors({});
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#060c1a] text-slate-100 overflow-x-hidden font-sans antialiased">
      <Navbar />

      <section className="relative pt-24 pb-16 px-4 sm:pt-32 sm:pb-20 text-center overflow-hidden">
        <DotGrid />
        
        <Breadcrumb />
        
        <GlowBlob className="w-[600px] h-[400px] bg-indigo-600 -top-32 left-1/2 -translate-x-1/2" />

        <div className="relative z-10 max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-[10px] font-bold uppercase tracking-[0.22em]">
            <Sparkles size={11} />
            Global Deployment Available
          </span>

          <h1 className="mt-7 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] text-white">
            Build Your{' '}
            <span className="relative inline-block">
              <span className="relative z-10 text-transparent italic bg-clip-text bg-gradient-to-r from-indigo-400 via-blue-400 to-cyan-400">
                AI Workforce
              </span>
              
            </span>
          </h1>

          <p className="mt-5 text-slate-400 text-base sm:text-lg max-w-xl mx-auto leading-relaxed font-light">
            Deploy autonomous AI infrastructure tailored to your organization — from first contact to full production in days.
          </p>

          <div className="mt-10 inline-flex flex-wrap justify-center gap-6 sm:gap-10">
            {STATS.map((s, i) => (
              <div key={i} className="text-center">
                <p className="text-2xl sm:text-3xl font-black text-white tracking-tight">{s.value}</p>
                <p className="text-[10px] sm:text-xs text-slate-500 font-semibold uppercase tracking-widest mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-28 sm:pb-36 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

          <aside className="lg:col-span-4 flex flex-col gap-4">

            <div className="rounded-2xl border border-white/[0.07] bg-[#0b1122] p-6 sm:p-8">
              <p className="text-[9px] font-black uppercase tracking-[0.3em] text-indigo-400 mb-6">Direct Channels</p>
              <div className="space-y-6">
                {CONTACT_INFO.map((c, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="shrink-0 w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                      {c.icon}
                    </div>
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-widest text-slate-500 mb-0.5">{c.label}</p>
                      <p className="text-sm font-semibold text-slate-100 leading-tight">{c.value}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{c.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.07] p-5 flex items-start gap-3">
              <div className="shrink-0 mt-0.5 relative">
                <Clock size={15} className="text-emerald-400" />
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 animate-ping opacity-75" />
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-300 mb-1">Engineers Online</p>
                <p className="text-xs text-slate-400 leading-relaxed">Typically respond within <span className="text-emerald-300 font-semibold">12 minutes</span> during business hours.</p>
              </div>
            </div>

            <div className="rounded-2xl border border-white/[0.07] bg-[#0b1122] p-5">
              <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-slate-500 mb-4">Enterprise Grade</p>
              <div className="flex items-center gap-4">
                {[
                  { icon: <ShieldCheck size={16} />, label: 'SOC 2' },
                  { icon: <Cpu size={16} />, label: 'AI Native' },
                  { icon: <Globe2 size={16} />, label: 'Global CDN' },
                ].map((b, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-slate-400">
                    {b.icon}
                    <span className="text-xs font-semibold">{b.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          <div className="lg:col-span-8">
            <div className="relative rounded-2xl border border-white/[0.07] bg-[#0b1122] p-6 sm:p-10 overflow-hidden">
              <GlowBlob className="w-64 h-64 bg-indigo-600 -top-20 -right-20 opacity-[0.12]" />

              <div className="relative z-10 mb-8">
                <span className="inline-flex items-center gap-1.5 text-[9px] font-black uppercase tracking-[0.25em] text-indigo-400 border border-indigo-500/25 bg-indigo-500/10 px-3 py-1.5 rounded-full">
                  <Sparkles size={9} />
                  Step 1 — Configuration
                </span>
                <h2 className="mt-4 text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white leading-tight">
                  Request an AI{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
                    Deployment Plan
                  </span>
                </h2>
                <p className="mt-2 text-sm text-slate-400">Fill in the details below — our team will craft a tailored plan within 24 hours.</p>
              </div>

              <form onSubmit={handleSubmit} className="relative z-10 space-y-5">

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <div>
                    <label className={labelCls}>Full Name</label>{errors.name && (
                      <p className="mt-1 text-xs text-red-400">{errors.name}</p>
                    )}
                    <input required type="text" value={formData.name} onChange={set('name')} placeholder="John Doe" className={fieldCls} />
                  </div>
                  <div>
                    <label className={labelCls}>Company</label>{errors.company && (
                      <p className="mt-1 text-xs text-red-400">{errors.company}</p>
                    )}
                    <input required type="text" value={formData.company} onChange={set('company')} placeholder="Acme Inc." className={fieldCls} />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <div>
                    <label className={labelCls}>Email Address</label>{errors.email && (
                      <p className="mt-1 text-xs text-red-400">{errors.email}</p>
                    )}
                    <input required type="email" value={formData.email} onChange={set('email')} placeholder="john@company.com" className={fieldCls} />
                  </div>
                  <div>
                    <label className={labelCls}>Phone (Optional)</label>
                    <input type="tel" value={formData.phone} onChange={set('phone')} placeholder="+91 98765 43210" className={fieldCls} />
                  </div>
                </div>

                <div>
                  <label className={labelCls}>Industry</label>{errors.industry && (
                    <p className="mt-1 text-xs text-red-400">{errors.industry}</p>
                  )}
                  <div className="relative">
                    <select value={formData.industry} onChange={set('industry')} className={`${fieldCls} appearance-none pr-10 cursor-pointer`}>
                      <option value="">Select your industry…</option>
                      {INDUSTRIES.map(ind => <option key={ind} value={ind}>{ind}</option>)}
                    </select>
                    <div className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M2 5l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className={labelCls}>Products Interested In</label>{errors.products && (
                    <p className="mt-2 text-xs text-red-400">{errors.products}</p>
                  )}
                  <div className="bg-[#0f1729] border border-white/[0.09] rounded-xl p-4">
                    <MultiSelect
                      options={PRODUCTS}
                      selected={formData.products}
                      onChange={(v: string[]) => setFormData(p => ({ ...p, products: v }))}
                    />
                  </div>
                  {formData.products.length > 0 && (
                    <p className="mt-1.5 ml-0.5 text-[10px] text-indigo-400 font-semibold">
                      {formData.products.length} product{formData.products.length > 1 ? 's' : ''} selected
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label className={labelCls}>Additional Requirements</label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={set('message')}
                    placeholder="Describe your goals, current stack, or any specific requirements…"
                    className={`${fieldCls} resize-none leading-relaxed`}
                  />
                </div>

                {/* CTA */}
                <button
                  type="submit"
                  disabled={loading}
                  className={`relative w-full group flex items-center justify-center gap-3 py-4 sm:py-4.5 rounded-xl font-bold text-sm tracking-wide transition-all duration-200 overflow-hidden
                    ${loading
                      ? 'bg-indigo-400 cursor-not-allowed'
                      : 'bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 shadow-lg shadow-indigo-900/50 hover:shadow-indigo-700/40 hover:-translate-y-0.5'
                    }`}
                >
                  <span className="relative z-10">
                    {loading
                      ? 'Processing...'
                      : submitted
                      ? '✓ Message Sent!'
                      : 'Initialize Deployment Plan'}
                  </span>

                  {!loading && !submitted && (
                    <Send size={15} className="relative z-10 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  )}
                </button>

                <p className="text-center text-[11px] text-slate-600">
                  By submitting you agree to our Privacy Policy. No spam, ever.
                </p>
              </form>
            </div>
          </div>

        </div>
      </section>

      <Footer />

      {/* Scrollbar styling */}
      <style jsx global>{`
        .custom-scroll::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scroll::-webkit-scrollbar-thumb {
          background: rgba(99,102,241,0.3);
          border-radius: 99px;
        }
        .custom-scroll::-webkit-scrollbar-thumb:hover {
          background: rgba(99,102,241,0.5);
        }
      `}</style>
    </main>
  );
};

export default ContactPage;