// app/home/custom-llms/page.tsx
'use client';

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import {
  ShieldCheck,
  Lock,
  Database,
  Cpu,
  Zap,
  ChevronRight,
  Scale,
  Fingerprint,
  HardDrive,
  Workflow,
} from 'lucide-react';
import { usePageContent } from '@/hooks/usePageContent';

function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

// ── Types ──────────────────────────────────────────────────────────────────────
interface FeatureCard  { title: string; desc: string; icon: string }
interface SecurityItem { icon: string; text: string }
interface TableRow     { feature: string; public: string; custom: string }

// ── Icon maps ──────────────────────────────────────────────────────────────────
const FEATURE_ICON_MAP: Record<string, React.ElementType> = { HardDrive, Database, Scale };
const SECURITY_ICON_MAP: Record<string, React.ElementType> = { ShieldCheck, Fingerprint, Zap };

// ── Defaults ───────────────────────────────────────────────────────────────────
const DEFAULT_FEATURES = JSON.stringify([
  { title: 'In-House Hosting',  desc: 'Full deployment on your own AWS/Azure/GCP VPC or On-Premise H100 clusters. No external API calls, ever.', icon: 'HardDrive' },
  { title: 'Domain Knowledge', desc: "Models trained specifically on your industry's jargon, legal standards, and internal documentation.", icon: 'Database' },
  { title: 'Bias Control',     desc: "Remove the 'preachy' filters of public models. We align the LLM strictly to your corporate values and safety needs.", icon: 'Scale' },
]);
const DEFAULT_SECURITY_ITEMS = JSON.stringify([
  { icon: 'ShieldCheck', text: 'HIPAA / SOC2 / GDPR Compliant Inference' },
  { icon: 'Fingerprint', text: 'Immutable Audit Trails for Every Token' },
  { icon: 'Zap',         text: 'Sub-100ms Latency for Edge Deployment' },
]);
const DEFAULT_TABLE_ROWS = JSON.stringify([
  { feature: 'Data Privacy',      public: 'Shared/Terms-subject', custom: '100% Sovereign'       },
  { feature: 'Domain Specificity',public: 'Generalized',          custom: 'Industry Expert'      },
  { feature: 'Long-term Cost',    public: 'Variable Token Fees',  custom: 'Fixed Infra CapEx'    },
]);

export default function CustomLLMsPage() {
  const { get } = usePageContent('home-custom-llms');

  // ── Hero ─────────────────────────────────────────────────────────────────────
  const accentColor      = get('hero', 'accent_color',     '#8b5cf6');
  const badgeText        = get('hero', 'badge_text',       'Sovereign Model Infrastructure');
  const heroPl           = get('hero', 'headline_plain',   'Private');
  const heroAcc          = get('hero', 'headline_accent',  'Foundations');
  const heroBody         = get('hero', 'body_text',        'Stop leasing intelligence. Build it. We deploy Custom-Weights LLMs directly into your VPC, ensuring your proprietary data never touches a public server and your competitive advantage stays encrypted.');
  const heroBtnPrimary   = get('hero', 'btn_primary_label','Claim Your Weights');
  const heroBtnSecond    = get('hero', 'btn_secondary_label','Security Protocol');

  // ── Features ─────────────────────────────────────────────────────────────────
  const featPl           = get('features', 'headline_plain',  'Why');
  const featAcc          = get('features', 'headline_accent', 'Sovereign');
  const featureItems     = safeParse<FeatureCard[]>(get('features', 'items_json', DEFAULT_FEATURES), []);

  // ── Zero Leakage ─────────────────────────────────────────────────────────────
  const zeroHl           = get('zero_leakage', 'headline',         'Zero Leakage Architecture.');
  const zeroBody         = get('zero_leakage', 'body_text',        'We leverage Mixture-of-Experts (MoE) and Speculative Decoding to ensure your custom model isn\'t just private—it\'s faster and more cost-efficient than any commercial alternative.');
  const zeroSystemLabel  = get('zero_leakage', 'system_label',     'SOVEREIGN_CORE_v1.0');
  const zeroEncLabel     = get('zero_leakage', 'encryption_label', 'ENCRYPTION: AES-256');
  const zeroKgLabel      = get('zero_leakage', 'kg_label',         'Internal Knowledge Graph Connected');
  const zeroQuote        = get('zero_leakage', 'sample_quote',     '"I have reviewed the internal Q3 engineering reports. The discrepancy in the thermal manifold was due to..."');
  const zeroSourceLabel  = get('zero_leakage', 'source_label',     'VERIFIED_INTERNAL_SOURCE: PROJECT_ORION_DOCS.PDF');
  const securityItems    = safeParse<SecurityItem[]>(get('zero_leakage', 'security_items_json', DEFAULT_SECURITY_ITEMS), []);

  // ── Comparison Table ─────────────────────────────────────────────────────────
  const tableRows        = safeParse<TableRow[]>(get('comparison', 'rows_json', DEFAULT_TABLE_ROWS), []);
  const tablePublicLabel = get('comparison', 'col_public_label', 'Public LLMs');
  const tableCustomLabel = get('comparison', 'col_custom_label', 'Custom Foundations');

  // ── Final CTA ─────────────────────────────────────────────────────────────────
  const ctaHl            = get('cta', 'headline',          "Your Data. Your Model.");
  const ctaBody          = get('cta', 'body_text',         "Ready to take ownership? Let's architect a model that works exclusively for your enterprise.");
  const ctaBtn           = get('cta', 'btn_label',         'Initialize Build Run');
  const ctaSubLabel      = get('cta', 'sub_label',         'Private Node Cluster // Gurugram Hub');

  return (
    <main className="min-h-screen bg-[#020617] text-slate-100 overflow-x-hidden selection:bg-violet-500/30">
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-16 md:pt-52 md:pb-32 px-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,_rgba(139,92,246,0.1)_0%,_transparent_50%)] -z-10" />
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full border mb-8 backdrop-blur-xl"
            style={{ background: `${accentColor}1a`, borderColor: `${accentColor}33` }}>
            <Lock className="w-3.5 h-3.5" style={{ color: accentColor }} />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]" style={{ color: accentColor }}>{badgeText}</span>
          </div>
          <h1 className="text-6xl md:text-9xl font-black tracking-tighter leading-[0.85] uppercase mb-10">
            {heroPl} <br />
            <span className="text-transparent bg-clip-text italic"
              style={{ backgroundImage: `linear-gradient(to right, #e2e8f0, ${accentColor}, #6366f1)` }}>
              {heroAcc}
            </span>
          </h1>
          <p className="max-w-3xl text-slate-400 text-base md:text-xl leading-relaxed mb-12 font-light">{heroBody}</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all hover:scale-105 active:scale-95 shadow-2xl flex items-center justify-center gap-2"
              style={{ background: accentColor, boxShadow: `0 25px 50px ${accentColor}30` }}>
              {heroBtnPrimary} <ChevronRight className="w-4 h-4" />
            </button>
            <button className="px-10 py-5 bg-white/5 border border-white/10 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-white/10 transition-all">
              {heroBtnSecond}
            </button>
          </div>
        </div>
      </section>

      {/* ── FEATURE CARDS ────────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featureItems.map((feature, i) => {
              const Icon = FEATURE_ICON_MAP[feature.icon] ?? HardDrive;
              return (
                <div key={i} className="p-10 rounded-[3rem] bg-slate-900/40 border border-white/5 hover:border-violet-500/40 transition-all group">
                  <div className="mb-8 p-4 rounded-2xl inline-block transition-all group-hover:scale-110"
                    style={{ background: `${accentColor}0d` }}>
                    <Icon className="w-8 h-8" style={{ color: accentColor }} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── ZERO LEAKAGE ─────────────────────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-4xl md:text-7xl font-black mb-8 italic tracking-tighter uppercase leading-none text-white">
              {zeroHl.split(' ').slice(0, -1).join(' ')} <br />
              <span style={{ color: accentColor }}>{zeroHl.split(' ').at(-1)}</span>
            </h2>
            <p className="text-slate-400 text-lg mb-8 leading-relaxed font-light">{zeroBody}</p>
            <div className="space-y-4 mt-8">
              {securityItems.map((item, idx) => {
                const Icon = SECURITY_ICON_MAP[item.icon] ?? ShieldCheck;
                return (
                  <div key={idx} className="flex items-center gap-4 p-5 rounded-2xl bg-slate-900/50 border border-white/5 hover:bg-violet-950/30 transition-all">
                    <Icon style={{ color: accentColor }} />
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-200">{item.text}</span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-10 blur-[120px] rounded-full animate-pulse"
              style={{ background: `${accentColor}1a` }} />
            <div className="relative bg-black/60 border rounded-[3rem] p-8 md:p-12 shadow-2xl font-mono"
              style={{ borderColor: `${accentColor}33` }}>
              <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4">
                <div className="flex items-center gap-2 font-black italic text-[10px]" style={{ color: accentColor }}>
                  <Cpu className="w-4 h-4" /> {zeroSystemLabel}
                </div>
                <div className="text-[10px] text-slate-500">{zeroEncLabel}</div>
              </div>
              <div className="space-y-6">
                <div className="p-6 rounded-2xl" style={{ background: `${accentColor}0d`, border: `1px solid ${accentColor}33` }}>
                  <p className="text-[10px] uppercase font-black mb-4 tracking-tighter italic underline" style={{ color: accentColor }}>
                    {zeroKgLabel}
                  </p>
                  <div className="space-y-2 opacity-80">
                    <div className="h-1 rounded w-full" style={{ background: `${accentColor}66` }} />
                    <div className="h-1 rounded w-[85%]" style={{ background: `${accentColor}66` }} />
                    <div className="h-1 rounded w-[95%]" style={{ background: `${accentColor}66` }} />
                  </div>
                </div>
                <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                  <p className="text-[11px] text-slate-300 leading-relaxed italic">{zeroQuote}</p>
                  <div className="mt-4 pt-4 border-t border-white/5 text-[9px] text-emerald-400 flex items-center gap-2">
                    <Workflow className="w-3 h-3" /> {zeroSourceLabel}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── COMPARISON TABLE ─────────────────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto overflow-hidden rounded-3xl border border-white/10">
          <table className="w-full text-left border-collapse bg-slate-900/40">
            <thead>
              <tr className="border-b border-white/10">
                <th className="p-6 text-[10px] uppercase tracking-widest text-slate-500">Feature</th>
                <th className="p-6 text-[10px] uppercase tracking-widest text-slate-500">{tablePublicLabel}</th>
                <th className="p-6 text-[10px] uppercase tracking-widest" style={{ color: accentColor }}>{tableCustomLabel}</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {tableRows.map((row, i) => (
                <tr key={i} className={i < tableRows.length - 1 ? 'border-b border-white/5' : ''}>
                  <td className="p-6 font-bold">{row.feature}</td>
                  <td className="p-6 text-slate-500">{row.public}</td>
                  <td className="p-6 font-bold" style={{ color: accentColor }}>{row.custom}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────────────────── */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto rounded-[4rem] p-12 md:p-24 text-center backdrop-blur-3xl relative overflow-hidden shadow-3xl"
          style={{ background: 'linear-gradient(to bottom right, rgba(139,92,246,0.2), black)', border: `1px solid ${accentColor}4d`, boxShadow: `0 0 80px ${accentColor}10` }}>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-8xl font-black mb-8 italic tracking-tighter uppercase leading-tight">
              {ctaHl}
            </h2>
            <p className="text-violet-100/70 text-lg md:text-xl mb-12 max-w-2xl mx-auto">{ctaBody}</p>
            <div className="flex flex-col items-center gap-6">
              <button className="bg-white px-16 py-6 rounded-2xl font-black text-2xl hover:scale-105 transition-all shadow-2xl uppercase italic"
                style={{ color: accentColor }}>
                {ctaBtn}
              </button>
              <div className="font-mono text-[10px] tracking-[0.4em] uppercase" style={{ color: `${accentColor}80` }}>
                {ctaSubLabel}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}