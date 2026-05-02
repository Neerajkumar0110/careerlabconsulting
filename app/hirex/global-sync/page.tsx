// app/hirex/global-sync/page.tsx

'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/hirex/layout/Navbar';
import Footer from '@/components/hirex/home/Footer';
import Link from 'next/link';
import {
  Globe, RefreshCw, Database, Server,
  Link as LinkIcon, Activity, Zap, CheckCircle2,
  Terminal, Webhook, ArrowRight, ShieldCheck,
  Layers, MessageSquare, Briefcase, FileJson,
  ArrowRightLeft, Lock, Repeat, Clock, Star,
} from 'lucide-react';
import { usePageContent } from '@/hooks/usePageContent';

// ── Icon maps ─────────────────────────────────────────────────────────────────
const ICON_MAP: Record<string, React.ElementType> = {
  Database, Layers, MessageSquare, Server, Activity, FileJson, Webhook,
  Repeat, Lock, Clock, ShieldCheck, Globe, CheckCircle2, Zap,
};

// ── Types ─────────────────────────────────────────────────────────────────────
interface Integration         { id: string; name: string; category: string; status: string; latency: string; icon: string; color: string; bg: string; border: string }
interface SyncLog             { time: string; action: string; target: string; payload: string; status: string }
interface LifecycleStep       { title: string; desc: string; icon: string; color: string }
interface FieldMapping        { from: string; to: string }
interface ReliabilityFeature  { title: string; desc: string; icon: string; color: string }

function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

const COLOR_TEXT_MAP: Record<string, string> = {
  blue: '#60a5fa', emerald: '#34d399', purple: '#c084fc', yellow: '#facc15',
};
const COLOR_BG_MAP: Record<string, string> = {
  blue: 'rgba(59,130,246,0.1)', emerald: 'rgba(16,185,129,0.1)',
  purple: 'rgba(168,85,247,0.1)', yellow: 'rgba(234,179,8,0.1)',
};

// ── Defaults ─────────────────────────────────────────────────────────────────
const DEFAULT_INTEGRATIONS    = JSON.stringify([{ id: 'int-workday', name: 'Workday Enterprise', category: 'HRIS', status: 'Synced', latency: '12ms', icon: 'Database', color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/30' }]);
const DEFAULT_SYNC_LOGS       = JSON.stringify([{ time: '00:00:01', action: 'PUSH', target: 'Greenhouse API', payload: 'Candidate HX-9921 360° Report', status: '200 OK' }]);
const DEFAULT_LIFECYCLE_STEPS = JSON.stringify([{ title: 'AI Generation', desc: 'The Neural Engine compiles the candidate 360° report.', icon: 'Activity', color: 'blue' }]);
const DEFAULT_PLATFORMS       = JSON.stringify(['Workday', 'Greenhouse', 'Lever', 'Ashby', 'BambooHR', 'Slack', 'MS Teams', 'Jira']);
const DEFAULT_MAPPINGS        = JSON.stringify([{ from: 'hirex.logic_score', to: 'ats.custom_field_4' }]);
const DEFAULT_RELIABILITY     = JSON.stringify([{ title: 'Auto-Retries', desc: 'Exponential backoff ensures delivery.', icon: 'Repeat', color: 'blue' }]);

export default function GlobalSyncPage() {
  const [activeLog, setActiveLog] = useState(0);
  const { get } = usePageContent('hirex-global-sync');

  // ── CMS values ───────────────────────────────────────────────────────────
  const badgeText        = get('hero', 'badge_text',       'Cross-Platform Telemetry');
  const headlinePlain    = get('hero', 'headline_plain',   'Global');
  const headlineAccent   = get('hero', 'headline_accent',  'Data Sync');
  const heroBody         = get('hero', 'body_text',        "HireX doesn't live in a silo. Instantly synchronize AI assessment scores, candidate neural ledgers, and job requisitions with your existing enterprise infrastructure.");
  const accentFrom       = get('hero', 'accent_from',      '#60a5fa');
  const accentTo         = get('hero', 'accent_to',        '#34d399');

  const intHeadline      = get('integrations', 'headline',         'Integration Gateways');
  const integrations     = safeParse<Integration[]>(get('integrations', 'integrations_json', DEFAULT_INTEGRATIONS), []);
  const syncLogs         = safeParse<SyncLog[]>(get('integrations', 'sync_logs_json', DEFAULT_SYNC_LOGS), []);
  const terminalFilename = get('integrations', 'terminal_filename', 'Global_Webhooks.log');
  const waNumber         = get('integrations', 'whatsapp_number',   '918700236923');

  const lcHeadline       = get('lifecycle', 'headline',   'The Synchronization Lifecycle');
  const lcSubhead        = get('lifecycle', 'subheading', 'From AI evaluation to your HR dashboard in milliseconds.');
  const lcSteps          = safeParse<LifecycleStep[]>(get('lifecycle', 'steps_json', DEFAULT_LIFECYCLE_STEPS), []);

  const platHeadline     = get('platforms', 'headline',         'Integrates with your entire stack');
  const platforms        = safeParse<string[]>(get('platforms', 'platforms_json', DEFAULT_PLATFORMS), []);
  const customApiLabel   = get('platforms', 'custom_api_label', 'Custom REST API');

  const fmBadge          = get('field_mapping', 'badge_text',     'Data Translation');
  const fmHeadline       = get('field_mapping', 'headline',       'Intelligent Field Mapping');
  const fmBody           = get('field_mapping', 'body_text',      'HireX automatically translates complex AI assessment metrics into custom fields within your ATS.');
  const fmMappings       = safeParse<FieldMapping[]>(get('field_mapping', 'mappings_json', DEFAULT_MAPPINGS), []);
  const fmSuccessLabel   = get('field_mapping', 'success_label',  'Data synced successfully');

  const relHeadline      = get('reliability', 'headline',      'Enterprise-Grade Reliability');
  const relSubhead       = get('reliability', 'subheading',    'Built to handle high-volume hiring drives without dropping a single payload.');
  const relFeatures      = safeParse<ReliabilityFeature[]>(get('reliability', 'features_json', DEFAULT_RELIABILITY), []);

  const quote            = get('social_proof', 'quote',          '"The Greenhouse integration eliminated 100% of our manual data entry."');
  const authorName       = get('social_proof', 'author_name',    'Sarah M.');
  const authorTitle      = get('social_proof', 'author_title',   'VP of Engineering, CloudScale');
  const authorInitials   = get('social_proof', 'author_initials','SM');

  const ctaHeadline      = get('cta', 'headline',            'Connect Your Infrastructure');
  const ctaBody          = get('cta', 'body_text',           'Generate API keys to establish a secure, two-way sync with your enterprise systems. Full documentation available.');
  const ctaPrimaryLabel  = get('cta', 'btn_primary_label',   'Generate Keys');
  const ctaSecondLabel   = get('cta', 'btn_secondary_label', 'View API Docs');
  const ctaSecondHref    = get('cta', 'btn_secondary_href',  '/hirex/documentation');
  const ctaWaNumber      = get('cta', 'whatsapp_number',     '918700236923');

  // Simulate live log scrolling
  useEffect(() => {
    if (!syncLogs.length) return;
    const interval = setInterval(() => {
      setActiveLog(prev => (prev + 1) % syncLogs.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [syncLogs.length]);

  const handleWhatsApp = (context: string) => {
    const text = encodeURIComponent(`Hi, I am interested in ${context} on the HireX platform. Let's connect!`);
    window.open(`https://wa.me/${waNumber}?text=${text}`, '_blank');
  };

  return (
    <main className="min-h-screen relative overflow-hidden bg-[#020617] text-white selection:bg-blue-500/30 font-sans">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-1/3 w-[900px] h-[900px] blur-[120px] rounded-full -translate-y-1/4"
          style={{ background: `${accentFrom}0d` }} />
        <div className="absolute bottom-0 left-1/3 w-[700px] h-[700px] blur-[120px] rounded-full translate-y-1/4"
          style={{ background: `${accentTo}0d` }} />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      <Navbar />

      <div className="relative z-10 pt-28 pb-16 md:pt-40 md:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* ── HERO ──────────────────────────────────────────────────── */}
          <div className="max-w-4xl mx-auto text-center mb-16 md:mb-24">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono uppercase tracking-widest mb-6"
              style={{ background: `${accentFrom}1a`, border: `1px solid ${accentFrom}4d`, color: accentFrom }}>
              <RefreshCw className="w-4 h-4 animate-spin" style={{ animationDuration: '8s' }} /> {badgeText}
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6 leading-tight">
              {headlinePlain}{' '}
              <span className="text-transparent bg-clip-text"
                style={{ backgroundImage: `linear-gradient(to right, ${accentFrom}, ${accentTo})` }}>
                {headlineAccent}
              </span>
            </h1>
            <p className="text-sm md:text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto">{heroBody}</p>
          </div>

          {/* ── INTEGRATION RADAR ─────────────────────────────────────── */}
          <div className="relative w-full max-w-4xl mx-auto mb-16 md:mb-24 h-[300px] md:h-[400px] flex items-center justify-center">
            <div className="relative z-20 w-24 h-24 md:w-32 md:h-32 bg-slate-900 rounded-3xl flex items-center justify-center"
              style={{ border: `1px solid ${accentFrom}80`, boxShadow: `0 0 50px ${accentFrom}4d` }}>
              <Zap className="w-10 h-10 md:w-14 md:h-14" style={{ color: accentFrom }} />
            </div>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[200px] md:w-[300px] h-[200px] md:h-[300px] rounded-full animate-ping"
                style={{ border: `1px solid ${accentFrom}33`, animationDuration: '3s' }} />
              <div className="absolute w-[300px] md:w-[500px] h-[300px] md:h-[500px] rounded-full"
                style={{ border: `1px solid ${accentTo}1a` }} />
              <div className="absolute w-[400px] md:w-[700px] h-[400px] md:h-[700px] rounded-full border border-white/5" />
            </div>
            <div className="absolute top-10 left-10 md:top-20 md:left-20 bg-slate-900/80 backdrop-blur-md border border-white/10 p-3 rounded-2xl flex items-center gap-3 shadow-lg">
              <Briefcase className="w-5 h-5" style={{ color: accentTo }} />
              <span className="text-xs font-bold hidden md:block">ATS System</span>
            </div>
            <div className="absolute bottom-10 right-10 md:bottom-20 md:right-20 bg-slate-900/80 backdrop-blur-md border border-white/10 p-3 rounded-2xl flex items-center gap-3 shadow-lg">
              <MessageSquare className="w-5 h-5 text-purple-400" />
              <span className="text-xs font-bold hidden md:block">Slack/Teams</span>
            </div>
            <div className="absolute top-1/2 right-4 md:right-10 -translate-y-1/2 bg-slate-900/80 backdrop-blur-md border border-white/10 p-3 rounded-2xl flex items-center gap-3 shadow-lg">
              <Database className="w-5 h-5" style={{ color: accentFrom }} />
              <span className="text-xs font-bold hidden md:block">HRIS Core</span>
            </div>
          </div>

          {/* ── INTEGRATIONS + TERMINAL ───────────────────────────────── */}
          <div className="grid lg:grid-cols-12 gap-8 items-start mb-20 md:mb-28">
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-2xl font-bold flex items-center gap-3">
                  <Webhook style={{ color: accentFrom }} className="w-6 h-6" /> {intHeadline}
                </h2>
                <span className="text-xs font-mono px-3 py-1 rounded-full border flex items-center gap-1.5"
                  style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', color: '#34d399' }}>
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Live
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {integrations.map(int => {
                  const Icon = ICON_MAP[int.icon] ?? Database;
                  return (
                    <div key={int.id}
                      onClick={() => handleWhatsApp(`setting up the ${int.name} integration`)}
                      className={`bg-slate-900/40 backdrop-blur-md border border-white/10 p-5 rounded-2xl transition-all duration-300 hover:-translate-y-1 group cursor-pointer`}>
                      <div className="flex justify-between items-start mb-4">
                        <div className={`w-12 h-12 rounded-xl ${int.bg} border border-white/5 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                          <Icon className={`w-6 h-6 ${int.color}`} />
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-1">Latency</p>
                          <p className="text-xs font-bold text-white font-mono">{int.latency}</p>
                        </div>
                      </div>
                      <h3 className={`font-bold text-lg text-white mb-1 group-hover:${int.color} transition-colors flex items-center justify-between`}>
                        {int.name} <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" style={{ color: accentFrom }} />
                      </h3>
                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
                        <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">{int.category}</span>
                        <span className={`text-[10px] font-bold px-2 py-1 rounded-md bg-white/5 ${int.color}`}>{int.status}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-[#0b0f1f]/90 backdrop-blur-3xl border border-white/10 rounded-[2rem] shadow-2xl flex flex-col min-h-[400px] overflow-hidden lg:sticky lg:top-32">
                <div className="bg-black/60 px-5 py-4 border-b border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Terminal className="w-4 h-4 text-slate-400" />
                    <span className="text-xs font-mono text-slate-300 uppercase tracking-widest">{terminalFilename}</span>
                  </div>
                  <LinkIcon className="w-4 h-4" style={{ color: accentTo }} />
                </div>
                <div className="p-5 space-y-4 font-mono text-xs md:text-sm">
                  {syncLogs.map((log, idx) => (
                    <div key={idx} className="flex flex-col gap-1.5 p-3 rounded-lg border transition-all duration-500"
                      style={idx === activeLog ? { background: `${accentFrom}1a`, borderColor: `${accentFrom}4d` } : { background: 'transparent', borderColor: 'transparent', opacity: 0.5 }}>
                      <div className="flex items-center justify-between text-[10px] md:text-xs">
                        <span className="text-slate-500">[{log.time}]</span>
                        <span style={{ color: log.action === 'PUSH' ? '#c084fc' : log.action === 'PULL' ? '#60a5fa' : log.action === 'ALERT' ? '#facc15' : '#34d399' }}>
                          {log.action}
                        </span>
                      </div>
                      <p className="text-slate-300">
                        <span className="text-slate-500 mr-2">&gt;</span>
                        {log.target}: <span className="text-white">{log.payload}</span>
                      </p>
                      <p className={`text-[10px] text-right mt-1 ${log.status.includes('20') || log.status === 'Delivered' || log.status === 'Replicated' ? 'text-emerald-500' : 'text-slate-500'}`}>
                        {log.status}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── SYNC LIFECYCLE ────────────────────────────────────────── */}
          <section className="mb-20 md:mb-28">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{lcHeadline}</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">{lcSubhead}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              <div className="hidden md:block absolute top-1/2 left-10 right-10 h-0.5 -translate-y-1/2 z-0"
                style={{ backgroundImage: `linear-gradient(to right, ${accentFrom}33, ${accentTo}33)` }} />
              {lcSteps.map((step, i) => {
                const Icon = ICON_MAP[step.icon] ?? Activity;
                return (
                  <div key={i} className="bg-slate-900/80 backdrop-blur-md border border-white/10 rounded-3xl p-8 text-center relative z-10 hover:-translate-y-2 transition-transform duration-300 shadow-xl">
                    <div className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-6"
                      style={{ background: COLOR_BG_MAP[step.color] ?? 'rgba(255,255,255,0.05)', border: `1px solid ${COLOR_TEXT_MAP[step.color] ?? '#fff'}4d` }}>
                      <Icon className="w-8 h-8" style={{ color: COLOR_TEXT_MAP[step.color] }} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">Step {i + 1}: {step.title}</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">{step.desc}</p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ── SUPPORTED PLATFORMS ───────────────────────────────────── */}
          <section className="mb-20 md:mb-28">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-10 text-center">{platHeadline}</h2>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 max-w-4xl mx-auto">
              {platforms.map((platform, i) => (
                <div key={i}
                  onClick={() => handleWhatsApp(`integrating HireX with ${platform}`)}
                  className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl font-bold text-slate-300 hover:bg-white/10 hover:text-white transition-colors cursor-pointer">
                  {platform}
                </div>
              ))}
              <div onClick={() => handleWhatsApp('custom REST API documentation')}
                className="px-6 py-3 rounded-xl font-bold transition-colors cursor-pointer flex items-center gap-2"
                style={{ background: `${accentFrom}1a`, border: `1px solid ${accentFrom}4d`, color: accentFrom }}>
                <Terminal className="w-4 h-4" /> {customApiLabel}
              </div>
            </div>
          </section>

          {/* ── FIELD MAPPING ─────────────────────────────────────────── */}
          <section className="mb-20 md:mb-28">
            <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 md:p-12 overflow-hidden flex flex-col lg:flex-row items-center gap-12 shadow-2xl">
              <div className="lg:w-1/2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-6"
                  style={{ background: 'rgba(168,85,247,0.1)', border: '1px solid rgba(168,85,247,0.3)', color: '#c084fc' }}>
                  <ArrowRightLeft className="w-4 h-4" /> {fmBadge}
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">{fmHeadline}</h2>
                <p className="text-slate-400 mb-8 leading-relaxed text-base md:text-lg">{fmBody}</p>
                <ul className="space-y-4">
                  {fmMappings.map((mapping, i) => (
                    <li key={i} className="flex items-center justify-between text-sm bg-black/30 p-3 rounded-lg border border-white/5">
                      <span className="font-mono" style={{ color: accentFrom }}>{mapping.from}</span>
                      <ArrowRight className="w-4 h-4 text-slate-600" />
                      <span className="font-mono" style={{ color: accentTo }}>{mapping.to}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="lg:w-1/2 w-full flex justify-center">
                <div className="relative w-full max-w-sm aspect-square">
                  <div className="absolute inset-0 rounded-full blur-[80px]"
                    style={{ backgroundImage: `linear-gradient(to top right, ${accentFrom}33, ${accentTo}33)` }} />
                  <div className="w-full h-full bg-[#0b0f1f] border border-white/10 rounded-3xl shadow-2xl p-6 relative z-10 flex flex-col justify-center">
                    <div className="space-y-3">
                      <div className="h-4 w-3/4 bg-slate-800 rounded animate-pulse" />
                      <div className="h-4 w-1/2 bg-slate-800 rounded animate-pulse" />
                      <div className="h-10 w-full bg-slate-800 rounded-lg mt-4 flex items-center px-4"
                        style={{ border: `1px solid ${accentTo}4d` }}>
                        <span className="text-xs font-bold font-mono" style={{ color: accentTo }}>{fmSuccessLabel}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ── RELIABILITY ───────────────────────────────────────────── */}
          <section className="mb-20 md:mb-28">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{relHeadline}</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">{relSubhead}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relFeatures.map((feat, i) => {
                const Icon = ICON_MAP[feat.icon] ?? Activity;
                return (
                  <div key={i} className="bg-slate-900/40 border border-white/5 rounded-3xl p-6 hover:bg-slate-900/60 transition-colors">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                      style={{ background: COLOR_BG_MAP[feat.color] ?? 'rgba(255,255,255,0.05)', border: `1px solid ${COLOR_TEXT_MAP[feat.color] ?? '#fff'}33` }}>
                      <Icon className="w-6 h-6" style={{ color: COLOR_TEXT_MAP[feat.color] }} />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">{feat.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{feat.desc}</p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ── SOCIAL PROOF ──────────────────────────────────────────── */}
          <section className="mb-20 md:mb-28">
            <div className="rounded-[2rem] p-8 md:p-12 text-center shadow-2xl relative overflow-hidden"
              style={{ background: `linear-gradient(to right, ${accentFrom}1a, #0f172a)`, border: `1px solid ${accentFrom}33` }}>
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none" />
              <div className="flex justify-center gap-1 mb-6 text-yellow-400">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 leading-tight max-w-3xl mx-auto">{quote}</h2>
              <div className="flex items-center justify-center gap-3">
                <div className="w-10 h-10 bg-slate-800 rounded-full border border-white/10 flex items-center justify-center font-bold text-sm">{authorInitials}</div>
                <div className="text-left">
                  <h4 className="text-sm font-bold text-white">{authorName}</h4>
                  <p className="text-[10px] text-slate-400 uppercase tracking-wider">{authorTitle}</p>
                </div>
              </div>
            </div>
          </section>

          {/* ── CTA ───────────────────────────────────────────────────── */}
          <div className="max-w-5xl mx-auto p-8 md:p-12 rounded-[2rem] md:rounded-[3rem] flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden"
            style={{ backgroundImage: `linear-gradient(to bottom right, ${accentFrom}1a, #0f172a)`, border: `1px solid ${accentFrom}33` }}>
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none" />
            <div className="relative z-10 text-center md:text-left">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4"
                style={{ background: `${accentFrom}1a`, border: `1px solid ${accentFrom}4d` }}>
                <ShieldCheck className="w-6 h-6" style={{ color: accentFrom }} />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-2">{ctaHeadline}</h3>
              <p className="text-slate-400 text-sm md:text-base max-w-md">{ctaBody}</p>
            </div>
            <div className="relative z-10 flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <button
                onClick={() => handleWhatsApp('generating API Keys for my Enterprise ATS')}
                className="px-8 py-4 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 hover:-translate-y-1"
                style={{ background: accentFrom, boxShadow: `0 0 20px ${accentFrom}4d` }}>
                {ctaPrimaryLabel} <Zap className="w-4 h-4" />
              </button>
              <Link href={ctaSecondHref}
                className="px-8 py-4 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 hover:-translate-y-1">
                {ctaSecondLabel} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>
      </div>
      <Footer />
    </main>
  );
}