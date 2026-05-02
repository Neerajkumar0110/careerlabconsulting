// app/freelancex/partner-program/page.tsx

'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Handshake, Rocket, DollarSign,
  ShieldCheck, ArrowRight, CheckCircle2,
  ChevronRight, X, Loader2, Building,
  Mail, Phone, Briefcase, Network, Layers,
  Globe, Zap,
} from 'lucide-react';

import Navbar from '@/components/freelancex/layout/HomeNavbar';
import Footer from '@/components/freelancex/landing/Footer';
import { usePageContent } from '@/hooks/usePageContent';

// ── Icon maps ─────────────────────────────────────────────────────────────────
const METRIC_ICON_MAP: Record<string, React.ElementType> = { DollarSign, Building, Globe, ShieldCheck, Network, Layers, Zap };
const MODEL_ICON_MAP:  Record<string, React.ElementType> = { Building, Network, Layers, ShieldCheck, Globe };

// ── Types ─────────────────────────────────────────────────────────────────────
interface TrustMetric  { label: string; value: string; icon: string; color: string }
interface PartnerModel { title: string; desc: string; icon: string; color: string; bg: string; border: string }
interface Benefit      { title: string; desc: string }

function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

// ── Defaults ──────────────────────────────────────────────────────────────────
const DEFAULT_METRICS = JSON.stringify([
  { label: 'Partner Payouts (YTD)', value: '$12.4M', icon: 'DollarSign', color: 'text-emerald-400' },
  { label: 'Active Syndicates',     value: '342',     icon: 'Building',   color: 'text-blue-400'    },
  { label: 'Global Reach',          value: '48 Hubs', icon: 'Globe',      color: 'text-indigo-400'  },
  { label: 'Escrow Dispute Rate',   value: '< 0.01%', icon: 'ShieldCheck',color: 'text-purple-400'  },
]);
const DEFAULT_MODELS = JSON.stringify([
  { title: 'Agency Syndicate',       desc: 'For dev shops and design agencies. Overflow your excess high-ticket client projects to our autonomous AI network and earn a flat 15% margin.',             icon: 'Building', color: 'text-blue-400',    bg: 'bg-blue-500/10',    border: 'border-blue-500/20'    },
  { title: 'Ecosystem Ambassador',   desc: 'For influencers, recruiters, and community leaders. Onboard elite talent or enterprise clients and receive lifetime recurring revenue share.',               icon: 'Network',  color: 'text-purple-400',  bg: 'bg-purple-500/10',  border: 'border-purple-500/20'  },
  { title: 'Technology Integration', desc: 'For SaaS founders and tooling platforms. Integrate your API directly into the Manee AI workflow and co-market to our top 1% global node network.',        icon: 'Layers',   color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
]);
const DEFAULT_BENEFITS = JSON.stringify([
  { title: 'Uncapped Revenue Share',    desc: 'Earn up to 15% recurring commission on every successful sprint deployed through your alliance link.'         },
  { title: 'Co-Branded Deployments',    desc: 'White-label our AI vetting and deployment engine to serve your own enterprise clients seamlessly.'            },
  { title: 'Priority Protocol Support', desc: 'Get direct 24/7 access to a dedicated Principal Partner Manager for instant issue resolution.'               },
  { title: 'Exclusive Alpha Access',    desc: 'Partners get first-look access to our internal AI tools, unreleased features, and global networking events.' },
]);

// Tailwind color class → hex
const COLOR_HEX: Record<string, string> = {
  'text-emerald-400': '#34d399', 'text-blue-400': '#60a5fa',
  'text-indigo-400':  '#818cf8', 'text-purple-400': '#c084fc',
};

export default function PartnerProgramPage() {
  const [isModalOpen,  setIsModalOpen]  = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', company: '', partnerType: 'Agency Syndicate' });

  const { get } = usePageContent('freelancex-partner-program');

  // ── Hero ──────────────────────────────────────────────────────────────────
  const badgeText      = get('hero', 'badge_text',      'Syndicate Alliance');
  const headlinePlain  = get('hero', 'headline_plain',  'Scale Through');
  const headlineAccent = get('hero', 'headline_accent', 'Collaboration.');
  const heroBody       = get('hero', 'body_text',       'Join the elite ecosystem of agencies, tooling founders, and community leaders. Co-build the future of autonomous work and unlock uncapped recurring revenue.');
  const heroBtnLabel   = get('hero', 'btn_label',       'Apply for Alliance');
  const accentFrom     = get('hero', 'accent_from',     '#60a5fa');
  const accentMid      = get('hero', 'accent_mid',      '#818cf8');
  const accentTo       = get('hero', 'accent_to',       '#c084fc');

  // ── Trust Metrics ─────────────────────────────────────────────────────────
  const trustMetrics = safeParse<TrustMetric[]>(get('trust_metrics', 'items_json', DEFAULT_METRICS), []);

  // ── Models ────────────────────────────────────────────────────────────────
  const modelsPlain  = get('models', 'headline_plain',  'Alliance');
  const modelsAccent = get('models', 'headline_accent', 'Protocols.');
  const modelsSub    = get('models', 'subheading',      "Choose the partnership matrix that aligns with your organization's infrastructure.");
  const partnerModels = safeParse<PartnerModel[]>(get('models', 'items_json', DEFAULT_MODELS), []);

  // ── Benefits ──────────────────────────────────────────────────────────────
  const benefitsPlain  = get('benefits', 'headline_plain',  'Syndicate');
  const benefitsAccent = get('benefits', 'headline_accent', 'Advantages.');
  const benefitsSub    = get('benefits', 'subheading',      'We treat our partners as core infrastructure. Your growth scales our ecosystem directly.');
  const benefits       = safeParse<Benefit[]>(get('benefits', 'items_json', DEFAULT_BENEFITS), []);

  // ── CTA ───────────────────────────────────────────────────────────────────
  const ctaPlain      = get('cta', 'headline_plain',  'Initialize Your');
  const ctaAccent     = get('cta', 'headline_accent', 'Partnership Node.');
  const ctaBody       = get('cta', 'body_text',       'The ecosystem is expanding rapidly. Secure your position as an early syndicate partner and start monetizing your network.');
  const ctaBtn        = get('cta', 'btn_label',       'Submit Syndicate Application');
  const ctaImageUrl   = get('cta', 'cta_image_url',   'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1');
  const footerNote1   = get('cta', 'footer_note',     'Verified B2B Alliance Protocol');
  const footerNote2   = get('cta', 'footer_note_2',   'End-to-End Encrypted Data');

  // ── Modal ─────────────────────────────────────────────────────────────────
  const modalBadge      = get('apply_modal', 'badge_label',      'Application Form');
  const modalHeadline   = get('apply_modal', 'headline',         'Join The Alliance');
  const modalSubtext    = get('apply_modal', 'subtext',          "Submit your organization's details to initialize the partnership review protocol.");
  const modalSubmitBtn  = get('apply_modal', 'submit_btn_label', 'Transmit Application');
  const modalFooterNote = get('apply_modal', 'footer_note',      'Partner Team will review within 24 hours');
  const modalWaNumber   = get('apply_modal', 'whatsapp_number',  '918700236923');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await fetch('/api/referral', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, type: 'Partner Program Application' }),
      }).catch(() => {});
      const msg = `*🤝 New Alliance Partner Application*%0A%0A*Name:* ${formData.name}%0A*Company:* ${formData.company}%0A*Email:* ${formData.email}%0A*Phone:* ${formData.phone}%0A*Type:* ${formData.partnerType}`;
      window.open(`https://wa.me/${modalWaNumber}?text=${msg}`, '_blank');
      setIsModalOpen(false);
    } catch {
      alert('Submission failed. Please retry.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col font-sans selection:bg-blue-500/30 overflow-x-hidden">
      <Navbar />

      <main className="flex-grow pt-24 md:pt-32 pb-16 relative">
        <div className="absolute top-0 right-0 w-full md:w-[800px] h-[400px] md:h-[600px] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none -z-0" />
        <div className="absolute top-1/2 left-0 w-full md:w-[600px] h-[400px] md:h-[600px] bg-purple-600/10 blur-[150px] rounded-full pointer-events-none -z-0" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-soft-light pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-20 md:space-y-32">

          {/* ── HERO ─────────────────────────────────────────────────────── */}
          <div className="text-center space-y-6 md:space-y-8 max-w-4xl mx-auto pt-10">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full border backdrop-blur-md"
              style={{ background: `${accentFrom}1a`, borderColor: `${accentFrom}33` }}>
              <Handshake size={14} style={{ color: accentFrom }} />
              <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: accentFrom }}>{badgeText}</span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter leading-[1.05]">
              {headlinePlain} <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text"
                style={{ backgroundImage: `linear-gradient(to right, ${accentFrom}, ${accentMid}, ${accentTo})` }}>
                {headlineAccent}
              </span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="text-slate-400 text-sm md:text-xl font-medium leading-relaxed max-w-3xl mx-auto px-4">
              {heroBody}
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <button onClick={() => setIsModalOpen(true)}
                className="px-8 py-4 md:py-5 bg-white text-black font-black text-[10px] md:text-xs uppercase tracking-[0.2em] rounded-xl md:rounded-2xl hover:scale-105 transition-all flex items-center justify-center gap-3"
                style={{ boxShadow: '0 0 40px rgba(255,255,255,0.15)' }}>
                {heroBtnLabel} <ArrowRight size={16} />
              </button>
            </motion.div>
          </div>

          {/* ── TRUST METRICS ────────────────────────────────────────────── */}
          <div className="bg-[#0a0f1d]/40 border border-white/5 rounded-[2rem] md:rounded-[3rem] p-6 md:p-12 backdrop-blur-xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {trustMetrics.map((metric, i) => {
                const Icon = METRIC_ICON_MAP[metric.icon] ?? Globe;
                const iconColor = COLOR_HEX[metric.color] ?? '#818cf8';
                return (
                  <div key={i} className="text-center space-y-4 p-6 border-b sm:border-b-0 sm:border-r border-white/5 last:border-0">
                    <Icon size={28} style={{ color: iconColor, margin: '0 auto' }} />
                    <h3 className="text-3xl md:text-4xl font-black text-white tracking-tight">{metric.value}</h3>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">{metric.label}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── PARTNER MODELS ───────────────────────────────────────────── */}
          <div className="space-y-10 md:space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-4 px-4">
              <h2 className="text-3xl md:text-5xl font-black tracking-tight">
                {modelsPlain} <span style={{ color: accentFrom }}>{modelsAccent}</span>
              </h2>
              <p className="text-slate-500 font-medium text-sm md:text-lg">{modelsSub}</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6 md:gap-8">
              {partnerModels.map((model, idx) => {
                const Icon = MODEL_ICON_MAP[model.icon] ?? Building;
                const iconColor = COLOR_HEX[model.color] ?? '#818cf8';
                return (
                  <div key={idx} className={`p-8 md:p-10 bg-[#0a0f1d]/60 backdrop-blur-xl border ${model.border} rounded-[2rem] md:rounded-[2.5rem] hover:-translate-y-2 transition-transform duration-300 group shadow-2xl`}>
                    <div className={`w-14 h-14 rounded-2xl ${model.bg} flex items-center justify-center mb-6`}>
                      <Icon className={model.color} size={28} />
                    </div>
                    <h3 className="text-xl md:text-2xl font-black mb-3">{model.title}</h3>
                    <p className="text-slate-400 text-sm md:text-base leading-relaxed font-medium mb-6">{model.desc}</p>
                    <button
                      onClick={() => { setFormData({ ...formData, partnerType: model.title }); setIsModalOpen(true); }}
                      className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2 group-hover:gap-4 transition-all"
                      style={{ color: iconColor }}>
                      Select Protocol <ArrowRight size={14} />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── BENEFITS ─────────────────────────────────────────────────── */}
          <div className="bg-[#0a0f1d]/40 border border-white/5 rounded-[2rem] md:rounded-[3rem] p-6 md:p-16">
            <div className="mb-12 text-center md:text-left">
              <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">
                {benefitsPlain} <span style={{ color: accentMid }}>{benefitsAccent}</span>
              </h2>
              <p className="text-slate-400 font-medium max-w-xl">{benefitsSub}</p>
            </div>
            <div className="grid md:grid-cols-2 gap-4 md:gap-6">
              {benefits.map((benefit, i) => (
                <div key={i} className="bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 rounded-[1.5rem] p-8 transition-colors group">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center border border-emerald-500/20 group-hover:bg-emerald-500 transition-colors"
                      style={{ background: 'rgba(16,185,129,0.1)', color: '#34d399' }}>
                      <CheckCircle2 size={16} />
                    </div>
                    <h4 className="text-lg md:text-xl font-bold text-white">{benefit.title}</h4>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed pl-12">{benefit.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── CTA ──────────────────────────────────────────────────────── */}
          <div className="relative rounded-[2rem] md:rounded-[3.5rem] overflow-hidden border border-white/10 p-8 md:p-20 shadow-3xl text-center"
            style={{ background: 'linear-gradient(to top right, #1e3a8a, #312e81, #020617)' }}>
            <div className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-20"
              style={{ backgroundImage: `url(${ctaImageUrl})` }} />
            <div className="relative z-10 max-w-3xl mx-auto space-y-8">
              <div className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6"
                style={{ background: 'rgba(37,99,235,0.2)', border: '1px solid rgba(59,130,246,0.3)' }}>
                <Rocket size={32} style={{ color: accentFrom }} />
              </div>
              <h2 className="text-3xl md:text-6xl font-black text-white leading-tight tracking-tighter">
                {ctaPlain}<br /><span style={{ color: accentFrom }}>{ctaAccent}</span>
              </h2>
              <p className="font-medium text-base md:text-lg" style={{ color: 'rgba(219,234,254,0.7)' }}>{ctaBody}</p>
              <div className="pt-4">
                <button onClick={() => setIsModalOpen(true)}
                  className="w-full sm:w-auto py-5 px-10 text-white font-black uppercase tracking-[0.2em] rounded-2xl transition-all flex items-center justify-center gap-3 mx-auto text-xs"
                  style={{ background: accentFrom, boxShadow: `0 0 50px ${accentFrom}66` }}>
                  {ctaBtn} <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-center py-6 border-t border-white/5 text-[8px] md:text-[9px] font-black uppercase tracking-[0.3em] text-slate-500">
            <ShieldCheck size={14} className="text-emerald-500" />
            <span>{footerNote1}</span>
            <span className="hidden md:inline text-slate-700">|</span>
            <span>{footerNote2}</span>
          </div>

        </div>
      </main>

      <Footer />

      {/* ── APPLICATION MODAL ────────────────────────────────────────────────── */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center px-4 sm:px-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-black/95 backdrop-blur-md" />
            <motion.div initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative bg-[#0a0f1d] border border-white/10 p-6 md:p-12 rounded-[2rem] md:rounded-[3rem] max-w-2xl w-full shadow-3xl overflow-hidden z-10 max-h-[90vh] overflow-y-auto">
              <div className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none"
                style={{ background: `${accentFrom}1a`, filter: 'blur(80px)' }} />
              <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 p-2 hover:bg-white/5 rounded-full text-slate-500 hover:text-white transition-all">
                <X size={20} />
              </button>
              <div className="mb-8 text-center md:text-left">
                <span className="text-[9px] font-black uppercase tracking-[0.3em] mb-2 block" style={{ color: accentFrom }}>{modalBadge}</span>
                <h3 className="text-2xl md:text-3xl font-black mb-2 tracking-tight leading-tight">{modalHeadline}</h3>
                <p className="text-slate-400 text-xs italic">{modalSubtext}</p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="relative group">
                    <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-blue-500 transition-colors" size={16} />
                    <input required type="text" placeholder="Your Name" value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl md:rounded-2xl py-4 pl-12 pr-6 text-sm outline-none focus:border-blue-500 transition-all text-white placeholder:text-slate-600" />
                  </div>
                  <div className="relative group">
                    <Building className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-blue-500 transition-colors" size={16} />
                    <input required type="text" placeholder="Company / Agency Name" value={formData.company}
                      onChange={e => setFormData({ ...formData, company: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl md:rounded-2xl py-4 pl-12 pr-6 text-sm outline-none focus:border-blue-500 transition-all text-white placeholder:text-slate-600" />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-blue-500 transition-colors" size={16} />
                    <input required type="email" placeholder="Work Email" value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl md:rounded-2xl py-4 pl-12 pr-6 text-sm outline-none focus:border-blue-500 transition-all text-white placeholder:text-slate-600" />
                  </div>
                  <div className="relative group">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-blue-500 transition-colors" size={16} />
                    <input required type="tel" placeholder="WhatsApp / Mobile" value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl md:rounded-2xl py-4 pl-12 pr-6 text-sm outline-none focus:border-blue-500 transition-all text-white placeholder:text-slate-600" />
                  </div>
                </div>
                <div className="relative">
                  <select required value={formData.partnerType}
                    onChange={e => setFormData({ ...formData, partnerType: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl md:rounded-2xl py-4 px-6 text-sm outline-none focus:border-blue-500 transition-all text-slate-300 appearance-none">
                    {partnerModels.map(m => (
                      <option key={m.title} value={m.title} className="bg-[#020617]">{m.title}</option>
                    ))}
                  </select>
                </div>
                <button disabled={isSubmitting} type="submit"
                  className="w-full py-5 text-white font-black uppercase tracking-[0.2em] rounded-xl md:rounded-2xl transition-all flex justify-center items-center gap-3 shadow-xl active:scale-95 disabled:opacity-50"
                  style={{ background: accentFrom }}>
                  {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : <><Zap size={18} /> {modalSubmitBtn}</>}
                </button>
                <p className="text-[8px] md:text-[9px] text-center text-slate-500 uppercase tracking-widest mt-4">{modalFooterNote}</p>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}