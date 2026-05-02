'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Blocks, Cpu, ShieldAlert, Globe, Zap,
  Layers, ArrowRight, Code2, LineChart,
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
interface TerminalStat { label: string; value: string; color?: string }

const ICON_MAP: Record<string, React.ElementType> = {
  ShieldAlert, Zap, Cpu, Globe, Layers, Code2, LineChart, Blocks,
};

const DEFAULT_FEATURES = JSON.stringify([
  { title: 'AI Security Audits',    desc: 'Automated vulnerability scanning for Solidity and Rust contracts using custom-trained LLMs to detect re-entrancy and logic flaws.', icon: 'ShieldAlert' },
  { title: 'Predictive Liquidity',  desc: 'Neural networks that forecast gas prices and DEX slippage to optimize cross-chain bridging and yield farming.',                      icon: 'Zap'         },
  { title: 'On-Chain Agents',       desc: 'Autonomous wallets powered by AI that execute trades based on sentiment analysis and whale movement tracking.',                      icon: 'Cpu'         },
], null, 2);
const DEFAULT_PILLS = JSON.stringify([
  { label: 'Cross-Chain Ops', icon: 'Globe'  },
  { label: 'ZK-Proof ML',    icon: 'Layers' },
], null, 2);
const DEFAULT_TERMINAL_STATS = JSON.stringify([
  { label: 'Risk Score',      value: '0.02%',    color: '#10b981'  },
  { label: 'MEV Protection',  value: 'SHIELDED', color: '#3b82f6'  },
], null, 2);

export default function BlockchainPage() {
  const [isModalOpen, setIsModalOpen]   = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData]         = useState({ name: '', email: '' });

  const { get } = usePageContent('industry-blockchain');

  const accentFrom     = get('hero', 'accent_from',     '#a855f7');
  const accentTo       = get('hero', 'accent_to',       '#06b6d4');
  const badgeText      = get('hero', 'badge_text',      'Web3 & Decentralized Intelligence');
  const heroPl         = get('hero', 'headline_plain',  'NEURAL');
  const heroAcc        = get('hero', 'headline_accent', 'PROTOCOLS');
  const heroBody       = get('hero', 'body_text',       'The future of the ledger is intelligent. We build AI agents that secure smart contracts, optimize multi-chain liquidity, and provide on-chain signal analysis for the next generation of DeFi.');
  const heroBtnLabel   = get('hero', 'btn_label',       'Launch Agentic Protocol');

  const featuresPl     = get('features', 'headline_plain',  'Core');
  const featuresAcc    = get('features', 'headline_accent', 'Protocols');
  const featuresItems  = safeParse<FeatureCard[]>(get('features', 'items_json', DEFAULT_FEATURES), []);

  const deepPl         = get('deep_section', 'headline_plain',  'Decentralized');
  const deepAcc        = get('deep_section', 'headline_accent', 'Reasoning');
  const deepBody       = get('deep_section', 'body_text',       'We bridge the gap between high-performance AI and decentralized ledgers. Our team develops ZK-ML (Zero-Knowledge Machine Learning) architectures and AI-driven governance models (DAOs) that make the "Black Box" of AI verifiable on-chain.');
  const deepPills      = safeParse<FeaturePill[]>(get('deep_section', 'pills_json', DEFAULT_PILLS), []);
  const terminalContract = get('deep_section', 'terminal_contract', '0x71C...a29');
  const terminalStats  = safeParse<TerminalStat[]>(get('deep_section', 'terminal_stats_json', DEFAULT_TERMINAL_STATS), []);
  const terminalOutput = get('deep_section', 'terminal_output', 'AI_DEBUGGER: "Found gas-optimization path. Reducing execution cost by 14.2 gwei."');

  const ctaHeadline    = get('cta', 'headline',       'Tokenize Intelligence');
  const ctaBody        = get('cta', 'body_text',      'Our Web3 engineers at DLF Cyber City are building the agents that will manage the future of the internet.');
  const ctaBtnLabel    = get('cta', 'btn_label',      'SYNC WALLET & BUILD');
  const ctaLocation    = get('cta', 'location_label', 'Node Hub: Gurugram, India');

  const modalBadge     = get('contact_modal', 'badge_label',     'Web3 Partnership Request');
  const modalBtnLabel  = get('contact_modal', 'btn_label',       'Send Proposal');
  const modalWaNumber  = get('contact_modal', 'whatsapp_number', '918700236923');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const msg = `*🔗 Blockchain Inquiry*%0A*Name:* ${formData.name}%0A*Email:* ${formData.email}`;
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
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[120px] -z-10" style={{ background: `${accentFrom}12` }} />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-[100px] -z-10" style={{ background: `${accentTo}08` }} />
          <div className="max-w-7xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-8"
              style={{ background: `${accentFrom}1a`, borderColor: `${accentFrom}33` }}>
              <Blocks size={14} style={{ color: accentFrom }} />
              <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: accentFrom }}>{badgeText}</span>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="text-5xl md:text-8xl font-black tracking-tighter leading-tight uppercase mb-8">
              {heroPl} <br />
              <span className="italic" style={{
                backgroundImage: `linear-gradient(to right, ${accentFrom}, #3b82f6, ${accentTo})`,
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
                const Icon = ICON_MAP[item.icon] ?? Zap;
                return (
                  <motion.div key={i} whileHover={{ y: -8 }}
                    className="group p-10 rounded-[2.5rem] border transition-all"
                    style={{ background: `${accentFrom}08`, borderColor: 'rgba(255,255,255,0.05)' }}
                    onMouseEnter={e => (e.currentTarget.style.borderColor = `${accentFrom}40`)}
                    onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)')}>
                    <div className="mb-6 p-4 rounded-2xl inline-block transition-all group-hover:scale-110"
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
              <div className="absolute -inset-8 rounded-full blur-[80px] pointer-events-none" style={{ background: `${accentFrom}12` }} />
              <div className="relative border rounded-[3rem] p-8 shadow-2xl font-mono"
                style={{ background: '#05010a', borderColor: `${accentFrom}30` }}>
                <div className="flex items-center gap-2 mb-6 border-b border-white/5 pb-4">
                  <div className="w-2 h-2 rounded-full animate-ping" style={{ background: accentFrom }} />
                  <span className="text-[9px] uppercase tracking-widest" style={{ color: accentFrom }}>MEMPOOL_MONITOR_ACTIVE</span>
                </div>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>Contract: {terminalContract}</span>
                    <span className="text-emerald-400">SECURE</span>
                  </div>
                  <div className="h-1 bg-white/5 rounded-full">
                    <div className="h-full rounded-full animate-pulse w-3/4" style={{ background: accentFrom }} />
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    {terminalStats.map((stat, i) => (
                      <div key={i} className="p-3 rounded-lg border border-white/5" style={{ background: 'rgba(255,255,255,0.03)' }}>
                        <p className="text-[9px] text-slate-500 uppercase mb-1">{stat.label}</p>
                        <p className="text-lg font-bold" style={{ color: stat.color || '#fff' }}>{stat.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-4 rounded-xl border border-dashed" style={{ background: `${accentFrom}08`, borderColor: `${accentFrom}30` }}>
                  <p className="text-[10px] italic leading-relaxed" style={{ color: `${accentFrom}cc` }}>{terminalOutput}</p>
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
                  const Icon = ICON_MAP[pill.icon] ?? Globe;
                  return (
                    <div key={i} className="flex items-center gap-4 p-5 rounded-2xl border border-white/5 transition-all cursor-default"
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
            style={{ background: `linear-gradient(to bottom right, ${accentFrom}30, #000)`, borderColor: `${accentFrom}30` }}>
            <div className="relative z-10">
              <h2 className="text-4xl md:text-7xl font-black mb-8 italic tracking-tighter uppercase leading-tight">{ctaHeadline}</h2>
              <p className="text-lg md:text-xl mb-12 max-w-2xl mx-auto" style={{ color: `${accentFrom}90` }}>{ctaBody}</p>
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
              <h3 className="text-2xl font-black tracking-tight uppercase mb-8">Build On-Chain With Us</h3>
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