// app/services/blockchain-audits/page.tsx
'use client';

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import { usePageContent } from '@/hooks/usePageContent';
import {
  SearchCode, Eye, FileCheck, ShieldCheck,
  ArrowRight, Bug,
} from 'lucide-react';

const ICON_MAP: Record<string, React.ElementType> = { SearchCode, Eye, FileCheck, ShieldCheck };

interface AuditPhase { title: string; desc: string; icon: string }
interface AuditStat  { label: string; val: string; color: string }

function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

const DEFAULT_PHASES: AuditPhase[] = [
  { title: 'Static Analysis',     desc: 'Automated scanning of codebase for known vulnerabilities like reentrancy and integer overflow.',         icon: 'SearchCode'  },
  { title: 'Manual Review',       desc: 'Line-by-line inspection by senior security researchers to detect logical flaws.',                        icon: 'Eye'         },
  { title: 'Formal Verification', desc: 'Mathematical proving of contract behavior against intended specifications.',                             icon: 'FileCheck'   },
  { title: 'Reporting & Fixes',   desc: 'Comprehensive PDF report with severity rankings and re-audit of applied patches.',                      icon: 'ShieldCheck' },
];
const DEFAULT_STATS: AuditStat[] = [
  { label: 'High Severity',     val: '0',  color: 'text-red-500'    },
  { label: 'Medium Severity',   val: '0',  color: 'text-yellow-500' },
  { label: 'Gas Optimizations', val: '14', color: 'text-blue-500'   },
  { label: 'Informational',     val: '3',  color: 'text-slate-500'  },
];

const COLOR_MAP: Record<string, string> = {
  'text-red-500':    '#ef4444',
  'text-yellow-500': '#eab308',
  'text-blue-500':   '#3b82f6',
  'text-slate-500':  '#64748b',
};

export default function BlockchainAuditsPage() {
  const { get } = usePageContent('services-blockchain-audits');

  const badgeText    = get('hero', 'badge_text',      'Audit Protocol Active');
  const heroPl       = get('hero', 'headline_plain',  'Smart Contract');
  const heroAcc      = get('hero', 'headline_accent', 'Security Audit.');
  const heroBody     = get('hero', 'body_text',       'Eliminate critical vulnerabilities before deployment. Our team of security researchers provides deep-layer audits for Solidity, Rust, and Move-based protocols.');
  const heroBtnLbl   = get('hero', 'btn_label',       'Request Quote');
  const accentColor  = get('hero', 'accent_color',    '#3b82f6');
  const accentSec    = get('hero', 'accent_secondary','#10b981');

  const auditStats   = safeParse<AuditStat[]>(get('stats', 'stats_json', '[]'), DEFAULT_STATS);

  const methHeadline = get('methodology', 'headline',  'Rigorous. Deep. Immutable.');
  const methBody     = get('methodology', 'body_text', 'We follow a dual-track auditing process combining automated symbolic execution with manual adversarial testing.');
  const phases       = safeParse<AuditPhase[]>(get('methodology', 'phases_json', '[]'), DEFAULT_PHASES);

  const ctaHeadline  = get('cta', 'headline',     "Don't Get Exploited.");
  const ctaQuote     = get('cta', 'quote_text',   '"A single reentrancy flaw can empty a pool in blocks. Secure your protocol today."');
  const ctaBtnPrim   = get('cta', 'btn_primary',  'Start Secure Audit');
  const ctaBtnSec    = get('cta', 'btn_secondary','View Sample Report');

  return (
    <main className="min-h-screen bg-[#020617] text-slate-100 selection:bg-blue-600/30 font-sans">
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 md:pt-52 md:pb-32 px-6">
        <div className="absolute inset-0 -z-10"
          style={{ background: `radial-gradient(circle at 50% 30%, ${accentColor}1a 0%, transparent 70%)` }} />
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border mb-8"
              style={{ background: `${accentSec}1a`, borderColor: `${accentSec}33` }}>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                  style={{ background: accentSec }} />
                <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: accentSec }} />
              </span>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] italic" style={{ color: accentSec }}>{badgeText}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-[0.85] mb-8">
              {heroPl} <br />
              <span className="italic font-black" style={{
                backgroundImage: `linear-gradient(to right, ${accentColor}, ${accentSec})`,
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>{heroAcc}</span>
            </h1>
            <p className="max-w-xl text-slate-400 text-lg font-light leading-relaxed mb-10">{heroBody}</p>
            <button className="px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center gap-3 transition-all shadow-xl"
              onClick={() => window.location.href = '/contact'}
              style={{ background: accentColor, boxShadow: `0 20px 40px ${accentColor}33`, color: '#fff' }}>
              {heroBtnLbl} <ArrowRight size={16} />
            </button>
          </div>

          {/* Code preview card */}
          <div className="relative group">
            <div className="absolute -inset-1 rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"
              style={{ background: `linear-gradient(to right, ${accentColor}, ${accentSec})` }} />
            <div className="relative bg-slate-950 border border-white/10 rounded-[2rem] p-6 font-mono text-sm overflow-hidden">
              <div className="flex gap-2 mb-4 border-b border-white/5 pb-4">
                <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/40" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/40" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/20 border border-emerald-500/40" />
              </div>
              <div className="space-y-1 text-slate-500 text-xs">
                <p><span style={{ color: accentColor }}>function</span> <span style={{ color: accentSec }}>withdraw</span>(uint _amount) <span style={{ color: accentColor }}>public</span> &#123;</p>
                <p className="pl-4 line-through opacity-60 bg-red-500/5">require(balances[msg.sender] &gt;= _amount);</p>
                <p className="pl-4 bg-emerald-500/5" style={{ color: accentSec }}>// Optimized for Reentrancy protection</p>
                <p className="pl-4">uint bal = balances[msg.sender];</p>
                <p className="pl-4">balances[msg.sender] -= _amount;</p>
                <p className="pl-4" style={{ color: accentColor }}>(bool success, ) = msg.sender.call&#123;value: _amount&#125;("");</p>
                <p>&#125;</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ────────────────────────────────────────────────── */}
      <section className="py-24 px-6 border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {auditStats.map((stat, i) => (
            <div key={i} className="text-center">
              <p className="text-4xl md:text-5xl font-black italic mb-2" style={{ color: COLOR_MAP[stat.color] ?? '#64748b' }}>{stat.val}</p>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── METHODOLOGY ──────────────────────────────────────────────── */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20">
            <div>
              <h2 className="text-[10px] font-black uppercase tracking-[0.5em] mb-4 italic" style={{ color: accentColor }}>The Methodology</h2>
              <h3 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter">{methHeadline}</h3>
            </div>
            <p className="max-w-sm text-slate-500 text-sm font-light">{methBody}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
            {phases.map((phase, i) => {
              const Icon = ICON_MAP[phase.icon] ?? ShieldCheck;
              return (
                <div key={i} className="group p-10 rounded-[2.5rem] bg-slate-900/20 border border-white/5 transition-all flex gap-8"
                  onMouseEnter={e => (e.currentTarget.style.borderColor = `${accentColor}33`)}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)')}>
                  <div className="p-4 bg-white/5 rounded-2xl h-fit transition-all" style={{ color: accentColor }}>
                    <Icon size={28} />
                  </div>
                  <div>
                    <h4 className="text-xl font-black uppercase italic mb-3 tracking-tight">{phase.title}</h4>
                    <p className="text-slate-500 text-sm leading-relaxed font-light group-hover:text-slate-300 transition-colors">{phase.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────── */}
      <section className="py-32 px-6" style={{ background: 'linear-gradient(to bottom, transparent, rgba(239,68,68,0.05))' }}>
        <div className="max-w-4xl mx-auto text-center">
          <Bug className="mx-auto text-red-500 mb-8 animate-bounce" size={48} />
          <h2 className="text-4xl md:text-7xl font-black uppercase italic tracking-tighter mb-10 leading-none">
            {ctaHeadline.split(' ').slice(0, -1).join(' ')} <span className="text-red-500">{ctaHeadline.split(' ').slice(-1)[0]}</span>
          </h2>
          <p className="text-slate-400 mb-12 max-w-lg mx-auto italic tracking-wide font-light">{ctaQuote}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => window.location.href = '/contact'}
              className="bg-white text-black px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:scale-105 transition-all">{ctaBtnPrim}</button>
            <button className="bg-white/5 border border-white/10 text-white px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all">{ctaBtnSec}</button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}