// app/hirex/neural-ledger/page.tsx

'use client';

import React, { useState, useEffect, useRef } from 'react';
import Navbar from '@/components/hirex/layout/Navbar';
import Footer from '@/components/hirex/home/Footer';
import Link from 'next/link';
import { GoogleGenerativeAI } from '@google/generative-ai';
import {
  Search, ShieldAlert, CheckCircle2,
  Cpu, Database, Lock, Activity, Zap, Terminal,
  Globe, BrainCircuit, Loader2, Server, Eye,
  Fingerprint, History, Link as LinkIcon, Network,
  ShieldCheck, FileText, ArrowRight,
} from 'lucide-react';
import { usePageContent } from '@/hooks/usePageContent';

// ── Icon maps ─────────────────────────────────────────────────────────────────
const ICON_MAP: Record<string, React.ElementType> = {
  Database, Zap, CheckCircle2, Globe, Network, ShieldCheck, Lock, FileText,
  Fingerprint, Activity, Server, Eye,
};

// ── Types ─────────────────────────────────────────────────────────────────────
interface NetworkStat        { label: string; value: string; icon: string; color: string }
interface TransparencyFeature{ title: string; icon: string; color: string; desc: string }
interface SecurityFeature    { icon: string; color: string; label: string }
interface ComplianceBadge    { icon: string; color: string; label: string }

interface LedgerLog {
  id: string;
  hash: string;
  timestamp: string;
  type: 'AI_EVALUATION' | 'SECURITY_PROTOCOL' | 'MATRIX_GENERATION';
  candidate: string;
  role: string;
  action: string;
  status: 'success' | 'warning' | 'critical';
  score: number | null;
  aiNotes: string;
}

function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

const DEFAULT_NETWORK_STATS = JSON.stringify([
  { label: 'Active Blocks',    value: '1',    icon: 'Database',     color: 'text-purple-400'  },
  { label: 'API Latency',      value: '42ms', icon: 'Zap',          color: 'text-cyan-400'    },
  { label: 'Integrity Checks', value: '100%', icon: 'CheckCircle2', color: 'text-emerald-400' },
  { label: 'Global Nodes',     value: '12',   icon: 'Globe',        color: 'text-blue-400'    },
]);
const DEFAULT_TRANSPARENCY_FEATURES = JSON.stringify([
  { title: 'Total Auditability',       icon: 'Network',     color: 'blue',    desc: "Employers can pull the exact cryptographic hash detailing the AI's logic flaws." },
  { title: 'Bias Elimination',         icon: 'ShieldCheck', color: 'emerald', desc: 'Evaluations are based 100% on technical merit—zero identity factors recorded.'   },
  { title: 'Anti-Cheat Verification',  icon: 'Lock',        color: 'purple',  desc: 'Proctoring events are instantly hashed. Employers get irrefutable proof.'         },
]);
const DEFAULT_SECURITY_FEATURES = JSON.stringify([
  { icon: 'Database',    color: 'blue',    label: 'Stored on Distributed TiDB Clusters'  },
  { icon: 'Fingerprint', color: 'purple',  label: 'SHA-256 Checksums for every log entry' },
  { icon: 'Lock',        color: 'emerald', label: 'AES-256 At-Rest Encryption'            },
]);
const DEFAULT_COMPLIANCE_BADGES = JSON.stringify([
  { icon: 'ShieldCheck', color: 'text-blue-400',    label: 'SOC 2 Type II'  },
  { icon: 'Globe',       color: 'text-emerald-400', label: 'GDPR Compliant' },
  { icon: 'FileText',    color: 'text-purple-400',  label: 'ISO 27001'      },
]);

const GENESIS_LOGS: LedgerLog[] = [
  {
    id: 'NL-GENESIS-01',
    hash: '0x0000000000000000',
    timestamp: new Date().toLocaleTimeString(),
    type: 'MATRIX_GENERATION',
    candidate: 'System Core',
    role: 'Infrastructure',
    action: 'HireX Neural Ledger Initialized. Awaiting AI connections.',
    status: 'success',
    score: null,
    aiNotes: 'System booted securely. Distributed SQL and Gemini Flash API connected. Encrypted tunnel established.',
  },
];

// ── Color bg helper ───────────────────────────────────────────────────────────
const COLOR_BG_MAP: Record<string, string> = {
  blue:    'rgba(59,130,246,0.1)',
  emerald: 'rgba(16,185,129,0.1)',
  purple:  'rgba(168,85,247,0.1)',
  yellow:  'rgba(234,179,8,0.1)',
};
const COLOR_TEXT_MAP: Record<string, string> = {
  blue:    '#60a5fa',
  emerald: '#34d399',
  purple:  '#c084fc',
  yellow:  '#facc15',
};

export default function NeuralLedgerPage() {
  const [logs, setLogs]             = useState<LedgerLog[]>(GENESIS_LOGS);
  const [isGenerating, setIsGen]    = useState(false);
  const [searchQuery, setSearch]    = useState('');
  const logsEndRef                  = useRef<HTMLDivElement>(null);

  const { get } = usePageContent('hirex-neural-ledger');

  // ── CMS values ───────────────────────────────────────────────────────────
  const badgeText        = get('hero', 'badge_text',         'Immutable Audit Trail');
  const headlinePlain    = get('hero', 'headline_plain',     'The Neural');
  const headlineAccent   = get('hero', 'headline_accent',    'Ledger');
  const bodyText         = get('hero', 'body_text',          'Absolute transparency in AI hiring. Every decision, evaluation score, and security flag generated by the HireX engine is cryptographically hashed and permanently logged.');
  const accentFrom       = get('hero', 'accent_from',        '#a855f7');
  const accentVia        = get('hero', 'accent_via',         '#22d3ee');
  const accentTo         = get('hero', 'accent_to',          '#3b82f6');
  const networkStats     = safeParse<NetworkStat[]>(get('hero', 'network_stats_json', DEFAULT_NETWORK_STATS), []);

  const terminalTitle    = get('terminal', 'section_title',      'System Control');
  const terminalBody     = get('terminal', 'section_body',       'Trigger the AI engine to evaluate a hypothetical candidate.');
  const generateBtnLabel = get('terminal', 'generate_btn_label', 'Generate Live Block');
  const loadingBtnLabel  = get('terminal', 'loading_btn_label',  'Computing Block...');
  const searchPlaceholder= get('terminal', 'search_placeholder', 'Search by Hash, ID, or Candidate...');
  const terminalFilename = get('terminal', 'terminal_filename',  'network_stream');
  const liveBadgeLabel   = get('terminal', 'live_badge_label',   'Live');

  const transparencyHeadline = get('transparency', 'headline',     'Why we built the Ledger');
  const transparencySubhead  = get('transparency', 'subheading',   'AI hiring requires absolute trust.');
  const transparencyFeatures = safeParse<TransparencyFeature[]>(get('transparency', 'features_json', DEFAULT_TRANSPARENCY_FEATURES), []);

  const securityHeadline  = get('security', 'headline',    'Cryptographic Data Architecture');
  const securityBody      = get('security', 'body_text',   'Data tampering is mathematically impossible.');
  const securityImageUrl  = get('security', 'image_url',   'https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2000&auto=format&fit=crop');
  const securityFeatures  = safeParse<SecurityFeature[]>(get('security', 'features_json', DEFAULT_SECURITY_FEATURES), []);

  const complianceHeadline = get('compliance', 'headline',     'Meeting Global Enterprise Standards');
  const complianceBadges   = safeParse<ComplianceBadge[]>(get('compliance', 'badges_json', DEFAULT_COMPLIANCE_BADGES), []);

  const ctaHeadline        = get('cta', 'headline',    'Deploy your private ledger.');
  const ctaBody            = get('cta', 'body_text',   'Secure your enterprise hiring process with immutable AI logic trails.');
  const ctaBtnLabel        = get('cta', 'btn_label',   'Contact Sales');
  const ctaBtnHref         = get('cta', 'btn_href',    '/hirex/contact');

  // ── Sync scroll ───────────────────────────────────────────────────────────
  useEffect(() => { logsEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [logs]);

  // ── AI log generation ─────────────────────────────────────────────────────
  const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');

  const generateAILog = async () => {
    if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
      alert('Please add NEXT_PUBLIC_GEMINI_API_KEY to your .env file to generate live logs!');
      return;
    }
    setIsGen(true);
    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash', generationConfig: { responseMimeType: 'application/json' } });
      const prompt = `You are the core AI engine of HireX, an autonomous technical hiring platform. 
      Generate a single, highly detailed, realistic audit log entry for a hypothetical candidate.
      Return ONLY a valid JSON object with the following exact keys:
      { "candidate": "Realistic Indian Full Name", "role": "Modern tech role", "type": "AI_EVALUATION|SECURITY_PROTOCOL|MATRIX_GENERATION", "action": "1-sentence technical summary", "status": "success|warning|critical", "score": number_50_to_99_or_null, "aiNotes": "1-sentence technical observation" }`;
      const result = await model.generateContent(prompt);
      const raw = JSON.parse((await result.response.text()).replace(/```json|```/g, '').trim());
      setLogs(prev => [...prev, {
        id: `NL-${Math.floor(Math.random() * 90000) + 10000}-${raw.type?.charAt(0) ?? 'X'}`,
        hash: `0x${Math.random().toString(16).substring(2, 12)}...${Math.random().toString(16).substring(2, 6)}`,
        timestamp: new Date().toLocaleTimeString(),
        ...raw,
      }]);
    } catch (e) {
      console.error('AI Generation Error:', e);
      alert('Failed to generate log from Gemini. Please try again.');
    } finally {
      setIsGen(false);
    }
  };

  const filteredLogs = logs.filter(l =>
    l.candidate.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.hash.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.id.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'success':  return { icon: CheckCircle2, color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', line: 'border-emerald-500/50' };
      case 'warning':  return { icon: ShieldAlert,  color: 'text-yellow-400',  bg: 'bg-yellow-500/10',  border: 'border-yellow-500/20',  line: 'border-yellow-500/50'  };
      case 'critical': return { icon: Lock,          color: 'text-red-400',     bg: 'bg-red-500/10',     border: 'border-red-500/20',     line: 'border-red-500/50'     };
      default:         return { icon: Activity,      color: 'text-purple-400',  bg: 'bg-purple-500/10',  border: 'border-purple-500/20',  line: 'border-purple-500/50'  };
    }
  };

  return (
    <main className="min-h-screen relative overflow-hidden bg-[#020617] text-white selection:bg-purple-500/30 font-sans">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-purple-600/10 blur-[150px] rounded-full translate-x-1/4 -translate-y-1/4" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-cyan-600/10 blur-[150px] rounded-full -translate-x-1/4 translate-y-1/4" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
      </div>

      <Navbar />

      <div className="relative z-10 pt-28 md:pt-40 pb-16 md:pb-24">

        {/* ── HERO ──────────────────────────────────────────────────────── */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-16 md:mb-24">
          <div className="text-center max-w-4xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono uppercase tracking-widest mb-6"
              style={{ background: `${accentFrom}1a`, border: `1px solid ${accentFrom}33`, color: accentFrom }}>
              <ShieldCheck className="w-4 h-4" /> {badgeText}
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6 leading-tight">
              {headlinePlain}{' '}
              <span className="text-transparent bg-clip-text"
                style={{ backgroundImage: `linear-gradient(to right, ${accentFrom}, ${accentVia}, ${accentTo})` }}>
                {headlineAccent}
              </span>
            </h1>
            <p className="text-base md:text-xl text-slate-400 leading-relaxed max-w-3xl mx-auto">{bodyText}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {networkStats.map((stat, i) => {
              const Icon = ICON_MAP[stat.icon] ?? Activity;
              return (
                <div key={i} className="bg-slate-900/40 backdrop-blur-xl border border-white/10 p-5 md:p-6 rounded-2xl md:rounded-3xl flex flex-col items-center text-center">
                  <Icon className={`w-6 h-6 md:w-8 md:h-8 mb-3 ${stat.color}`} />
                  <h3 className="text-2xl md:text-3xl font-black text-white mb-1">{stat.value}</h3>
                  <p className="text-[10px] md:text-xs font-mono text-slate-500 uppercase tracking-widest">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── TERMINAL ──────────────────────────────────────────────────── */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-24">
          <div className="grid lg:grid-cols-12 gap-6 md:gap-8 items-start">
            {/* Controls */}
            <div className="lg:col-span-4 space-y-4 md:space-y-6 lg:sticky lg:top-28">
              <div className="bg-slate-900/60 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-6 md:p-8 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-1 opacity-50 group-hover:opacity-100 transition-opacity"
                  style={{ backgroundImage: `linear-gradient(to right, ${accentFrom}, ${accentVia})` }} />
                <h2 className="text-xl md:text-2xl font-bold mb-3 flex items-center gap-2">
                  <Cpu className="w-6 h-6" style={{ color: accentFrom }} /> {terminalTitle}
                </h2>
                <p className="text-sm text-slate-400 mb-8 leading-relaxed">{terminalBody}</p>
                <button
                  onClick={generateAILog}
                  disabled={isGenerating}
                  className="w-full text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed hover:-translate-y-1"
                  style={{ background: accentFrom, boxShadow: `0 0 20px ${accentFrom}4d` }}>
                  {isGenerating ? (
                    <><Loader2 className="w-5 h-5 animate-spin" /> {loadingBtnLabel}</>
                  ) : (
                    <><Zap className="w-5 h-5" /> {generateBtnLabel}</>
                  )}
                </button>
              </div>
              <div className="relative w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input
                  type="text"
                  placeholder={searchPlaceholder}
                  value={searchQuery}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full bg-slate-900/60 backdrop-blur-md border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-sm text-white focus:outline-none transition-colors placeholder:text-slate-500 shadow-lg"
                  style={{ '--tw-border-opacity': 1 } as any}
                  onFocus={e => (e.currentTarget.style.borderColor = accentFrom)}
                  onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}
                />
              </div>
            </div>

            {/* Live Feed */}
            <div className="lg:col-span-8 bg-[#0b0f1f]/90 backdrop-blur-3xl border border-white/10 rounded-[2rem] md:rounded-[2.5rem] shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col h-[600px] md:h-[750px] overflow-hidden">
              <div className="bg-black/60 px-5 md:px-8 py-4 border-b border-white/10 flex items-center justify-between z-10 shrink-0">
                <div className="flex items-center gap-4">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                  <span className="text-xs md:text-sm font-mono text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <Terminal className="w-4 h-4" /> {terminalFilename}
                  </span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-red-500/10 rounded-lg border border-red-500/20">
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-[10px] md:text-xs font-mono text-red-400 uppercase font-bold tracking-widest">{liveBadgeLabel}</span>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-5 md:p-8 custom-scrollbar relative">
                {filteredLogs.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-slate-500">
                    <Search className="w-10 h-10 mb-3 opacity-50" />
                    <p className="text-base">No neural blocks match your query.</p>
                  </div>
                ) : (
                  <div className="space-y-6 relative border-l-2 border-slate-800 ml-4 md:ml-6 pl-6 md:pl-8">
                    {filteredLogs.map(log => {
                      const config = getStatusConfig(log.status);
                      return (
                        <div key={log.id} className="relative bg-black/40 border border-white/5 hover:border-white/10 p-5 md:p-6 rounded-[1.5rem] transition-all duration-300 group">
                          <div className={`absolute -left-[35px] md:-left-[43px] top-8 w-4 h-4 rounded-full ${config.bg} border-2 ${config.line} z-10`} />
                          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-5">
                            <div>
                              <div className="flex flex-wrap items-center gap-2 mb-2">
                                <span className="text-[10px] md:text-xs font-mono text-slate-400 flex items-center gap-1.5">
                                  <History className="w-3.5 h-3.5" /> {log.timestamp}
                                </span>
                                <span className={`text-[9px] md:text-[10px] px-2.5 py-0.5 rounded-md border font-mono tracking-wider uppercase ${config.bg} ${config.color} ${config.border}`}>
                                  {log.type}
                                </span>
                                <span className="text-[10px] md:text-xs font-mono text-slate-500">ID: {log.id}</span>
                              </div>
                              <p className="text-xs md:text-sm font-mono text-cyan-400/80 group-hover:text-cyan-300 transition-colors flex items-center gap-2 break-all">
                                <Fingerprint className="w-4 h-4 opacity-70 shrink-0" /> {log.hash}
                              </p>
                            </div>
                            <div className="flex-shrink-0 bg-white/[0.02] border border-white/5 p-3 rounded-xl min-w-[120px] text-right">
                              {log.score !== null ? (
                                <>
                                  <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider mb-1">AI Match Score</p>
                                  <p className="text-2xl md:text-3xl font-black text-white leading-none">{log.score}<span className="text-lg text-slate-500">%</span></p>
                                </>
                              ) : (
                                <>
                                  <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider mb-1">Flag Level</p>
                                  <p className={`text-sm md:text-lg font-black uppercase ${config.color} flex items-center justify-end gap-1.5`}>
                                    <config.icon className="w-4 h-4 md:w-5 md:h-5" /> {log.status}
                                  </p>
                                </>
                              )}
                            </div>
                          </div>
                          <div className="grid md:grid-cols-2 gap-4 bg-white/[0.03] rounded-2xl p-4 md:p-5 mb-5 border border-white/5">
                            <div>
                              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Target Entity</p>
                              <p className="text-sm font-bold text-white mb-0.5">{log.candidate}</p>
                              <p className="text-xs text-slate-400">{log.role}</p>
                            </div>
                            <div>
                              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Action Executed</p>
                              <p className="text-sm text-slate-300 leading-relaxed">{log.action}</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3 p-4 rounded-2xl" style={{ background: `${accentFrom}0d`, border: `1px solid ${accentFrom}1a` }}>
                            <BrainCircuit className="w-5 h-5 shrink-0 mt-0.5" style={{ color: accentFrom }} />
                            <p className="text-xs md:text-sm text-slate-300 font-mono leading-relaxed">
                              <span className="font-bold uppercase tracking-wider mr-2 text-[10px]" style={{ color: accentFrom }}>Neural_Log:</span>
                              {log.aiNotes}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
                <div ref={logsEndRef} className="h-8" />
              </div>
            </div>
          </div>
        </section>

        {/* ── TRANSPARENCY MATRIX ───────────────────────────────────────── */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-24">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{transparencyHeadline}</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">{transparencySubhead}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {transparencyFeatures.map((feat, i) => {
              const Icon = ICON_MAP[feat.icon] ?? Activity;
              return (
                <div key={i} className="bg-slate-900/40 border border-white/5 rounded-3xl p-8 hover:bg-slate-900/60 transition-colors cursor-pointer group">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                    style={{ background: COLOR_BG_MAP[feat.color] ?? 'rgba(255,255,255,0.05)', border: `1px solid ${COLOR_TEXT_MAP[feat.color] ?? '#fff'}33` }}>
                    <Icon className="w-6 h-6" style={{ color: COLOR_TEXT_MAP[feat.color] }} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{feat.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{feat.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── CRYPTOGRAPHIC SECURITY ────────────────────────────────────── */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-24">
          <div className="bg-slate-900/50 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] overflow-hidden flex flex-col lg:flex-row items-stretch shadow-2xl">
            <div className="lg:w-1/2 relative min-h-[300px] lg:min-h-full">
              <img src={securityImageUrl} alt="Cryptographic Security Network" className="absolute inset-0 w-full h-full object-cover opacity-60" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0b0f1f] hidden lg:block" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f1f] to-transparent lg:hidden" />
            </div>
            <div className="lg:w-1/2 p-8 md:p-12 relative z-10 flex flex-col justify-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">{securityHeadline}</h2>
              <p className="text-slate-400 leading-relaxed mb-8">{securityBody}</p>
              <ul className="space-y-5">
                {securityFeatures.map((feat, i) => {
                  const Icon = ICON_MAP[feat.icon] ?? Activity;
                  return (
                    <li key={i} className="flex items-center gap-4 text-slate-300">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                        style={{ background: COLOR_BG_MAP[feat.color] ?? 'rgba(255,255,255,0.05)', border: `1px solid ${COLOR_TEXT_MAP[feat.color] ?? '#fff'}4d` }}>
                        <Icon className="w-5 h-5" style={{ color: COLOR_TEXT_MAP[feat.color] }} />
                      </div>
                      <span className="font-medium">{feat.label}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </section>

        {/* ── COMPLIANCE ────────────────────────────────────────────────── */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-24 text-center">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-8">{complianceHeadline}</p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            {complianceBadges.map((badge, i) => {
              const Icon = ICON_MAP[badge.icon] ?? ShieldCheck;
              return (
                <div key={i} className="px-6 py-4 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-3 hover:bg-white/10 transition-colors cursor-default">
                  <Icon className={`w-6 h-6 ${badge.color}`} />
                  <span className="font-bold text-white tracking-wide">{badge.label}</span>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── CTA ───────────────────────────────────────────────────────── */}
        <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="p-8 md:p-12 rounded-[2.5rem] border border-purple-400/30 shadow-2xl relative overflow-hidden text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8"
            style={{ backgroundImage: `linear-gradient(to bottom right, ${accentFrom}, #1e3a8a)` }}>
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
            <div className="relative z-10">
              <h2 className="text-2xl md:text-4xl font-bold text-white mb-2">{ctaHeadline}</h2>
              <p className="text-purple-100 text-sm md:text-base max-w-lg">{ctaBody}</p>
            </div>
            <Link href={ctaBtnHref}
              className="relative z-10 whitespace-nowrap bg-white text-black font-black px-8 py-4 rounded-2xl hover:scale-105 hover:shadow-xl transition-all duration-300 flex items-center gap-2">
              {ctaBtnLabel} <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>
      </div>

      <Footer />

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 8px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(0,0,0,0.3); border-left: 1px solid rgba(255,255,255,0.05); }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(168,85,247,0.4); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(168,85,247,0.8); }
      `}</style>
    </main>
  );
}