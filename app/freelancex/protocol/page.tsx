// app/freelancex/protocol/page.tsx

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Shield, Lock, Fingerprint, FileCode2,
  Terminal, ChevronRight, CheckCircle2,
  AlertTriangle, Network, Cpu,
  ShieldCheck, XCircle, AlertOctagon, ShieldAlert,
} from 'lucide-react';
import Link from 'next/link';

import Navbar from '@/components/freelancex/layout/HomeNavbar';
import Footer from '@/components/freelancex/landing/Footer';
import { usePageContent } from '@/hooks/usePageContent';

// ── Icon maps ─────────────────────────────────────────────────────────────────
const RULE_ICON_MAP: Record<string, React.ElementType> = {
  Fingerprint, Shield, Lock, FileCode2, ShieldCheck, Network, Cpu,
};
const ENFORCEMENT_ICON_MAP: Record<string, React.ElementType> = {
  XCircle, AlertOctagon, ShieldAlert,
};

// ── Types ─────────────────────────────────────────────────────────────────────
interface ProtocolRule    { id: string; title: string; desc: string; icon: string; color: string; bg: string; border: string }
interface EnforcementItem { level: string; violation: string; consequence: string; icon: string; color: string; bg: string; border: string }

function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

// ── Defaults ──────────────────────────────────────────────────────────────────
const DEFAULT_RULES = JSON.stringify([
  { id: '01', title: 'Biological Vetting',       desc: 'Every node must pass a rigorous neural and technical audit. Only the top 1% of global talent is granted access to the ecosystem. Mediocrity is rejected.',                                                icon: 'Fingerprint', color: 'text-blue-400',    bg: 'bg-blue-500/10',    border: 'border-blue-500/20'    },
  { id: '02', title: 'Zero-Trust Security',      desc: 'All intellectual property is protected under strict NDAs and end-to-end encrypted communication channels. Data leaks are physically impossible.',                                                         icon: 'Shield',      color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
  { id: '03', title: 'Escrow Mandate',           desc: 'Capital is locked in secure digital vaults before sprints begin. Funds are only released upon successful verification of the deliverables. Zero fraud.',                                                  icon: 'Lock',        color: 'text-indigo-400',  bg: 'bg-indigo-500/10',  border: 'border-indigo-500/20'  },
  { id: '04', title: 'Architectural Excellence', desc: 'No spaghetti code. All deliverables must meet enterprise-grade standards, pass automated linting protocols, and be infinitely scalable.',                                                                  icon: 'FileCode2',   color: 'text-purple-400',  bg: 'bg-purple-500/10',  border: 'border-purple-500/20'  },
]);
const DEFAULT_ENFORCEMENT = JSON.stringify([
  { level: 'Critical Infraction', violation: 'IP / Data Exfiltration Attempt', consequence: 'Permanent Network Ban & Legal Prosecution', icon: 'XCircle',     color: 'text-rose-500',   bg: 'bg-rose-500/10',   border: 'border-rose-500/20'   },
  { level: 'High Infraction',     violation: 'Milestone Abandonment (>48h)',   consequence: 'Escrow Forfeiture & Rank Degradation',      icon: 'AlertOctagon', color: 'text-orange-500', bg: 'bg-orange-500/10', border: 'border-orange-500/20' },
  { level: 'Medium Infraction',   violation: 'Sub-Standard Code Delivery',     consequence: 'Mandatory Refactor & AI Re-Audit',           icon: 'ShieldAlert',  color: 'text-amber-500',  bg: 'bg-amber-500/10',  border: 'border-amber-500/20'  },
]);

export default function ProtocolPage() {
  const { get } = usePageContent('freelancex-protocol');

  // ── Hero ──────────────────────────────────────────────────────────────────
  const badgeText       = get('hero', 'badge_text',      'The Manifesto');
  const headlinePlain   = get('hero', 'headline_plain',  'The');
  const headlineAccent  = get('hero', 'headline_accent', '0x99 Protocol.');
  const bodyText        = get('hero', 'body_text',       'FreelanceX is not a marketplace. It is an exclusive network governed by strict technological and ethical laws. Read the directives before initializing your node.');
  const accentFrom      = get('hero', 'accent_from',     '#3b82f6');
  const accentTo        = get('hero', 'accent_to',       '#a855f7');

  // ── Terminal ──────────────────────────────────────────────────────────────
  const termCmd     = get('terminal', 'line_command',  'run ./verify_node_integrity.sh');
  const termStep1   = get('terminal', 'line_step1',    'Analyzing network request...');
  const termStep2   = get('terminal', 'line_step2',    'Establishing end-to-end encrypted connection...');
  const termSuccess = get('terminal', 'line_success',  'CONNECTION SECURE. LOADING DIRECTIVES.');

  // ── Directives ────────────────────────────────────────────────────────────
  const directivesHeadline = get('directives', 'section_headline', 'Core Directives');
  const rules = safeParse<ProtocolRule[]>(get('directives', 'rules_json', DEFAULT_RULES), []);

  // ── Enforcement ───────────────────────────────────────────────────────────
  const enforcementHeadline = get('enforcement', 'section_headline', 'Enforcement Matrix');
  const enforcementSubhead  = get('enforcement', 'section_subhead',  'Zero tolerance for protocol violations. Autonomous systems enforce rules globally.');
  const liveBadgeText       = get('enforcement', 'live_badge_text',  'Active Monitoring');
  const enforcementMatrix   = safeParse<EnforcementItem[]>(get('enforcement', 'matrix_json', DEFAULT_ENFORCEMENT), []);

  // ── CTA ───────────────────────────────────────────────────────────────────
  const ctaPlain   = get('cta', 'headline_plain',  'Acknowledge &');
  const ctaAccent  = get('cta', 'headline_accent', 'Initialize.');
  const ctaBody    = get('cta', 'body_text',       'By proceeding, you agree to adhere to the 0x99 Protocol. Violation of these directives will result in immediate network expulsion.');
  const ctaBtn     = get('cta', 'btn_label',       'Accept Protocol & Enter Network');
  const ctaHref    = get('cta', 'btn_href',        '/freelancex/signup');
  const footerNote = get('cta', 'footer_note',     'Decentralized Governance Active');

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col font-sans selection:bg-indigo-500/30 overflow-x-hidden">
      <Navbar />

      <main className="flex-grow pt-24 md:pt-32 pb-16 md:pb-24 relative">
        <div className="absolute top-0 right-0 w-[300px] md:w-[800px] h-[300px] md:h-[600px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none -z-0" />
        <div className="absolute bottom-1/4 left-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none -z-0" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-soft-light pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16 md:space-y-24">

          {/* ── HERO ─────────────────────────────────────────────────────── */}
          <div className="text-center space-y-6 md:space-y-8 max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
              <Network size={14} className="text-indigo-400" />
              <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">{badgeText}</span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tighter leading-[1.05]">
              {headlinePlain}{' '}
              <span className="text-transparent bg-clip-text"
                style={{ backgroundImage: `linear-gradient(to right, ${accentFrom}, ${accentTo})` }}>
                {headlineAccent}
              </span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="text-slate-400 text-sm md:text-xl font-medium leading-relaxed max-w-2xl mx-auto px-4">
              {bodyText}
            </motion.p>
          </div>

          {/* ── TERMINAL ─────────────────────────────────────────────────── */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="max-w-4xl mx-auto bg-[#050b14] border border-white/10 rounded-2xl md:rounded-[2rem] overflow-hidden shadow-2xl">
            <div className="bg-white/5 border-b border-white/5 px-4 md:px-6 py-3 md:py-4 flex items-center justify-between">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>
              <div className="text-[9px] md:text-[10px] font-mono text-slate-500 tracking-widest">system_core@freelancex:~</div>
              <Terminal size={14} className="text-slate-500 hidden sm:block" />
            </div>
            <div className="p-6 md:p-10 font-mono text-[10px] md:text-sm space-y-4 text-blue-400/80">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="flex items-start gap-3">
                <span className="text-emerald-400">root@protocol ~$</span>
                <span className="text-slate-300">{termCmd}</span>
              </motion.div>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0 }} className="text-slate-500">
                [System] {termStep1}
              </motion.div>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="text-slate-500">
                [System] {termStep2}
              </motion.div>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.0 }} className="text-emerald-400 flex items-center gap-2">
                <CheckCircle2 size={14} /> {termSuccess}
              </motion.div>
            </div>
          </motion.div>

          {/* ── CORE DIRECTIVES ──────────────────────────────────────────── */}
          <div className="max-w-4xl mx-auto space-y-6 md:space-y-8">
            <div className="flex items-center gap-4 mb-10 md:mb-16">
              <Cpu className="text-indigo-400" size={32} />
              <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tight">{directivesHeadline}</h2>
            </div>

            <div className="space-y-6 md:space-y-8 relative">
              <div className="hidden md:block absolute top-0 bottom-0 left-[3.5rem] w-[2px] bg-gradient-to-b from-indigo-500/50 via-purple-500/50 to-transparent" />

              {rules.map((rule, idx) => {
                const Icon = RULE_ICON_MAP[rule.icon] ?? Shield;
                return (
                  <motion.div key={idx} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
                    className="relative flex flex-col md:flex-row gap-6 md:gap-10 items-start group">
                    <div className="flex items-center gap-4 md:block relative z-10 bg-[#020617]">
                      <div className={`w-14 h-14 md:w-28 md:h-28 rounded-2xl md:rounded-[2rem] bg-[#0a0f1d] border ${rule.border} flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-500`}>
                        <Icon className={rule.color} size={24} />
                      </div>
                      <div className="md:hidden text-2xl font-black text-white/20">{rule.id}</div>
                    </div>
                    <div className="flex-1 bg-[#0a0f1d]/60 border border-white/5 rounded-[1.5rem] md:rounded-[2.5rem] p-6 md:p-10 backdrop-blur-xl group-hover:bg-white/[0.02] group-hover:border-white/10 transition-all">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl md:text-2xl font-black text-white">{rule.title}</h3>
                        <span className="hidden md:block text-4xl font-black text-white/5">{rule.id}</span>
                      </div>
                      <p className="text-slate-400 text-sm md:text-base leading-relaxed font-medium">{rule.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* ── ENFORCEMENT MATRIX ───────────────────────────────────────── */}
          <div className="max-w-4xl mx-auto pt-6 md:pt-10">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-10 border-b border-white/5 pb-8">
              <div>
                <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tight flex items-center gap-4">
                  <AlertTriangle className="text-rose-500" size={32} />
                  {enforcementHeadline}
                </h2>
                <p className="text-slate-400 font-medium mt-3 text-sm md:text-base">{enforcementSubhead}</p>
              </div>
              <div className="px-4 py-2 bg-rose-500/10 border border-rose-500/20 rounded-full text-rose-400 text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shrink-0">
                <div className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" /> {liveBadgeText}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {enforcementMatrix.map((item, i) => {
                const Icon = ENFORCEMENT_ICON_MAP[item.icon] ?? ShieldAlert;
                return (
                  <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                    className={`bg-[#0a0f1d]/80 border ${item.border} rounded-[2rem] p-6 md:p-8 backdrop-blur-xl relative overflow-hidden group`}>
                    <div className={`absolute top-0 right-0 w-32 h-32 ${item.bg} blur-3xl rounded-full opacity-50 group-hover:opacity-100 transition-opacity`} />
                    <div className={`w-10 h-10 rounded-xl ${item.bg} border ${item.border} flex items-center justify-center mb-6 relative z-10`}>
                      <Icon size={18} className={item.color} />
                    </div>
                    <div className="relative z-10">
                      <span className={`text-[9px] font-black uppercase tracking-widest ${item.color} block mb-2`}>{item.level}</span>
                      <h4 className="text-base font-bold text-white mb-4 leading-snug">{item.violation}</h4>
                      <div className="pt-4 border-t border-white/10">
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1">Action Protocol</span>
                        <p className="text-slate-300 text-sm font-medium">{item.consequence}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* ── FINAL CTA ────────────────────────────────────────────────── */}
          <div className="max-w-4xl mx-auto pt-10">
            <div className="relative rounded-[2rem] md:rounded-[3rem] overflow-hidden border border-blue-500/30 p-8 md:p-16 text-center backdrop-blur-xl shadow-2xl"
              style={{ backgroundImage: `linear-gradient(to right, rgba(30,58,138,0.4), rgba(49,46,129,0.4))` }}>
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light" />
              <div className="relative z-10 space-y-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-500/10 text-blue-400 mb-2">
                  <ShieldCheck size={32} />
                </div>
                <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">
                  {ctaPlain}<br />
                  <span style={{ color: accentFrom }}>{ctaAccent}</span>
                </h2>
                <p className="text-slate-300 text-sm md:text-base max-w-xl mx-auto">{ctaBody}</p>
                <div className="pt-6">
                  <Link href={ctaHref}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 md:px-12 md:py-5 bg-white text-black font-black text-[10px] md:text-xs uppercase tracking-[0.2em] rounded-xl md:rounded-2xl hover:scale-105 transition-all shadow-[0_0_40px_rgba(255,255,255,0.2)]">
                    {ctaBtn} <ChevronRight size={18} />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 py-6 text-[8px] md:text-[9px] font-black uppercase tracking-[0.3em] text-slate-500">
            <ShieldCheck size={14} className="text-indigo-500" />
            <span>{footerNote}</span>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}