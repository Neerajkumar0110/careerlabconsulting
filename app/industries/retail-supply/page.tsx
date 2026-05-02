'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Globe, ShieldCheck, Factory, Link,
  Zap, FileText, ArrowRight, Anchor, Activity,
  X, Loader2, Mail, Users, ChevronRight,
} from 'lucide-react';
import Navbar from '@/components/freelancex/layout/HomeNavbar';
import Footer from '@/components/freelancex/landing/Footer';
import { usePageContent } from '@/hooks/usePageContent';

function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

interface FeatureCard { title: string; desc: string; icon: string }
interface FeaturePill { label: string; icon: string }
interface TerminalRow { label: string; value: string; color?: string; style?: 'normal' | 'bar' }

const ICON_MAP: Record<string, React.ElementType> = {
  Globe, ShieldCheck, Factory, Link, Zap, FileText, Anchor, Activity,
};

const DEFAULT_FEATURES = JSON.stringify([
  { title: 'Autonomous Sourcing',  desc: 'AI agents that vet suppliers, analyze ESG ratings, and negotiate contracts based on real-time commodity pricing.',                    icon: 'Factory' },
  { title: 'Tier-N Visibility',   desc: 'Mapping your entire supply network beyond Tier-1 to identify hidden bottlenecks and ethical risks deep in the chain.',               icon: 'Globe'   },
  { title: 'Route Optimization',  desc: 'Predictive logistics models that re-route shipments in real-time based on port congestion, weather, and fuel costs.',                icon: 'Anchor'  },
], null, 2);
const DEFAULT_PILLS = JSON.stringify([
  { label: 'ESG Verification',       icon: 'ShieldCheck' },
  { label: 'Smart Contract Audits',  icon: 'FileText'    },
], null, 2);
const DEFAULT_TERMINAL = JSON.stringify([
  { label: 'Geopolitical Instability Index', value: 'Moderate_Risk [3.4]', color: '#f59e0b' },
  { label: 'CO2 Footprint',                  value: '-14% YoY',             color: '#10b981' },
  { label: 'Lead Time Deviation',            value: '±1.2 Days'                             },
], null, 2);

export default function RetailSupplyPage() {
  const [isModalOpen, setIsModalOpen]   = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData]         = useState({ name: '', email: '' });

  const { get } = usePageContent('industry-retail-supply');

  const accentFrom      = get('hero', 'accent_from',     '#3b82f6');
  const accentTo        = get('hero', 'accent_to',       '#0ea5e9');
  const badgeText       = get('hero', 'badge_text',      'Global Sourcing & Supply Resilience');
  const heroPl          = get('hero', 'headline_plain',  'RESILIENT');
  const heroAcc         = get('hero', 'headline_accent', 'NETWORKS');
  const heroBody        = get('hero', 'body_text',       'AI-driven visibility from raw material to storefront. We build autonomous sourcing engines that mitigate geopolitical risk, optimize shipping lanes, and ensure ethical compliance.');
  const heroBtnLabel    = get('hero', 'btn_label',       'Audit My Supply Chain');

  const featuresPl      = get('features', 'headline_plain',  'Supply');
  const featuresAcc     = get('features', 'headline_accent', 'Intelligence');
  const featuresItems   = safeParse<FeatureCard[]>(get('features', 'items_json', DEFAULT_FEATURES), []);

  const deepPl          = get('deep_section', 'headline_plain',  'Total Chain');
  const deepAcc         = get('deep_section', 'headline_accent', 'Intelligence');
  const deepBody        = get('deep_section', 'body_text',       'Modern retail isn\'t just about selling; it\'s about securing. We deploy Digital Twins of your supply chain to simulate shocks—from strikes to natural disasters—ensuring you are always two steps ahead of disruption.');
  const deepPills       = safeParse<FeaturePill[]>(get('deep_section', 'pills_json', DEFAULT_PILLS), []);
  const terminalLabel   = get('deep_section', 'terminal_label',  'Global_Risk_Monitor');
  const terminalItems   = safeParse<TerminalRow[]>(get('deep_section', 'terminal_json', DEFAULT_TERMINAL), []);
  const terminalOutput  = get('deep_section', 'terminal_output', '"Raw material cost increase detected in Sector_7. Executing automated RFP for alternative suppliers in Brazil and Vietnam."');

  const ctaHeadline     = get('cta', 'headline',       'Future-Proof Your Supply');
  const ctaBody         = get('cta', 'body_text',      'Our supply chain architects at DLF Cyber City are ready to build the most resilient sourcing infrastructure in the industry.');
  const ctaBtnLabel     = get('cta', 'btn_label',      'START NETWORK BUILD');
  const ctaLocation     = get('cta', 'location_label', 'Global Ops: Gurugram, India');

  const modalBadge      = get('contact_modal', 'badge_label',     'Supply Chain Audit Request');
  const modalBtnLabel   = get('contact_modal', 'btn_label',       'Request Audit');
  const modalWaNumber   = get('contact_modal', 'whatsapp_number', '918700236923');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const msg = `*🚚 Supply Chain Inquiry*%0A*Name:* ${formData.name}%0A*Email:* ${formData.email}`;
    setTimeout(() => {
      window.open(`https://wa.me/${modalWaNumber}?text=${msg}`, '_blank');
      setIsSubmitting(false);
      setIsModalOpen(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white overflow-x-hidden font-sans">
      <Navbar />
      <main className="pt-24 lg:pt-32 pb-24">

        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <section className="relative pt-12 pb-20 px-6">
          <div className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full blur-[120px] -z-10" style={{ background: `${accentFrom}10` }} />
          <div className="max-w-7xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-8"
              style={{ background: `${accentFrom}1a`, borderColor: `${accentFrom}33` }}>
              <Link size={14} style={{ color: accentFrom }} />
              <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: accentFrom }}>{badgeText}</span>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="text-5xl md:text-8xl font-black tracking-tighter leading-tight uppercase mb-8">
              {heroPl} <br />
              <span className="italic" style={{
                backgroundImage: `linear-gradient(to right, #bfdbfe, ${accentFrom}, #1d4ed8)`,
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>{heroAcc}</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
              className="max-w-3xl mx-auto text-slate-400 text-lg md:text-xl leading-relaxed mb-10">
              {heroBody}
            </motion.p>
            <button onClick={() => setIsModalOpen(true)}
              className="px-10 py-5 font-bold rounded-2xl flex items-center gap-2 mx-auto transition-all hover:scale-105 shadow-xl text-white"
              style={{ background: accentFrom, boxShadow: `0 20px 40px ${accentFrom}30` }}>
              {heroBtnLabel} <ArrowRight size={18} />
            </button>
          </div>
        </section>

        {/* ── FEATURES ─────────────────────────────────────────────────────── */}
        <section className="py-24 px-6" style={{ background: 'rgba(255,255,255,0.005)' }}>
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter">
                {featuresPl} <span className="italic" style={{ color: accentFrom }}>{featuresAcc}</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuresItems.map((item, i) => {
                const Icon = ICON_MAP[item.icon] ?? Globe;
                return (
                  <motion.div key={i} whileHover={{ y: -8 }}
                    className="group p-10 rounded-[2.5rem] border transition-all"
                    style={{ background: `${accentFrom}08`, borderColor: 'rgba(255,255,255,0.05)' }}
                    onMouseEnter={e => (e.currentTarget.style.borderColor = `${accentFrom}40`)}
                    onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)')}>
                    <div className="mb-6 p-4 rounded-2xl inline-block group-hover:scale-110 transition-all"
                      style={{ background: `${accentFrom}1a` }}>
                      <Icon size={28} style={{ color: accentFrom }} />
                    </div>
                    <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                    <p className="text-slate-500 leading-relaxed text-sm">{item.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── DEEP SECTION ─────────────────────────────────────────────────── */}
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            {/* Terminal */}
            <div className="relative">
              <div className="absolute -inset-8 rounded-full blur-[80px] pointer-events-none" style={{ background: `${accentFrom}08` }} />
              <div className="relative border rounded-[3rem] p-10 shadow-2xl overflow-hidden font-mono"
                style={{ background: '#020410', borderColor: `${accentFrom}20` }}>
                <div className="flex justify-between items-center mb-8 pb-5 border-b border-white/5">
                  <div className="flex items-center gap-2">
                    <Activity size={14} style={{ color: accentFrom }} />
                    <span className="text-[9px] text-slate-500 uppercase tracking-widest">{terminalLabel}</span>
                  </div>
                  <div className="flex gap-1">
                    {[0, 75, 150].map(d => (
                      <div key={d} className="w-1 h-1 rounded-full animate-pulse" style={{ background: accentFrom, animationDelay: `${d}ms` }} />
                    ))}
                  </div>
                </div>
                <div className="space-y-4 mb-6">
                  {terminalItems.map((row, i) => (
                    <div key={i} className="p-4 rounded-xl border border-white/5" style={{ background: 'rgba(255,255,255,0.03)' }}>
                      <p className="text-[9px] text-slate-500 uppercase mb-1">{row.label}</p>
                      <p className="text-lg font-bold italic" style={{ color: row.color || '#fff' }}>{row.value}</p>
                    </div>
                  ))}
                </div>
                <div className="p-4 rounded-xl border border-dashed text-[10px]"
                  style={{ background: `${accentFrom}0a`, borderColor: `${accentFrom}30`, color: '#93c5fd' }}>
                  <p className="font-bold mb-1 uppercase tracking-widest text-[9px] text-slate-500">Sourcing Engine:</p>
                  <p className="italic leading-relaxed">{terminalOutput}</p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-4xl md:text-6xl font-black mb-8 italic tracking-tighter uppercase leading-tight">
                {deepPl}<br /><span style={{ color: accentFrom }}>{deepAcc}</span>
              </h2>
              <p className="text-slate-400 text-lg mb-8 leading-relaxed">{deepBody}</p>
              <div className="grid grid-cols-2 gap-4">
                {deepPills.map((pill, i) => {
                  const Icon = ICON_MAP[pill.icon] ?? ShieldCheck;
                  return (
                    <div key={i} className="flex items-center gap-4 p-5 rounded-2xl border border-white/5 transition-all"
                      style={{ background: 'rgba(255,255,255,0.03)' }}
                      onMouseEnter={e => (e.currentTarget.style.background = `${accentFrom}12`)}
                      onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.03)')}>
                      <Icon size={20} style={{ color: accentFrom }} />
                      <span className="text-xs font-bold uppercase tracking-widest">{pill.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────────────────── */}
        <section className="py-32 px-6">
          <div className="max-w-6xl mx-auto border rounded-[4rem] p-12 md:p-24 text-center backdrop-blur-3xl relative overflow-hidden"
            style={{ background: `linear-gradient(to bottom right, ${accentFrom}28, rgba(15,23,42,0.4))`, borderColor: `${accentFrom}30` }}>
            <div className="relative z-10">
              <h2 className="text-4xl md:text-7xl font-black mb-8 italic tracking-tighter uppercase leading-tight">{ctaHeadline}</h2>
              <p className="text-slate-300/70 text-lg md:text-xl mb-12 max-w-2xl mx-auto">{ctaBody}</p>
              <button onClick={() => setIsModalOpen(true)}
                className="px-16 py-6 bg-white text-black rounded-full font-black text-xl hover:scale-105 transition-all shadow-2xl uppercase">
                {ctaBtnLabel}
              </button>
              <p className="mt-6 font-mono text-sm tracking-widest uppercase" style={{ color: accentFrom }}>{ctaLocation}</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-black/95 backdrop-blur-md" />
            <motion.div initial={{ scale: 0.9, opacity: 0, y: 30 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 30 }}
              className="relative bg-[#0a0f1d] border border-white/10 p-8 md:p-12 rounded-[2.5rem] max-w-lg w-full shadow-2xl">
              <button onClick={() => setIsModalOpen(false)} className="absolute top-8 right-8 text-slate-500 hover:text-white"><X size={22} /></button>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] mb-2" style={{ color: accentFrom }}>{modalBadge}</p>
              <h3 className="text-2xl font-black tracking-tight uppercase mb-8">Resilience Starts Here</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={15} />
                  <input required type="text" placeholder="Full Name"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 pl-11 text-sm text-white outline-none transition-all placeholder:text-slate-700"
                    onFocus={e => (e.currentTarget.style.borderColor = accentFrom)}
                    onBlur={e => (e.currentTarget.style.borderColor = '')}
                    value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                </div>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={15} />
                  <input required type="email" placeholder="Email Address"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 pl-11 text-sm text-white outline-none transition-all placeholder:text-slate-700"
                    onFocus={e => (e.currentTarget.style.borderColor = accentFrom)}
                    onBlur={e => (e.currentTarget.style.borderColor = '')}
                    value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                </div>
                <button disabled={isSubmitting} type="submit"
                  className="w-full py-5 text-white font-black uppercase tracking-[0.2em] rounded-2xl flex items-center justify-center gap-3 disabled:opacity-50 text-xs transition-all"
                  style={{ background: accentFrom }}>
                  {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : <>{modalBtnLabel} <ChevronRight size={16} /></>}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}