'use client';

import React from 'react';
import {
  ShieldCheck, FileSearch, BarChart4, Users,
  Scale, Coins, ArrowRight, ClipboardCheck, Zap,
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import ExecutionFlow from '@/components/sections/ExecutionFlow';
import SuccessStories from '@/components/sections/SuccessStories';
import { usePageContent } from '@/hooks/usePageContent';

function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

interface FeatureCard  { title: string; desc: string; icon: string }
interface TrustBadge   { label: string; icon: string }
interface ClaimMetric  { label: string; value: string; color: string }

const ICON_MAP: Record<string, React.ElementType> = {
  ShieldCheck, FileSearch, BarChart4, Users, Scale, Coins, ClipboardCheck, Zap,
};

const DEFAULT_FEATURES = JSON.stringify([
  { title: 'Autonomous Claims', desc: 'LLM-driven adjudication that processes medical codes (ICD-10/CPT) against policy terms for instant approvals.',                       icon: 'ClipboardCheck' },
  { title: 'FWA Detection',     desc: 'Advanced anomaly detection to identify Fraud, Waste, and Abuse patterns in billing before payments are disbursed.',                   icon: 'FileSearch'     },
  { title: 'Actuarial AI',      desc: 'Predictive modeling that analyzes population health data to forecast risk and optimize premium pricing.',                              icon: 'BarChart4'      },
], null, 2);
const DEFAULT_TRUST_BADGES = JSON.stringify([
  { label: 'Legal Guardrails',  icon: 'Scale'  },
  { label: 'Loss Ratio Opt',    icon: 'Coins'  },
], null, 2);
const DEFAULT_CLAIM_METRICS = JSON.stringify([
  { label: 'Policy Match Score',       value: '0.998',    color: '#3b82f6' },
  { label: 'Medical Necessity',        value: 'VERIFIED', color: '#10b981' },
  { label: 'Risk Adjustment Factor',   value: '1.24',     color: '#f8fafc' },
], null, 2);

export default function HealthInsurancePage() {
  const { get } = usePageContent('industry-health-insurance');

  // Hero
  const accentFrom      = get('hero', 'accent_from',     '#3b82f6');
  const accentTo        = get('hero', 'accent_to',       '#6366f1');
  const badgeText       = get('hero', 'badge_text',      'Payer & Underwriting Vertical');
  const heroPl          = get('hero', 'headline_plain',  'AI-POWERED');
  const heroAcc         = get('hero', 'headline_accent', 'RISK SHIELD');
  const heroBody        = get('hero', 'body_text',       'Transforming the insurance value chain. We build autonomous systems for instant claims adjudication, predictive actuarial modeling, and high-fidelity fraud detection for the world\'s leading payers.');
  const heroBtnLabel    = get('hero', 'btn_label',       'Optimize Your Portfolio');

  // Features
  const featuresItems   = safeParse<FeatureCard[]>(get('features', 'items_json', DEFAULT_FEATURES), []);

  // Logic
  const logicPl         = get('logic', 'headline_plain',  'Zero-Friction');
  const logicAcc        = get('logic', 'headline_accent', 'Payer Logic');
  const logicBody       = get('logic', 'body_text',       'Manual claims review is slow and error-prone. We implement Retrieval-Augmented Generation (RAG) frameworks that scan thousands of policy pages in milliseconds to ensure every decision is backed by documented evidence and regulatory compliance.');
  const trustBadges     = safeParse<TrustBadge[]>(get('logic', 'trust_badges_json', DEFAULT_TRUST_BADGES), []);
  const claimMetrics    = safeParse<ClaimMetric[]>(get('logic', 'claim_metrics_json', DEFAULT_CLAIM_METRICS), []);
  const processorLabel  = get('logic', 'processor_label', 'Claims_Processor_L3');
  const systemDecision  = get('logic', 'system_decision', 'SYSTEM_DECISION: AUTO_APPROVE_CLAIM_ID_9921');

  // CTA
  const ctaHeadline     = get('cta', 'headline',      'Secure Your Operations');
  const ctaBody         = get('cta', 'body_text',     'Our insurance-tech engineers at DLF Cyber City are ready to build the next generation of automated payer infrastructure.');
  const ctaBtnLabel     = get('cta', 'btn_label',     'START PAYER AUDIT');
  const ctaLocation     = get('cta', 'location_text', 'Underwriting Hub: Gurugram, HR');

  return (
    <main className="flex min-h-screen flex-col bg-[#020617] text-white overflow-x-hidden">
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[120px] -z-10"
          style={{ background: `${accentFrom}0d` }} />
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-8 backdrop-blur-md"
            style={{ background: `${accentFrom}1a`, borderColor: `${accentFrom}33` }}>
            <ShieldCheck className="w-4 h-4" style={{ color: accentFrom }} />
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: accentFrom }}>{badgeText}</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-tight uppercase">
            {heroPl} <br />
            <span className="text-transparent bg-clip-text italic"
              style={{ backgroundImage: `linear-gradient(to right, ${accentFrom}, ${accentTo})` }}>
              {heroAcc}
            </span>
          </h1>
          <p className="max-w-3xl mx-auto text-gray-400 text-lg md:text-xl leading-relaxed mb-12">{heroBody}</p>
          <button className="px-10 py-5 rounded-2xl font-bold transition-all shadow-xl flex items-center justify-center gap-2 text-white mx-auto"
            style={{ background: accentFrom }}>
            {heroBtnLabel} <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuresItems.map((item, i) => {
            const Icon = ICON_MAP[item.icon] ?? ShieldCheck;
            return (
              <div key={i} className="group p-10 rounded-[2.5rem] border border-white/5 transition-all"
                style={{ background: `${accentFrom}08` }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = `${accentFrom}4d`)}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)')}>
                <div className="mb-6 p-4 rounded-2xl inline-block" style={{ background: `${accentFrom}1a` }}>
                  <Icon className="w-8 h-8" style={{ color: accentFrom }} />
                </div>
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-gray-500 leading-relaxed text-sm">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── PAYER LOGIC ──────────────────────────────────────────────── */}
      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Claims Processor Card */}
          <div className="relative">
            <div className="absolute -inset-10 rounded-full blur-[100px]" style={{ background: `${accentFrom}0d` }} />
            <div className="relative bg-[#03081a] border border-white/10 rounded-[3rem] p-10 shadow-2xl font-mono">
              <div className="flex items-center justify-between mb-10 border-b border-white/5 pb-6">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4" style={{ color: accentFrom }} />
                  <span className="text-[10px] text-gray-500 uppercase">{processorLabel}</span>
                </div>
                <div className="text-[10px] text-emerald-400 font-bold">LIVE_AUDIT</div>
              </div>
              <div className="space-y-6">
                {claimMetrics.map((m, i) => (
                  <div key={i} className="flex justify-between items-center text-xs">
                    <span className="text-gray-400">{m.label}</span>
                    <span className="font-bold" style={{ color: m.color }}>{m.value}</span>
                  </div>
                ))}
                <div className="mt-8 p-4 rounded-xl border text-[10px]"
                  style={{ background: '#10b9811a', borderColor: '#10b98133', color: '#6ee7b7' }}>
                  {systemDecision}
                </div>
              </div>
            </div>
          </div>

          {/* Text */}
          <div>
            <h2 className="text-4xl md:text-6xl font-black mb-8 italic tracking-tighter uppercase leading-tight">
              {logicPl}<br /><span style={{ color: accentFrom }}>{logicAcc}</span>
            </h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">{logicBody}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6">
              {trustBadges.map((badge, i) => {
                const Icon = ICON_MAP[badge.icon] ?? Scale;
                return (
                  <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all">
                    <Icon style={{ color: accentFrom }} />
                    <span className="text-xs font-bold uppercase tracking-widest">{badge.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <div className="py-12 border-y border-white/5"><ExecutionFlow /></div>
      <SuccessStories />

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto border rounded-[4rem] p-12 md:p-24 text-center backdrop-blur-3xl relative overflow-hidden"
          style={{ background: `linear-gradient(to bottom right, ${accentFrom}1a, ${accentTo}1a)`, borderColor: `${accentFrom}33` }}>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-7xl font-black mb-8 italic tracking-tighter uppercase leading-tight">{ctaHeadline}</h2>
            <p className="text-lg md:text-xl mb-12 max-w-2xl mx-auto" style={{ color: 'rgba(219,234,254,0.7)' }}>{ctaBody}</p>
            <div className="flex flex-col items-center gap-6">
              <button className="bg-white px-16 py-6 rounded-full font-black text-2xl hover:scale-110 transition-all shadow-2xl"
                style={{ color: '#1e3a8a' }}>
                {ctaBtnLabel}
              </button>
              <div className="font-mono text-sm tracking-widest uppercase" style={{ color: accentFrom }}>{ctaLocation}</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}