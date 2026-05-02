// app/industry/legal/page.tsx
'use client';

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import ExecutionFlow from '@/components/sections/ExecutionFlow';
import SuccessStories from '@/components/sections/SuccessStories';
import { usePageContent } from '@/hooks/usePageContent';
import {
  Scale, FileSearch, ShieldCheck, Gavel, History, Zap, ArrowRight,
  Lock, SearchCode,
} from 'lucide-react';

// ── Icon map ──────────────────────────────────────────────────────────────────
const ICON_MAP: Record<string, React.ElementType> = {
  FileSearch, SearchCode, History, Lock, ShieldCheck, Zap, Gavel, Scale,
};

// ── Types ─────────────────────────────────────────────────────────────────────
interface KPI     { label: string; value: string; detail: string }
interface Feature { title: string; desc: string; icon: string }
interface Badge   { icon: string; label: string }

function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

// ── Defaults ──────────────────────────────────────────────────────────────────
const DEFAULT_KPIS = JSON.stringify([
  { label: 'Review Velocity',   value: '1,000+',    detail: 'Pages per Minute'         },
  { label: 'Anomaly Detection', value: '99.2%',     detail: 'Clause Variance Accuracy' },
  { label: 'Risk Mitigation',   value: '40%',       detail: 'Reduction in Legal Spend' },
  { label: 'Compliance Drift',  value: 'Real-time', detail: 'Global Regulatory Sync'   },
]);
const DEFAULT_FEATURES = JSON.stringify([
  { title: 'Cognitive Due Diligence', desc: 'Analyzing thousands of M&A documents in hours. Identifying change-of-control clauses and exposure with superhuman precision.', icon: 'FileSearch'  },
  { title: 'Smart CLM Automation',    desc: "Automated contract drafting and redlining based on your firm's historical 'Gold Standard' and risk appetite.",                  icon: 'SearchCode'  },
  { title: 'Regulatory Horizon',      desc: 'AI engines that track global law changes in real-time, automatically flagging internal policies that require updates.',          icon: 'History'     },
]);
const DEFAULT_BADGES = JSON.stringify([
  { icon: 'Lock',        label: 'On-Premise / Air-Gapped Deployment' },
  { icon: 'ShieldCheck', label: 'Privileged Data Isolation'           },
]);

export default function LegalAIPage() {
  const { get } = usePageContent('industry-legal');

  // ── CMS values ─────────────────────────────────────────────────────────────
  const badgeText       = get('hero', 'badge_text',       'Enterprise Legal Intelligence');
  const headlinePlain   = get('hero', 'headline_plain',   'JURIS');
  const headlineAccent  = get('hero', 'headline_accent',  'ALGORITHM');
  const heroBody        = get('hero', 'body_text',        'Transform legal from a bottleneck into a competitive advantage.');
  const ctaLabel        = get('hero', 'cta_label',        'Initialize Legal Audit');
  const accentColor     = get('hero', 'accent_color',     '#d97706');
  const kpis            = safeParse<KPI[]>(get('hero', 'kpis_json', DEFAULT_KPIS), []);

  const features        = safeParse<Feature[]>(get('features', 'items_json', DEFAULT_FEATURES), []);

  const zaHeadline      = get('zero_ambiguity', 'headline',        'Zero Ambiguity');
  const zaBody          = get('zero_ambiguity', 'body_text',       '');
  const badges          = safeParse<Badge[]>(get('zero_ambiguity', 'badges_json', DEFAULT_BADGES), []);
  const riskExposure    = get('zero_ambiguity', 'risk_exposure',   'Low (0.12)');
  const tokensAnalyzed  = get('zero_ambiguity', 'tokens_analyzed', '4.2M');
  const advisoryOutput  = get('zero_ambiguity', 'advisory_output', '');

  const ctaHeadline     = get('cta', 'headline',      'Scale Your Counsel');
  const ctaBody         = get('cta', 'body_text',     'Our legal-tech architects at DLF Cyber City are engineering the future of automated trust.');
  const ctaBtnLabel     = get('cta', 'btn_label',     'SECURE YOUR FIRM');
  const ctaLocation     = get('cta', 'location_text', 'Legal AI Hub: Gurugram, India');

  return (
    <main className="flex min-h-screen flex-col bg-[#020617] text-white overflow-x-hidden">
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-slate-500/5 rounded-full blur-[140px] -z-10" />
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800 border border-slate-700 mb-8 backdrop-blur-md">
            <Scale className="w-4 h-4" style={{ color: accentColor }} />
            <span className="text-gray-300 text-xs font-bold uppercase tracking-[0.2em]">{badgeText}</span>
          </div>
          <h1 className="text-4xl md:text-7xl font-black mb-8 tracking-tighter leading-none uppercase">
            {headlinePlain} <br />
            <span className="text-transparent bg-clip-text italic"
              style={{ backgroundImage: `linear-gradient(to right, #e2e8f0, ${accentColor})` }}>
              {headlineAccent}
            </span>
          </h1>
          <p className="max-w-3xl mx-auto text-gray-400 text-lg md:text-xl leading-relaxed mb-12">{heroBody}</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto mb-16">
            {kpis.map((kpi, i) => (
              <div key={i} className="p-6 bg-slate-900/50 border border-slate-800 rounded-3xl text-left hover:border-amber-500/20 transition-all group">
                <p className="text-3xl font-black mb-1 text-white">{kpi.value}</p>
                <p className="text-[10px] uppercase font-bold tracking-widest" style={{ color: accentColor }}>{kpi.label}</p>
                <p className="text-[9px] text-gray-500 italic mt-2">{kpi.detail}</p>
              </div>
            ))}
          </div>
          <button className="px-12 py-6 rounded-2xl font-black transition-all shadow-2xl flex items-center gap-3 mx-auto text-white uppercase tracking-tighter"
            style={{ background: accentColor }}>
            {ctaLabel} <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((item, i) => {
            const Icon = ICON_MAP[item.icon] ?? Zap;
            return (
              <div key={i} className="p-10 rounded-[3rem] bg-zinc-900/40 border border-white/5 hover:border-amber-500/30 transition-all group">
                <div className="mb-6 p-4 rounded-xl inline-block transition-all group-hover:text-black"
                  style={{ background: `${accentColor}0d` }}
                  onMouseEnter={e => (e.currentTarget.style.background = accentColor)}
                  onMouseLeave={e => (e.currentTarget.style.background = `${accentColor}0d`)}>
                  <Icon className="w-8 h-8" style={{ color: accentColor }} />
                </div>
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── ZERO AMBIGUITY ───────────────────────────────────────────────── */}
      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-4xl md:text-7xl font-black mb-8 italic tracking-tighter uppercase leading-tight" style={{ color: `${accentColor}dd` }}>
              {zaHeadline}
            </h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">{zaBody}</p>
            <div className="space-y-4 mt-8">
              {badges.map((b, i) => {
                const Icon = ICON_MAP[b.icon] ?? ShieldCheck;
                return (
                  <div key={i} className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/10">
                    <Icon style={{ color: accentColor }} />
                    <span className="text-xs font-bold uppercase tracking-widest italic text-slate-200">{b.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
          {/* Terminal card */}
          <div className="relative">
            <div className="absolute -inset-10 rounded-full pointer-events-none" style={{ background: `${accentColor}08`, filter: 'blur(100px)' }} />
            <div className="relative bg-[#0a0a0a] border border-slate-700 rounded-[3rem] p-10 shadow-2xl font-mono overflow-hidden">
              <div className="flex justify-between items-center mb-8 pb-4 border-b border-white/5">
                <div className="flex items-center gap-2" style={{ color: accentColor }}>
                  <Zap className="w-4 h-4 animate-pulse" />
                  <span className="text-[10px] uppercase font-black">AI_DUE_DILIGENCE_KERNEL</span>
                </div>
                <div className="text-[10px] text-gray-500 uppercase tracking-widest">SCANNING_RETAIL_MASTER_v4</div>
              </div>
              <div className="space-y-6">
                <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                  <p className="text-[10px] text-gray-500 uppercase mb-4 italic">Semantic Clause Mapping</p>
                  <div className="space-y-3">
                    <div className="h-2 bg-slate-800 rounded-full w-full" />
                    <div className="h-2 rounded-full w-[85%] border" style={{ background: `${accentColor}66`, borderColor: `${accentColor}33` }} />
                    <div className="h-2 bg-slate-800 rounded-full w-[92%]" />
                    <div className="h-2 bg-red-500/40 rounded-full w-[60%] border border-red-500/20" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl border text-center" style={{ background: `${accentColor}0d`, borderColor: `${accentColor}33` }}>
                    <p className="text-[8px] text-gray-500 uppercase mb-1 font-bold">Risk Exposure</p>
                    <p className="text-xl font-black" style={{ color: accentColor }}>{riskExposure}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-center">
                    <p className="text-[8px] text-gray-500 uppercase mb-1 font-bold">Tokens Analyzed</p>
                    <p className="text-xl font-black italic">{tokensAnalyzed}</p>
                  </div>
                </div>
              </div>
              <div className="mt-8 p-4 bg-slate-900 rounded-xl border border-dashed border-slate-700 text-[9px]" style={{ color: `${accentColor}cc` }}>
                <p className="font-bold uppercase mb-1 tracking-widest flex items-center gap-2" style={{ color: accentColor }}>
                  <Gavel className="w-3 h-3" /> ADVISORY_OUTPUT:
                </p>
                <p className="italic leading-relaxed">{advisoryOutput}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="py-12 border-y border-white/5"><ExecutionFlow /></div>
      <SuccessStories />

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto border rounded-[4rem] p-12 md:p-24 text-center backdrop-blur-3xl relative overflow-hidden"
          style={{ background: 'linear-gradient(to bottom right, #020617, #0a0f1d)', borderColor: `${accentColor}33` }}>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-8xl font-black mb-8 italic tracking-tighter uppercase leading-tight">{ctaHeadline}</h2>
            <p className="text-gray-400 text-lg md:text-xl mb-12 max-w-2xl mx-auto">{ctaBody}</p>
            <div className="flex flex-col items-center gap-6">
              <button className="text-white px-16 py-6 rounded-2xl font-black text-2xl hover:scale-105 transition-all shadow-2xl"
                style={{ background: accentColor }}>
                {ctaBtnLabel}
              </button>
              <div className="font-mono text-sm tracking-widest uppercase italic" style={{ color: accentColor }}>{ctaLocation}</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}