// app/freelancex/features/page.tsx

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Brain, Shield, Zap, Users, Code2, Globe,
  ArrowRight, CheckCircle2, Cpu, BarChart3,
  Activity, ShieldCheck, Database, Fingerprint,
  Layers, Lock, Workflow, Rocket, Star, Layout
} from 'lucide-react';
import Link from 'next/link';
import HomeNavbar from '@/components/freelancex/layout/HomeNavbar';
import Footer from '@/components/freelancex/landing/Footer';
import { usePageContent } from '@/hooks/usePageContent';

// ── Helpers ───────────────────────────────────────────────────────────────────

function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

// ── Icon registry ─────────────────────────────────────────────────────────────

const ICON_MAP: Record<string, React.ElementType> = {
  Brain, Shield, Zap, Users, Code2, Globe, Cpu, BarChart3,
  Activity, ShieldCheck, Database, Fingerprint, Layers,
  Lock, Workflow, Rocket, Star, Layout, ArrowRight, CheckCircle2,
};

function resolveIcon(name: string): React.ElementType {
  return ICON_MAP[name] ?? Cpu;
}

// ── Default fallbacks ─────────────────────────────────────────────────────────

const DEFAULT_STATS = [
  { label: 'Talent Vetted',   value: '31k+',  icon: 'Fingerprint', color: 'text-blue-400'   },
  { label: 'Deployment Time', value: '<24h',  icon: 'Zap',         color: 'text-amber-400'  },
  { label: 'Success Rate',    value: '99.8%', icon: 'Activity',    color: 'text-emerald-400' },
  { label: 'Global Nodes',    value: '12',    icon: 'Globe',       color: 'text-purple-400' },
];

const DEFAULT_CORE_FEATURES = [
  { icon: 'Brain',    title: 'Neural AI Vetting',      desc: 'Every freelancer passes a rigorous live coding audit conducted by proprietary AI agents.',    color: 'from-indigo-500 to-blue-500'  },
  { icon: 'Shield',   title: 'Smart Contract Escrow',  desc: 'Payments are secured in escrow and released only when project milestones are verified.',      color: 'from-emerald-500 to-teal-500' },
  { icon: 'Zap',      title: 'Instant Onboarding',     desc: 'Deploy verified developers to your stack in under 24 hours with pre-signed NDAs.',            color: 'from-amber-500 to-orange-500' },
  { icon: 'Users',    title: 'Pre-Assembled Pods',      desc: 'Hire entire autonomous teams (Dev + PM + QA) with a proven track record.',                    color: 'from-purple-500 to-pink-500'  },
  { icon: 'Globe',    title: 'Global Compliance',       desc: 'We handle international taxes, labor laws, and cross-border compliance automatically.',        color: 'from-cyan-500 to-blue-500'    },
  { icon: 'BarChart3', title: 'Real-time Analytics',   desc: 'Track sprint progress and commit history through our transparent employer dashboard.',         color: 'from-rose-500 to-red-500'     },
];

const DEFAULT_DEVZERO_CHECKLIST = [
  'Source code analysis for logic consistency',
  'Identity verification via biometric audit',
  'Milestone-based automated escrow',
  'IP protection via hardware-level encryption',
];

const DEFAULT_BENTO = [
  { key: 'distributed', title: 'Distributed State Management', desc: 'Our platform runs on distributed nodes to ensure your hiring data and communication logs are always available, even during regional network failures.', icon: 'Database',  span: 2, accent: 'blue'    },
  { key: 'workflow',    title: 'Jira/GitHub Sync',             desc: 'Native integration with your developer tools.',                                                                                                          icon: 'Workflow',  span: 1, accent: 'purple'  },
  { key: 'nda',         title: 'NDA Automation',               desc: 'Pre-signed legal safety for every gig.',                                                                                                                 icon: 'Lock',      span: 1, accent: 'indigo'  },
  { key: 'efficiency',  title: 'Efficiency Over Bidding',       desc: "We don't do race-to-the-bottom bidding. We match you with the right talent at fair market value based on neural scores.",                               icon: 'BarChart3', span: 2, accent: 'emerald' },
];

const DEFAULT_TESTIMONIALS = [
  { quote: 'The speed of onboarding was insane. We had a senior backend dev in our Slack in under 12 hours.', author: 'CTO, Nexus Systems',    logo: 'NX' },
  { quote: 'Smart contract escrow took all the risk out of international payments for us.',                   author: 'Founder, Fintech Global', logo: 'FG' },
];

// ── Component ─────────────────────────────────────────────────────────────────

export default function FeaturesPage() {
  const { get } = usePageContent('freelancex-features');

  // Hero
  const badgeText       = get('hero', 'badge_text',       'Protocol v4.0 Active');
  const headlineMain    = get('hero', 'headline_main',    'Engineering');
  const headlineAccent  = get('hero', 'headline_accent',  'High-Fidelity.');
  const bodyText        = get('hero', 'body_text',        'Discover the infrastructure powering the next generation of remote engineering.');
  const accentFrom      = get('hero', 'accent_from',      '#6366f1');
  const accentTo        = get('hero', 'accent_to',        '#8b5cf6');

  // Telemetry stats
  const statsItems = safeParse(get('telemetry', 'items_json', ''), DEFAULT_STATS);

  // Core features
  const coreFeatures = safeParse(get('core_features', 'items_json', ''), DEFAULT_CORE_FEATURES);

  // Dev-Zero
  const dzHeadlineMain   = get('devzero', 'headline_main',   'Zero-Trust');
  const dzHeadlineAccent = get('devzero', 'headline_accent', 'Engineering.');
  const dzBodyText       = get('devzero', 'body_text',       'Our "Dev-Zero" protocol ensures that you never hire based on a resume.');
  const dzChecklist      = safeParse(get('devzero', 'checklist_json', ''), DEFAULT_DEVZERO_CHECKLIST);
  const dzTerminal1      = get('devzero', 'terminal_line1',  'INITIALIZING AI_VETTING_PROTOCOL...');
  const dzTerminal2      = get('devzero', 'terminal_line2',  '> Scanning GitHub Repo: [COMPLETED]');
  const dzTerminal3      = get('devzero', 'terminal_line3',  '> Logic Integrity Check: 98.4% [PASS]');
  const dzTerminal4      = get('devzero', 'terminal_line4',  '> Pedigree Anonymization: [ACTIVE]');
  const dzTerminalResult = get('devzero', 'terminal_result', 'TALENT_NODE_IDENTIFIED: S-TIER ARCHITECT');

  // Bento
  const bentoItems = safeParse(get('bento', 'items_json', ''), DEFAULT_BENTO);

  // Testimonials
  const testimonialsHeadline = get('testimonials', 'headline',   'Proven Performance');
  const testimonials         = safeParse(get('testimonials', 'items_json', ''), DEFAULT_TESTIMONIALS);

  // CTA
  const ctaHeadline     = get('cta', 'headline',          'Ready to experience the future of work?');
  const ctaBodyText     = get('cta', 'body_text',         'Join the ecosystem today and deploy your first elite developer in under 24 hours.');
  const ctaPrimaryLabel = get('cta', 'btn_primary_label', 'Start Hiring Now');
  const ctaPrimaryHref  = get('cta', 'btn_primary_href',  '/freelancex/signup');
  const ctaSecLabel     = get('cta', 'btn_secondary_label', 'Join the Talent Node');
  const ctaSecHref      = get('cta', 'btn_secondary_href',  '/freelancer-platform');

  return (
    <>
      <HomeNavbar />
      <div className="min-h-screen bg-[#020617] text-white pt-32 pb-24 overflow-hidden selection:bg-indigo-500/30">

        {/* Background */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1200px] h-[600px] blur-[150px] rounded-full opacity-50"
            style={{ background: `${accentFrom}1a` }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">

          {/* ── HERO ──────────────────────────────────────────────────────── */}
          <div className="text-center max-w-4xl mx-auto mb-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-8"
              style={{ background: `${accentFrom}1a`, borderColor: `${accentFrom}33` }}
            >
              <Cpu size={14} style={{ color: accentFrom }} />
              <span className="text-[11px] font-black uppercase tracking-widest" style={{ color: accentFrom }}>
                {badgeText}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-8xl font-black tracking-tighter mb-8 leading-[1]"
            >
              {headlineMain} <br />
              <span
                className="text-transparent bg-clip-text"
                style={{ backgroundImage: `linear-gradient(to right, ${accentFrom}, ${accentTo})` }}
              >
                {headlineAccent}
              </span>
            </motion.h1>

            <p className="text-slate-400 text-lg md:text-xl font-medium leading-relaxed max-w-2xl mx-auto">
              {bodyText}
            </p>
          </div>

          {/* ── TELEMETRY TICKER ──────────────────────────────────────────── */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-32">
            {statsItems.map((stat: typeof DEFAULT_STATS[0], i: number) => {
              const Icon = resolveIcon(stat.icon);
              return (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.02 }}
                  className="p-6 rounded-[2rem] bg-white/[0.03] border border-white/5 backdrop-blur-xl text-center"
                >
                  <Icon className={`w-6 h-6 mx-auto mb-4 ${stat.color}`} />
                  <h4 className="text-3xl font-black mb-1">{stat.value}</h4>
                  <p className="text-[10px] uppercase font-black text-slate-500 tracking-widest">{stat.label}</p>
                </motion.div>
              );
            })}
          </div>

          {/* ── CORE CAPABILITIES GRID ────────────────────────────────────── */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
            {coreFeatures.map((feature: typeof DEFAULT_CORE_FEATURES[0], idx: number) => {
              const Icon = resolveIcon(feature.icon);
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="group relative bg-white/[0.02] border border-white/5 hover:border-indigo-500/30 rounded-3xl p-8 transition-all duration-500"
                >
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} p-[1px] mb-8 shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                    <div className="w-full h-full bg-[#0a0f1d] rounded-[15px] flex items-center justify-center">
                      <Icon className="text-white w-6 h-6" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4 tracking-tight group-hover:text-indigo-300 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed font-medium">{feature.desc}</p>
                </motion.div>
              );
            })}
          </div>

          {/* ── DEV-ZERO PROTOCOL ─────────────────────────────────────────── */}
          <div className="bg-gradient-to-br from-indigo-900/20 to-slate-900/50 border border-indigo-500/20 rounded-[3rem] p-8 md:p-16 mb-32 relative overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl md:text-5xl font-black leading-tight">
                  {dzHeadlineMain} <br />
                  <span style={{ color: accentFrom }}>{dzHeadlineAccent}</span>
                </h2>
                <p className="text-slate-400 text-lg leading-relaxed">{dzBodyText}</p>
                <ul className="space-y-4">
                  {dzChecklist.map((item: string, i: number) => (
                    <li key={i} className="flex items-center gap-3 text-slate-300 text-sm font-bold">
                      <ShieldCheck className="text-emerald-500 w-5 h-5 shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative group">
                <div className="absolute -inset-1 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000"
                  style={{ backgroundImage: `linear-gradient(to right, ${accentFrom}, ${accentTo})` }} />
                <div className="relative bg-[#020617] border border-white/10 rounded-2xl p-6 shadow-2xl">
                  <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500" />
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                    </div>
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Security_Audit.log</span>
                  </div>
                  <div className="font-mono text-xs md:text-sm space-y-4 text-slate-300">
                    <p className="text-emerald-400">{dzTerminal1}</p>
                    <p><span style={{ color: accentFrom }}>{dzTerminal2}</span></p>
                    <p><span style={{ color: accentFrom }}>{dzTerminal3}</span></p>
                    <p><span style={{ color: accentFrom }}>{dzTerminal4}</span></p>
                    <p className="animate-pulse pt-4" style={{ color: accentTo }}>{dzTerminalResult}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── BENTO INFRASTRUCTURE GRID ─────────────────────────────────── */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-32">
            {bentoItems.map((item: typeof DEFAULT_BENTO[0], i: number) => {
              const Icon = resolveIcon(item.icon);
              const isNDA   = item.key === 'nda';
              const isEff   = item.key === 'efficiency';
              const colSpan = item.span === 2 ? 'md:col-span-2' : '';

              if (isNDA) return (
                <div key={i} className="bg-indigo-600 rounded-3xl p-8 flex flex-col justify-between group cursor-pointer overflow-hidden relative">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-2xl rounded-full -translate-y-1/2 translate-x-1/2" />
                  <Icon className="w-10 h-10 text-white mb-6" />
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-indigo-100 text-sm">{item.desc}</p>
                  </div>
                </div>
              );

              if (isEff) return (
                <div key={i} className={`${colSpan} bg-emerald-500/5 border border-emerald-500/10 rounded-3xl p-8 flex items-center gap-8`}>
                  <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center border border-emerald-500/20 shrink-0">
                    <Icon className="w-8 h-8 text-emerald-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              );

              return (
                <div key={i} className={`${colSpan} bg-white/[0.02] border border-white/5 rounded-3xl p-8 hover:bg-white/[0.04] transition-all`}>
                  <Icon className="w-10 h-10 text-blue-400 mb-6" />
                  <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>

          {/* ── TESTIMONIALS ─────────────────────────────────────────────── */}
          <div className="mb-32">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-4xl font-bold">{testimonialsHeadline}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {testimonials.map((t: typeof DEFAULT_TESTIMONIALS[0], i: number) => (
                <div key={i} className="p-8 rounded-3xl bg-white/[0.01] border border-white/5 italic text-slate-300 relative">
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-[#020617] flex items-center justify-center font-black text-xs border border-white/10 rounded-xl" style={{ color: accentFrom }}>
                    {t.logo}
                  </div>
                  "{t.quote}"
                  <div className="mt-6 not-italic font-bold text-white text-sm">— {t.author}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── CTA ───────────────────────────────────────────────────────── */}
          <div className="text-center max-w-2xl mx-auto">
            <motion.h2
              whileInView={{ opacity: 1, scale: 1 }} initial={{ opacity: 0, scale: 0.9 }}
              className="text-4xl font-black text-white mb-6"
            >
              {ctaHeadline}
            </motion.h2>
            <p className="text-slate-400 mb-10 text-lg">{ctaBodyText}</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href={ctaPrimaryHref}
                className="w-full sm:w-auto px-10 py-5 bg-white text-black font-black text-sm uppercase tracking-[0.2em] rounded-2xl hover:bg-gray-200 hover:scale-105 transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)] flex items-center justify-center gap-2"
              >
                {ctaPrimaryLabel} <ArrowRight size={18} />
              </Link>
              <Link
                href={ctaSecHref}
                className="w-full sm:w-auto px-10 py-5 bg-white/5 text-white border border-white/10 font-black text-sm uppercase tracking-[0.2em] rounded-2xl hover:bg-white/10 transition-all flex items-center justify-center gap-2"
              >
                {ctaSecLabel}
              </Link>
            </div>
          </div>

        </div>
      </div>
      <Footer />
    </>
  );
}