// app/industry/compliance/page.tsx
'use client';

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import ExecutionFlow from '@/components/sections/ExecutionFlow';
import SuccessStories from '@/components/sections/SuccessStories';
import { usePageContent } from '@/hooks/usePageContent';
import {
  ShieldAlert, Fingerprint, Globe2, Eye, CheckSquare,
  Lock, ArrowRight, BarChartHorizontal, Zap, ShieldCheck,
} from 'lucide-react';

const ICON_MAP: Record<string, React.ElementType> = {
  Fingerprint, Globe2, BarChartHorizontal, CheckSquare, Lock, Zap, ShieldCheck, Eye,
};

interface Metric  { label: string; value: string; detail: string }
interface Feature { title: string; desc: string; icon: string }
interface Badge   { icon: string; label: string }

function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

const DEFAULT_METRICS = JSON.stringify([
  { label: 'Alert Precision',  value: '99.7%',      detail: 'False Positive Reduction' },
  { label: 'Regulatory Sync',  value: 'Real-time',  detail: 'Global Law Monitoring'    },
  { label: 'Reporting Speed',  value: '12x Faster', detail: 'Automated SAR Filing'     },
  { label: 'Policy Coverage',  value: '100%',       detail: 'Gap Analysis Accuracy'    },
]);
const DEFAULT_FEATURES = JSON.stringify([
  { title: 'Neural AML/KYC',     desc: 'Moving beyond static rules to behavior-based anomaly detection that catches sophisticated money laundering patterns in real-time.', icon: 'Fingerprint'       },
  { title: 'Reg-Change Tracker', desc: 'AI that reads 1,000+ regulatory updates daily and maps them directly to your internal policies, flagging gaps instantly.',          icon: 'Globe2'            },
  { title: 'ESG Data Ledger',    desc: 'Automated collection and validation of sustainability data across your supply chain for audit-ready ESG disclosures.',              icon: 'BarChartHorizontal'},
]);
const DEFAULT_BADGES = JSON.stringify([
  { icon: 'CheckSquare', label: 'Automated SAR & STR Filings'    },
  { icon: 'Lock',        label: 'SOC2 / GDPR Neural Safeguards'  },
  { icon: 'Zap',         label: 'Sanction List Sync (60s Latency)'},
]);

export default function ComplianceAIPage() {
  const { get } = usePageContent('industry-compliance');

  const badgeText      = get('hero', 'badge_text',      'RegTech & Compliance Intelligence Vertical');
  const headlinePlain  = get('hero', 'headline_plain',  'REGULATORY');
  const headlineAccent = get('hero', 'headline_accent', 'IMMUNITY');
  const heroBody       = get('hero', 'body_text',       'Compliance is no longer a reactive cost center.');
  const ctaLabel       = get('hero', 'cta_label',       'Harden Your Infrastructure');
  const accentColor    = get('hero', 'accent_color',    '#10b981');
  const metrics        = safeParse<Metric[]>(get('hero', 'metrics_json', DEFAULT_METRICS), []);

  const features       = safeParse<Feature[]>(get('features', 'items_json', DEFAULT_FEATURES), []);

  const avHeadline     = get('absolute_vigilance', 'headline',        'Absolute Vigilance');
  const avBody         = get('absolute_vigilance', 'body_text',       '');
  const badges         = safeParse<Badge[]>(get('absolute_vigilance', 'badges_json', DEFAULT_BADGES), []);
  const policyAlign    = get('absolute_vigilance', 'policy_alignment', '99.8%');
  const riskDrift      = get('absolute_vigilance', 'risk_drift',       '0.02%');
  const guardianLog    = get('absolute_vigilance', 'guardian_log',     '');

  const ctaHeadline    = get('cta', 'headline',      'Fortify Your Operations');
  const ctaBody        = get('cta', 'body_text',     '');
  const ctaBtnLabel    = get('cta', 'btn_label',     'Get Protected');
  const ctaLocation    = get('cta', 'location_text', 'Compliance Hub: Gurugram, India');

  return (
    <main className="flex min-h-screen flex-col bg-[#020617] text-white overflow-x-hidden">
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full -z-10"
          style={{ background: `${accentColor}08`, filter: 'blur(120px)' }} />
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-8 backdrop-blur-md"
            style={{ background: `${accentColor}1a`, borderColor: `${accentColor}33` }}>
            <ShieldAlert className="w-4 h-4" style={{ color: accentColor }} />
            <span className="text-xs font-bold uppercase tracking-widest italic" style={{ color: accentColor }}>{badgeText}</span>
          </div>
          <h1 className="text-4xl md:text-7xl font-black mb-8 tracking-tighter leading-none uppercase">
            {headlinePlain} <br />
            <span className="text-transparent bg-clip-text italic"
              style={{ backgroundImage: `linear-gradient(to right, #d1fae5, ${accentColor}, #0d9488)` }}>
              {headlineAccent}
            </span>
          </h1>
          <p className="max-w-3xl mx-auto text-gray-400 text-lg md:text-xl leading-relaxed mb-12">{heroBody}</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto mb-16">
            {metrics.map((m, i) => (
              <div key={i} className="p-6 rounded-3xl text-left hover:opacity-90 transition-all border"
                style={{ background: `${accentColor}08`, borderColor: `${accentColor}22` }}>
                <p className="text-3xl font-black mb-1 text-white">{m.value}</p>
                <p className="text-[10px] uppercase font-bold tracking-widest" style={{ color: accentColor }}>{m.label}</p>
                <p className="text-[9px] text-gray-500 italic mt-2">{m.detail}</p>
              </div>
            ))}
          </div>
          <button className="px-12 py-6 rounded-2xl font-black transition-all shadow-2xl flex items-center gap-3 mx-auto text-white uppercase italic"
            style={{ background: accentColor, boxShadow: `0 20px 60px ${accentColor}33` }}>
            {ctaLabel} <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((item, i) => {
            const Icon = ICON_MAP[item.icon] ?? Zap;
            return (
              <div key={i} className="p-10 rounded-[3rem] bg-zinc-900/40 border border-white/5 hover:border-emerald-500/30 transition-all">
                <div className="mb-6 p-4 rounded-2xl inline-block" style={{ background: `${accentColor}0d` }}>
                  <Icon className="w-8 h-8" style={{ color: accentColor }} />
                </div>
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── ABSOLUTE VIGILANCE ───────────────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Terminal card */}
          <div className="relative">
            <div className="absolute -inset-10 rounded-full pointer-events-none"
              style={{ background: `${accentColor}08`, filter: 'blur(100px)' }} />
            <div className="relative bg-[#010a05] rounded-[3rem] p-10 shadow-2xl font-mono overflow-hidden border"
              style={{ borderColor: `${accentColor}33` }}>
              <div className="flex justify-between items-center mb-8 pb-4 border-b border-white/5">
                <div className="flex items-center gap-2 font-black italic" style={{ color: accentColor }}>
                  <Eye className="w-4 h-4 animate-pulse" />
                  <span className="text-[10px] uppercase">Sentinel_Audit_Live</span>
                </div>
                <div className="text-[10px] text-gray-500 uppercase">NODE_SECURE_ALPHA</div>
              </div>
              <div className="space-y-6">
                <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                  <p className="text-[10px] text-gray-500 uppercase mb-4 italic text-center">Cross-Border Compliance Flow</p>
                  <div className="flex justify-center gap-3">
                    {['EU', 'US', 'APAC', 'IN'].map(r => (
                      <div key={r} className="px-3 py-2 rounded-lg border text-[9px] font-black text-center"
                        style={{ background: `${accentColor}0d`, borderColor: `${accentColor}33`, color: accentColor }}>
                        {r}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl border text-center" style={{ background: `${accentColor}0d`, borderColor: `${accentColor}33` }}>
                    <p className="text-[8px] text-gray-500 uppercase mb-1 font-bold">Policy Alignment</p>
                    <p className="text-xl font-black" style={{ color: accentColor }}>{policyAlign}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-center">
                    <p className="text-[8px] text-gray-500 uppercase mb-1 font-bold">Risk Drift</p>
                    <p className="text-xl font-black italic text-gray-300">{riskDrift}</p>
                  </div>
                </div>
              </div>
              <div className="mt-8 p-4 rounded-xl border border-dashed text-[9px]"
                style={{ background: `${accentColor}08`, borderColor: `${accentColor}44`, color: `${accentColor}cc` }}>
                <p className="font-bold uppercase mb-1 tracking-widest" style={{ color: accentColor }}>GUARDIAN_LOG:</p>
                <p className="italic">{guardianLog}</p>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-4xl md:text-7xl font-black mb-8 italic tracking-tighter uppercase leading-tight"
              style={{ color: `${accentColor}dd` }}>
              {avHeadline}
            </h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">{avBody}</p>
            <div className="space-y-4">
              {badges.map((b, idx) => {
                const Icon = ICON_MAP[b.icon] ?? ShieldCheck;
                return (
                  <div key={idx} className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-emerald-500/30 transition-all">
                    <Icon style={{ color: accentColor }} />
                    <span className="text-xs font-bold uppercase tracking-widest" style={{ color: `${accentColor}ee` }}>{b.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <div className="py-12 border-y border-white/5" style={{ background: `${accentColor}03` }}>
        <ExecutionFlow />
      </div>
      <SuccessStories />

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto rounded-[4rem] p-12 md:p-24 text-center backdrop-blur-3xl relative overflow-hidden border"
          style={{ background: 'linear-gradient(to bottom right, #020617, #021a0e)', borderColor: `${accentColor}33` }}>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-8xl font-black mb-8 italic tracking-tighter uppercase leading-tight">{ctaHeadline}</h2>
            <p className="text-lg md:text-xl mb-12 max-w-2xl mx-auto" style={{ color: `${accentColor}bb` }}>{ctaBody}</p>
            <div className="flex flex-col items-center gap-6">
              <button className="bg-white px-16 py-6 rounded-2xl font-black text-2xl hover:scale-105 transition-all shadow-2xl uppercase italic"
                style={{ color: '#020617' }}>
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