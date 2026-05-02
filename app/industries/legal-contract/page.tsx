// app/industry/contract/page.tsx
'use client';

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import ExecutionFlow from '@/components/sections/ExecutionFlow';
import SuccessStories from '@/components/sections/SuccessStories';
import { usePageContent } from '@/hooks/usePageContent';
import {
  FileText, PenTool, GitMerge, RefreshCcw, FileCheck2,
  AlertCircle, ArrowRight, ShieldCheck, Target, Zap,
} from 'lucide-react';

const ICON_MAP: Record<string, React.ElementType> = {
  FileText, PenTool, GitMerge, RefreshCcw, FileCheck2, ShieldCheck, Target, Zap, AlertCircle,
};

interface Metric  { label: string; value: string; detail: string }
interface Feature { title: string; desc: string; icon: string }
interface Badge   { icon: string; label: string }

function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

const DEFAULT_METRICS = JSON.stringify([
  { label: 'Drafting Speed',     value: '85%',  detail: 'Time Reduction via AI' },
  { label: 'Obligation Capture', value: '100%', detail: 'Automated extraction'  },
  { label: 'Redline Turnaround', value: '<4h',  detail: 'Standardized SLA'      },
  { label: 'Renewal Leakage',    value: '0%',   detail: 'AI Alert System'       },
]);
const DEFAULT_FEATURES = JSON.stringify([
  { title: 'AI Playbook Redlining', desc: 'Upload your legal playbook and let our AI redline third-party paper instantly, flagging deviations from your standard risk profile.', icon: 'PenTool'    },
  { title: 'Obligation Extraction', desc: 'Automatically convert dead PDF text into actionable tasks, deadlines, and financial milestones synced with your ERP.',                icon: 'Target'     },
  { title: 'Smart Renewal Alerts',  desc: "AI that reads 'Auto-renewal' and 'Notice periods' to alert your team 90 days out, preventing unwanted multi-year lock-ins.",          icon: 'RefreshCcw' },
]);
const DEFAULT_BADGES = JSON.stringify([
  { icon: 'GitMerge',   label: 'Multi-Party Versioning' },
  { icon: 'ShieldCheck',label: 'Audit-Ready History'    },
]);

export default function ContractAIPage() {
  const { get } = usePageContent('industry-contract');

  const badgeText      = get('hero', 'badge_text',      'AI-Powered CLM Vertical');
  const headlinePlain  = get('hero', 'headline_plain',  'AUTONOMOUS');
  const headlineAccent = get('hero', 'headline_accent', 'AGREEMENTS');
  const heroBody       = get('hero', 'body_text',       'Stop losing value in the "Contract Black Hole."');
  const ctaLabel       = get('hero', 'cta_label',       'Optimize My CLM');
  const accentColor    = get('hero', 'accent_color',    '#f59e0b');
  const metrics        = safeParse<Metric[]>(get('hero', 'metrics_json', DEFAULT_METRICS), []);

  const features       = safeParse<Feature[]>(get('features', 'items_json', DEFAULT_FEATURES), []);

  const ooHeadline     = get('obligation_orchestration', 'headline',        'Obligation Orchestration');
  const ooBody         = get('obligation_orchestration', 'body_text',       '');
  const badges         = safeParse<Badge[]>(get('obligation_orchestration', 'badges_json', DEFAULT_BADGES), []);
  const riskLevel      = get('obligation_orchestration', 'risk_level',      'High Variance');
  const playbookSync   = get('obligation_orchestration', 'playbook_sync',   '82% MATCH');
  const advisoryOutput = get('obligation_orchestration', 'advisory_output', '');

  const ctaHeadline    = get('cta', 'headline',      'Master Your Commitments');
  const ctaBody        = get('cta', 'body_text',     '');
  const ctaBtnLabel    = get('cta', 'btn_label',     'Schedule Demo');
  const ctaLocation    = get('cta', 'location_text', 'Contract Hub: Gurugram, India');

  return (
    <main className="flex min-h-screen flex-col bg-[#020617] text-white overflow-x-hidden">
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full -z-10"
          style={{ background: `${accentColor}08`, filter: 'blur(120px)' }} />
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md">
            <FileText className="w-4 h-4" style={{ color: accentColor }} />
            <span className="text-xs font-bold uppercase tracking-widest italic" style={{ color: `${accentColor}cc` }}>{badgeText}</span>
          </div>
          <h1 className="text-4xl md:text-7xl font-black mb-8 tracking-tighter leading-tight uppercase">
            {headlinePlain} <br />
            <span className="text-transparent bg-clip-text italic"
              style={{ backgroundImage: `linear-gradient(to right, #fef3c7, ${accentColor}, #71717a)` }}>
              {headlineAccent}
            </span>
          </h1>
          <p className="max-w-3xl mx-auto text-gray-400 text-lg md:text-xl leading-relaxed mb-12">{heroBody}</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-16">
            {metrics.map((m, i) => (
              <div key={i} className="p-6 rounded-2xl text-left backdrop-blur-sm border"
                style={{ background: `${accentColor}08`, borderColor: `${accentColor}22` }}>
                <p className="text-2xl font-black text-white">{m.value}</p>
                <p className="text-[10px] uppercase font-bold tracking-widest" style={{ color: accentColor }}>{m.label}</p>
                <p className="text-[9px] text-gray-500 mt-1 italic">{m.detail}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-center">
            <button className="px-10 py-5 rounded-2xl font-bold transition-all shadow-xl flex items-center gap-2 text-white hover:opacity-90"
              style={{ background: accentColor }}>
              {ctaLabel} <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((item, i) => {
            const Icon = ICON_MAP[item.icon] ?? Zap;
            return (
              <div key={i} className="group p-10 rounded-[2.5rem] bg-zinc-900/40 border border-white/5 hover:border-amber-500/30 transition-all">
                <div className="mb-6 p-4 rounded-2xl inline-block transition-all"
                  style={{ background: `${accentColor}1a` }}>
                  <Icon className="w-8 h-8" style={{ color: accentColor }} />
                </div>
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed text-sm">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── OBLIGATION ORCHESTRATION ─────────────────────────────────────── */}
      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Terminal card */}
          <div className="relative">
            <div className="absolute -inset-10 rounded-full pointer-events-none"
              style={{ background: `${accentColor}06`, filter: 'blur(100px)' }} />
            <div className="relative bg-[#050401] border border-white/10 rounded-[2rem] p-8 shadow-2xl font-mono">
              <div className="flex items-center gap-2 mb-8 border-b border-white/5 pb-4">
                <FileCheck2 className="w-4 h-4 text-emerald-400" />
                <span className="text-[10px] text-gray-500 uppercase tracking-widest font-black">Contract_Analysis_Engine_v2</span>
              </div>
              <div className="mt-8 space-y-4">
                <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/20">
                  <p className="text-[9px] text-red-500 uppercase mb-2 font-black italic">! CRITICAL_DEVIATION:</p>
                  <p className="text-[11px] text-white">{advisoryOutput}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <p className="text-[8px] text-gray-500 uppercase">Risk Level</p>
                    <p className="text-xl font-bold italic uppercase" style={{ color: accentColor }}>{riskLevel}</p>
                  </div>
                  <div className="p-4 rounded-xl border text-center"
                    style={{ background: `${accentColor}08`, borderColor: `${accentColor}22` }}>
                    <p className="text-[8px] text-gray-500 uppercase">Playbook Sync</p>
                    <p className="text-xl font-bold" style={{ color: accentColor }}>{playbookSync}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-4xl md:text-6xl font-black mb-8 italic tracking-tighter uppercase leading-tight">{ooHeadline}</h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">{ooBody}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              {badges.map((b, idx) => {
                const Icon = ICON_MAP[b.icon] ?? ShieldCheck;
                return (
                  <div key={idx} className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-amber-500/30 transition-all">
                    <Icon style={{ color: accentColor }} className="shrink-0" />
                    <span className="text-xs font-bold uppercase tracking-widest">{b.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <div className="py-12 border-y border-white/5"><ExecutionFlow /></div>
      <SuccessStories />

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto border rounded-[4rem] p-12 md:p-24 text-center backdrop-blur-3xl relative overflow-hidden"
          style={{ background: 'linear-gradient(to bottom right, #1a0e00, #020617)', borderColor: `${accentColor}33` }}>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-7xl font-black mb-8 italic tracking-tighter uppercase leading-tight">{ctaHeadline}</h2>
            <p className="text-lg md:text-xl mb-12 max-w-2xl mx-auto" style={{ color: `${accentColor}bb` }}>{ctaBody}</p>
            <div className="flex flex-col items-center gap-6">
              <button className="text-white px-16 py-6 rounded-full font-black text-2xl hover:scale-110 transition-all shadow-2xl uppercase italic"
                style={{ background: accentColor }}>
                {ctaBtnLabel}
              </button>
              <div className="font-mono text-sm tracking-widest uppercase" style={{ color: accentColor }}>{ctaLocation}</div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}