// app/hirex/talent-nodes/page.tsx

'use client';

import React, { useState } from 'react';
import Navbar from '@/components/hirex/layout/Navbar';
import Footer from '@/components/hirex/home/Footer';
import {
  Network, Users, Zap, Globe, Cpu, Database,
  Layers, Code2, BrainCircuit, Activity,
  ArrowUpRight, Share2, Server,
  GitBranch, CheckCircle2, ShieldCheck, Blocks,
  MessageSquare, Building2,
} from 'lucide-react';
import { usePageContent } from '@/hooks/usePageContent';

// ── Icon maps ─────────────────────────────────────────────────────────────────
const ICON_MAP: Record<string, React.ElementType> = {
  Users, Share2, Activity, Globe, Code2, Server, BrainCircuit, Layers,
  GitBranch, CheckCircle2, Blocks, Zap, ShieldCheck, Building2, Database, Network,
};

// ── Types ─────────────────────────────────────────────────────────────────────
interface HeroStat          { title: string; value: string; icon: string; color: string }
interface VerificationStep  { title: string; desc: string; icon: string; color: string }
interface TalentCluster     { id: string; name: string; tech: string[]; activeDevs: string; avgLogic: string; status: string; icon: string; color: string; bg: string; border: string }
interface ZeroNoiseFeature  { icon: string; color: string; label: string }
interface EmergingCluster   { name: string; tech: string; color: string; bg: string }
interface TrustLogo         { name: string; icon: string; color: string }

function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

const COLOR_TEXT_MAP: Record<string, string> = {
  blue: '#60a5fa', cyan: '#22d3ee', emerald: '#34d399',
  purple: '#c084fc', pink: '#f472b6', indigo: '#818cf8', orange: '#fb923c', yellow: '#facc15',
};
const COLOR_BG_MAP: Record<string, string> = {
  blue: 'rgba(59,130,246,0.1)', cyan: 'rgba(34,211,238,0.1)', emerald: 'rgba(16,185,129,0.1)',
  purple: 'rgba(168,85,247,0.1)', pink: 'rgba(244,114,182,0.1)', indigo: 'rgba(129,140,248,0.1)', orange: 'rgba(251,146,60,0.1)',
};

// ── Default fallback JSON ─────────────────────────────────────────────────────
const DEFAULT_STATS               = JSON.stringify([{ title: 'Total Verified Nodes', value: '31.2k', icon: 'Users', color: 'text-blue-400' }]);
const DEFAULT_VERIFICATION_STEPS  = JSON.stringify([{ title: 'Skill Ingestion', desc: 'AI scans GitHub.', icon: 'GitBranch', color: 'blue' }]);
const DEFAULT_CLUSTERS            = JSON.stringify([{ id: 'node-frontend-core', name: 'Frontend UI/UX Core', tech: ['React.js', 'Next.js'], activeDevs: '12.4k', avgLogic: '86%', status: 'Highly Active', icon: 'Code2', color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/30' }]);
const DEFAULT_ZERO_NOISE          = JSON.stringify([{ icon: 'CheckCircle2', color: 'blue', label: 'Pre-evaluated System Design capabilities' }]);
const DEFAULT_EMERGING            = JSON.stringify([{ name: 'Spatial Computing', tech: 'VisionOS, Unity', color: 'text-pink-400', bg: 'bg-pink-500/10' }]);
const DEFAULT_TRUST_LOGOS         = JSON.stringify([{ name: 'TechFlow', icon: 'Zap', color: 'text-blue-400' }]);

export default function TalentNodesPage() {
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const { get } = usePageContent('hirex-talent-nodes');

  // ── CMS values ───────────────────────────────────────────────────────────
  const badgeText        = get('hero', 'badge_text',      'Distributed Talent Clusters');
  const headlinePlain    = get('hero', 'headline_plain',  'Global');
  const headlineAccent   = get('hero', 'headline_accent', 'Talent Nodes');
  const heroBody         = get('hero', 'body_text',       'Access hyper-verified candidate clusters mapped by artificial intelligence.');
  const accentFrom       = get('hero', 'accent_from',     '#22d3ee');
  const accentTo         = get('hero', 'accent_to',       '#3b82f6');
  const heroStats        = safeParse<HeroStat[]>(get('hero', 'stats_json', DEFAULT_STATS), []);

  const verifHeadline    = get('verification', 'headline',   'The Verification Protocol');
  const verifSubhead     = get('verification', 'subheading', 'How raw talent is filtered, tested, and mapped to a specialized node.');
  const verifSteps       = safeParse<VerificationStep[]>(get('verification', 'steps_json', DEFAULT_VERIFICATION_STEPS), []);

  const nodesHeadline    = get('active_nodes', 'headline',      'Active Infrastructure Nodes');
  const nodesSubhead     = get('active_nodes', 'subheading',    'Tap into pre-vetted, production-ready engineering clusters.');
  const talentClusters   = safeParse<TalentCluster[]>(get('active_nodes', 'clusters_json', DEFAULT_CLUSTERS), []);
  const waNumber         = get('active_nodes', 'whatsapp_number', '918700236923');

  const znBadge          = get('zero_noise', 'badge_text',        'Enterprise Grade');
  const znHeadline       = get('zero_noise', 'headline',          'Zero-Noise Sourcing. Pure Technical Signal.');
  const znBody           = get('zero_noise', 'body_text',         'Every candidate inside a Talent Node has already passed our grueling autonomous evaluations.');
  const znImageUrl       = get('zero_noise', 'image_url',         'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop');
  const znStatLabel      = get('zero_noise', 'signal_stat_label', 'Signal-to-Noise Ratio');
  const znStatValue      = get('zero_noise', 'signal_stat_value', '99.8%');
  const znFeatures       = safeParse<ZeroNoiseFeature[]>(get('zero_noise', 'features_json', DEFAULT_ZERO_NOISE), []);

  const emergingHeadline = get('emerging', 'headline',    'Initializing Next-Gen Nodes');
  const emergingSubhead  = get('emerging', 'subheading',  'Our AI is currently mapping talent in emerging technology sectors.');
  const emergingClusters = safeParse<EmergingCluster[]>(get('emerging', 'clusters_json', DEFAULT_EMERGING), []);

  const trustHeadline    = get('trust', 'headline',     'Powering pipelines for industry leaders');
  const trustLogos       = safeParse<TrustLogo[]>(get('trust', 'logos_json', DEFAULT_TRUST_LOGOS), []);

  const ctaPlain         = get('cta', 'headline_plain',  'Deploy a');
  const ctaAccent        = get('cta', 'headline_accent', 'Custom Node');
  const ctaBody          = get('cta', 'body_text',       'Need a specialized team? Define your exact tech stack, seniority, and grading rubrics.');
  const ctaBtnLabel      = get('cta', 'btn_label',       'Request via WhatsApp');
  const ctaWaNumber      = get('cta', 'whatsapp_number', '918700236923');

  const handleRequestNode = (nodeName: string) => {
    const text = encodeURIComponent(`Hi, I'm interested in syncing our enterprise pipeline with the *${nodeName}* talent node on HireX.`);
    window.open(`https://wa.me/${waNumber}?text=${text}`, '_blank');
  };

  return (
    <main className="min-h-screen relative overflow-hidden bg-[#020617] text-white selection:bg-cyan-500/30 font-sans">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-full md:w-[900px] h-[500px] md:h-[900px] blur-[150px] rounded-full translate-x-1/4 -translate-y-1/4"
          style={{ background: `${accentFrom}1a` }} />
        <div className="absolute bottom-0 left-0 w-full md:w-[700px] h-[400px] md:h-[700px] blur-[150px] rounded-full -translate-x-1/4 translate-y-1/4"
          style={{ background: `${accentTo}1a` }} />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
      </div>

      <Navbar />

      <div className="relative z-10 pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* ── HERO ──────────────────────────────────────────────────── */}
          <div className="max-w-4xl mx-auto text-center mb-16 md:mb-24">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono uppercase tracking-widest mb-6"
              style={{ background: `${accentFrom}1a`, border: `1px solid ${accentFrom}4d`, color: accentFrom }}>
              <Network className="w-4 h-4 animate-pulse" /> {badgeText}
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight mb-6 leading-tight">
              {headlinePlain}{' '}
              <span className="text-transparent bg-clip-text"
                style={{ backgroundImage: `linear-gradient(to right, ${accentFrom}, ${accentTo})` }}>
                {headlineAccent}
              </span>
            </h1>
            <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto">{heroBody}</p>
          </div>

          {/* ── STATS ─────────────────────────────────────────────────── */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-20 md:mb-28">
            {heroStats.map((stat, i) => {
              const Icon = ICON_MAP[stat.icon] ?? Activity;
              return (
                <div key={i} className="bg-slate-900/60 backdrop-blur-xl border border-white/10 p-5 md:p-6 rounded-2xl md:rounded-[2rem] flex flex-col items-center justify-center text-center transition-transform hover:-translate-y-1">
                  <Icon className={`w-6 h-6 md:w-8 md:h-8 ${stat.color} mb-3`} />
                  <h3 className="text-2xl md:text-3xl font-black text-white">{stat.value}</h3>
                  <p className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-slate-500 mt-1">{stat.title}</p>
                </div>
              );
            })}
          </div>

          {/* ── VERIFICATION PROTOCOL ─────────────────────────────────── */}
          <section className="mb-20 md:mb-28">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{verifHeadline}</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">{verifSubhead}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              <div className="hidden md:block absolute top-1/2 left-10 right-10 h-0.5 -translate-y-1/2 z-0"
                style={{ backgroundImage: `linear-gradient(to right, ${accentFrom}33, ${accentTo}33)` }} />
              {verifSteps.map((step, i) => {
                const Icon = ICON_MAP[step.icon] ?? Activity;
                return (
                  <div key={i} className="bg-slate-900/80 backdrop-blur-md border border-white/10 rounded-3xl p-8 text-center relative z-10 hover:-translate-y-2 transition-transform duration-300">
                    <div className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-6"
                      style={{ background: COLOR_BG_MAP[step.color] ?? 'rgba(255,255,255,0.05)', border: `1px solid ${COLOR_TEXT_MAP[step.color] ?? '#fff'}4d` }}>
                      <Icon className="w-8 h-8" style={{ color: COLOR_TEXT_MAP[step.color] }} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">Step 0{i + 1}: {step.title}</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">{step.desc}</p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ── ACTIVE NODES ──────────────────────────────────────────── */}
          <div className="mb-20 md:mb-28">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
              <div>
                <h2 className="text-2xl md:text-4xl font-bold text-white mb-2 flex items-center gap-3">
                  <Database className="w-6 h-6 md:w-8 md:h-8" style={{ color: accentFrom }} /> {nodesHeadline}
                </h2>
                <p className="text-slate-400 text-sm md:text-base">{nodesSubhead}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
              {talentClusters.map(node => {
                const Icon = ICON_MAP[node.icon] ?? Code2;
                const isActive = activeNode === node.id;
                const nodeColor = node.color.replace('text-', '').replace('-400', '');
                return (
                  <div key={node.id}
                    onMouseEnter={() => setActiveNode(node.id)}
                    onMouseLeave={() => setActiveNode(null)}
                    className="group relative bg-slate-900/40 backdrop-blur-2xl border border-white/10 p-6 md:p-8 rounded-[2rem] transition-all duration-300 hover:-translate-y-1 hover:border-white/20 cursor-pointer overflow-hidden">
                    <div className={`absolute top-0 right-0 w-48 h-48 blur-[80px] rounded-full transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0'}`}
                      style={{ background: COLOR_BG_MAP[nodeColor] ?? 'rgba(255,255,255,0.05)' }} />
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-8 relative z-10">
                      <div className="flex items-center gap-4">
                        <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center shrink-0 ${node.bg} ${node.border} border`}>
                          <Icon className={`w-7 h-7 md:w-8 md:h-8 ${node.color}`} />
                        </div>
                        <div>
                          <h3 className="text-xl md:text-2xl font-bold text-white">{node.name}</h3>
                          <div className="flex items-center gap-2 mt-1.5">
                            <span className="relative flex h-2 w-2">
                              {node.status === 'Surging Demand' && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />}
                              <span className={`relative inline-flex rounded-full h-2 w-2 ${node.status === 'Stable' ? 'bg-emerald-500' : node.status === 'Surging Demand' ? 'bg-orange-500' : 'bg-blue-500'}`} />
                            </span>
                            <span className="text-[10px] md:text-xs font-mono text-slate-400 uppercase tracking-wider">{node.status}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        <div className="bg-black/40 border border-white/5 px-3 md:px-4 py-2 md:py-3 rounded-xl text-center">
                          <p className="text-[9px] uppercase font-bold text-slate-500 tracking-wider mb-0.5">Devs</p>
                          <p className="text-sm md:text-base font-black text-white">{node.activeDevs}</p>
                        </div>
                        <div className="bg-black/40 border border-white/5 px-3 md:px-4 py-2 md:py-3 rounded-xl text-center">
                          <p className="text-[9px] uppercase font-bold text-slate-500 tracking-wider mb-0.5">AI Avg</p>
                          <p className={`text-sm md:text-base font-black ${node.color}`}>{node.avgLogic}</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4 relative z-10">
                      <p className="text-[10px] md:text-xs uppercase font-bold text-slate-500 tracking-wider">Indexed Technologies</p>
                      <div className="flex flex-wrap gap-2">
                        {node.tech.map(t => (
                          <span key={t} className="px-3 py-1.5 bg-white/[0.03] border border-white/10 text-slate-300 text-[11px] md:text-xs font-medium rounded-lg group-hover:bg-white/[0.08] transition-colors">{t}</span>
                        ))}
                      </div>
                    </div>
                    <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
                      <span className="text-xs font-medium text-slate-500">Node ID: {node.id}</span>
                      <button onClick={() => handleRequestNode(node.name)}
                        className={`w-full sm:w-auto inline-flex justify-center items-center gap-2 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-sm font-bold ${node.color} hover:text-white transition-all`}>
                        Sync Pipeline <ArrowUpRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── ZERO NOISE ────────────────────────────────────────────── */}
          <section className="mb-20 md:mb-28">
            <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 md:p-12 overflow-hidden flex flex-col lg:flex-row items-center gap-12 shadow-2xl">
              <div className="lg:w-1/2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-6"
                  style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', color: '#34d399' }}>
                  <ShieldCheck className="w-4 h-4" /> {znBadge}
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">{znHeadline}</h2>
                <p className="text-slate-400 mb-8 leading-relaxed text-base md:text-lg">{znBody}</p>
                <ul className="space-y-5">
                  {znFeatures.map((feat, i) => {
                    const Icon = ICON_MAP[feat.icon] ?? CheckCircle2;
                    return (
                      <li key={i} className="flex items-center gap-4 text-slate-300 font-medium">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                          style={{ background: COLOR_BG_MAP[feat.color] ?? 'rgba(255,255,255,0.05)' }}>
                          <Icon className="w-4 h-4" style={{ color: COLOR_TEXT_MAP[feat.color] }} />
                        </div>
                        {feat.label}
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="lg:w-1/2 w-full">
                <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden border border-white/10 group shadow-[0_0_40px_rgba(0,0,0,0.5)]">
                  <img src={znImageUrl} alt="Zero Noise Sourcing" className="w-full h-full object-cover grayscale-[40%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
                  <div className="absolute bottom-6 left-6 z-20 bg-black/60 backdrop-blur-md border border-white/10 p-4 rounded-2xl">
                    <p className="text-[10px] font-mono uppercase tracking-wider mb-1" style={{ color: accentFrom }}>{znStatLabel}</p>
                    <p className="text-2xl font-black text-white">{znStatValue}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ── EMERGING CLUSTERS ─────────────────────────────────────── */}
          <section className="mb-20 md:mb-28">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{emergingHeadline}</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">{emergingSubhead}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {emergingClusters.map((cluster, i) => (
                <div key={i} className="bg-slate-900/40 border border-white/5 p-6 md:p-8 rounded-3xl text-center relative overflow-hidden group">
                  <div className="absolute top-4 right-4 flex items-center gap-1.5">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-slate-500" />
                    </span>
                    <span className="text-[9px] text-slate-500 font-mono uppercase tracking-widest">Syncing</span>
                  </div>
                  <div className={`w-14 h-14 mx-auto rounded-full ${cluster.bg} flex items-center justify-center mb-6`}>
                    <Activity className={`w-6 h-6 ${cluster.color}`} />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{cluster.name}</h3>
                  <p className="text-xs text-slate-400 font-mono bg-black/30 py-2 rounded-lg border border-white/5">{cluster.tech}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── TRUST ─────────────────────────────────────────────────── */}
          <section className="mb-20 md:mb-28 text-center">
            <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-8">{trustHeadline}</p>
            <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-16 opacity-50 grayscale">
              {trustLogos.map((logo, i) => {
                const Icon = ICON_MAP[logo.icon] ?? Zap;
                return (
                  <div key={i} className="flex items-center gap-2 font-black text-xl text-white">
                    <Icon className={logo.color} /> {logo.name}
                  </div>
                );
              })}
            </div>
          </section>

          {/* ── CTA ───────────────────────────────────────────────────── */}
          <section>
            <div className="border rounded-[2.5rem] p-8 md:p-16 text-center shadow-[0_0_50px_rgba(34,211,238,0.15)] relative overflow-hidden"
              style={{ backgroundImage: `linear-gradient(to right, ${accentFrom}1a, ${accentTo}1a)`, borderColor: `${accentFrom}4d` }}>
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none" />
              <div className="relative z-10 max-w-3xl mx-auto">
                <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8"
                  style={{ background: `${accentFrom}33`, border: `1px solid ${accentFrom}66`, boxShadow: `0 0 30px ${accentFrom}4d` }}>
                  <Cpu className="w-10 h-10" style={{ color: accentFrom }} />
                </div>
                <h2 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">
                  {ctaPlain}{' '}
                  <span className="text-transparent bg-clip-text"
                    style={{ backgroundImage: `linear-gradient(to right, ${accentFrom}, ${accentTo})` }}>
                    {ctaAccent}
                  </span>
                </h2>
                <p className="text-slate-300 text-base md:text-lg mb-10 leading-relaxed">{ctaBody}</p>
                <button
                  onClick={() => { const text = encodeURIComponent(`Hi, I want to deploy a Custom Node on HireX.`); window.open(`https://wa.me/${ctaWaNumber}?text=${text}`, '_blank'); }}
                  className="px-8 py-4 text-white font-black rounded-2xl transition-all flex items-center justify-center gap-3 hover:-translate-y-1 mx-auto"
                  style={{ background: accentFrom, boxShadow: `0 0 20px ${accentFrom}66` }}>
                  <MessageSquare className="w-5 h-5" /> {ctaBtnLabel}
                </button>
              </div>
            </div>
          </section>

        </div>
      </div>
      <Footer />
    </main>
  );
}