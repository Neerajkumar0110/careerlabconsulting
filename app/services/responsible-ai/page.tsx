// app/services/responsible-ai/page.tsx
'use client';

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import ExecutionFlow from '@/components/sections/ExecutionFlow';
import FeatureGrid from '@/components/sections/FeatureGrid';
import {
  ShieldCheck, Scale, Eye, Lock, AlertTriangle,
  FileSearch, CheckCircle, ArrowRight, Fingerprint,
} from 'lucide-react';
import { usePageContent } from '@/hooks/usePageContent';

// ── Icon maps ─────────────────────────────────────────────────────────────────
const CARD_ICON_MAP: Record<string, React.ElementType> = { Scale, Eye, Lock, AlertTriangle };
const POINT_ICON_MAP: Record<string, React.ElementType> = { FileSearch, AlertTriangle, Fingerprint };

// ── Types ─────────────────────────────────────────────────────────────────────
interface IntegrityCard  { title: string; desc: string; icon: string }
interface ComplianceRow  { label: string; status: string; progress: number }
interface VerifiedPoint  { text: string; icon: string }

function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

// ── Defaults ──────────────────────────────────────────────────────────────────
const DEFAULT_INTEGRITY_CARDS = JSON.stringify([
  { title: 'Bias Mitigation',   desc: 'Rigorous testing of datasets to identify and neutralize algorithmic prejudice.',                icon: 'Scale'         },
  { title: 'Explainability',    desc: "Opening the 'black box' so every AI decision is traceable and understandable.",               icon: 'Eye'           },
  { title: 'Privacy First',     desc: 'Advanced encryption and differential privacy to protect user identities.',                    icon: 'Lock'          },
  { title: 'Safety Guardrails', desc: 'Real-time monitoring to prevent hallucinatory or harmful model outputs.',                     icon: 'AlertTriangle' },
]);
const DEFAULT_COMPLIANCE_ROWS = JSON.stringify([
  { label: 'GDPR Alignment',       status: 'Verified',    progress: 100 },
  { label: 'SOC2 Security',        status: 'Active',      progress: 100 },
  { label: 'EU AI Act Compliance', status: 'In-Progress', progress: 75  },
]);
const DEFAULT_VERIFIED_POINTS = JSON.stringify([
  { text: 'Algorithmic Impact Assessments', icon: 'FileSearch'    },
  { text: 'Continuous Safety Monitoring',   icon: 'AlertTriangle' },
  { text: 'Data Lineage Tracking',          icon: 'Fingerprint'   },
]);

export default function ResponsibleAIPage() {
  const { get } = usePageContent('services-responsible-ai');

  // ── CMS values ────────────────────────────────────────────────────────────
  const accentColor     = get('hero', 'accent_color',          '#3b82f6');
  const accentColorTo   = get('hero', 'accent_color_to',       '#6366f1');
  const badgeText       = get('hero', 'badge_text',            'Ethics & Governance Framework');
  const headlineLine1   = get('hero', 'headline_line1',        'RESPONSIBLE');
  const headlineAccent  = get('hero', 'headline_accent',       'AI SYSTEMS');
  const heroBody        = get('hero', 'body_text',             'Build trust into every token. We help enterprises develop AI that is unbiased, transparent, and fully compliant with global data regulations while maintaining peak performance.');
  const btnPrimaryLabel = get('hero', 'btn_primary_label',     'Get an Ethics Audit');
  const btnSecondLabel  = get('hero', 'btn_secondary_label',   'Security Protocol');

  const integrityHeadline = get('integrity', 'headline',       'The Integrity Core');
  const integritySub      = get('integrity', 'subheading',     'Ensuring your autonomous systems operate within legal and ethical boundaries.');
  const integrityCards    = safeParse<IntegrityCard[]>(get('integrity', 'cards_json', DEFAULT_INTEGRITY_CARDS), []);

  const verifiedHeadline  = get('verified', 'headline',        'Verified Integrity');
  const verifiedBody      = get('verified', 'body_text',       'We provide the legal and technical blueprints required to deploy AI in highly regulated sectors. Our framework ensures your models are audit-ready and compliant with emerging global laws.');
  const engineLabel       = get('verified', 'compliance_engine_label', 'COMPLIANCE_ENGINE_v4');
  const complianceRows    = safeParse<ComplianceRow[]>(get('verified', 'compliance_rows_json', DEFAULT_COMPLIANCE_ROWS), []);
  const clearanceLabel    = get('verified', 'clearance_label', 'SECURITY_CLEARANCE_GRANTED');
  const verifiedPoints    = safeParse<VerifiedPoint[]>(get('verified', 'points_json', DEFAULT_VERIFIED_POINTS), []);

  const lifecycleHeadline = get('lifecycle', 'headline',       'The Ethics Lifecycle');

  const ctaHeadline       = get('cta', 'headline',             'SECURE YOUR LEGACY');
  const ctaBody           = get('cta', 'body_text',            'Our ethics consultants at DLF Cyber City are ready to audit your AI infrastructure.');
  const ctaBtnLabel       = get('cta', 'btn_label',            'START AUDIT');
  const ctaContact        = get('cta', 'contact_number',       '+91 870023 6923');

  return (
    <main className="flex min-h-screen flex-col bg-[#020617] text-white overflow-x-hidden">
      <Navbar />

      {/* ── HERO ────────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] rounded-full blur-[120px] -z-10"
          style={{ background: `${accentColor}0d` }} />
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 backdrop-blur-md"
            style={{ background: `${accentColor}1a`, border: `1px solid ${accentColor}33` }}>
            <ShieldCheck className="w-4 h-4" style={{ color: accentColor }} />
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: accentColor }}>{badgeText}</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-tight">
            {headlineLine1} <br />
            <span className="text-transparent bg-clip-text italic"
              style={{ backgroundImage: `linear-gradient(to right, ${accentColor}, ${accentColorTo})` }}>
              {headlineAccent}
            </span>
          </h1>
          <p className="max-w-3xl mx-auto text-gray-400 text-lg md:text-xl leading-relaxed mb-12">{heroBody}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-10 py-5 rounded-2xl font-bold transition-all shadow-xl flex items-center justify-center gap-2 text-white"
              style={{ background: accentColor, boxShadow: `0 20px 40px ${accentColor}33` }}>
              {btnPrimaryLabel} <ArrowRight className="w-5 h-5" />
            </button>
            <button className="px-10 py-5 bg-white/5 border border-white/10 hover:bg-white/10 rounded-2xl font-bold transition-all">
              {btnSecondLabel}
            </button>
          </div>
        </div>
      </section>

      {/* ── INTEGRITY CORE ──────────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold italic">{integrityHeadline}</h2>
            <p className="text-gray-500 mt-4">{integritySub}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {integrityCards.map((card, i) => {
              const Icon = CARD_ICON_MAP[card.icon] ?? ShieldCheck;
              return (
                <div key={i} className="p-8 rounded-[2rem] border border-white/5 hover:border-blue-500/30 transition-all"
                  style={{ background: `${accentColor}0d` }}>
                  <div className="mb-6 p-4 rounded-2xl inline-block" style={{ background: `${accentColor}1a` }}>
                    <Icon className="w-6 h-6" style={{ color: accentColor }} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{card.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{card.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── VERIFIED INTEGRITY ──────────────────────────────────────────────── */}
      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Left – compliance panel */}
          <div className="order-2 lg:order-1 relative">
            <div className="absolute -inset-10 rounded-full blur-[100px] opacity-10"
              style={{ background: accentColor }} />
            <div className="relative bg-[#03081a] border border-white/10 rounded-[3rem] p-10 shadow-2xl overflow-hidden">
              <div className="flex items-center gap-3 mb-8">
                <Fingerprint className="w-8 h-8" style={{ color: accentColor }} />
                <span className="font-mono text-sm tracking-widest" style={{ color: accentColor }}>{engineLabel}</span>
              </div>
              <div className="space-y-6">
                {complianceRows.map((row, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-white/5 border border-white/5">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-bold">{row.label}</span>
                      <span className="text-[10px] uppercase font-bold" style={{ color: accentColor }}>{row.status}</span>
                    </div>
                    <div className="h-1.5 bg-white/10 rounded-full">
                      <div className="h-full rounded-full transition-all" style={{ width: `${row.progress}%`, background: accentColor }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex justify-center">
                <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/20 border border-emerald-500/40 rounded-lg">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-bold text-emerald-400">{clearanceLabel}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right – copy */}
          <div className="order-1 lg:order-2">
            <h2 className="text-4xl md:text-6xl font-black mb-8 italic tracking-tighter">{verifiedHeadline}</h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">{verifiedBody}</p>
            <div className="space-y-4 mb-8">
              {verifiedPoints.map((point, idx) => {
                const Icon = POINT_ICON_MAP[point.icon] ?? FileSearch;
                return (
                  <div key={idx} className="flex items-center gap-4 text-gray-200 font-bold">
                    <Icon className="w-5 h-5" style={{ color: accentColor }} />
                    {point.text}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── ETHICS LIFECYCLE ────────────────────────────────────────────────── */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-6 text-center mb-12">
          <h3 className="text-3xl font-bold italic">{lifecycleHeadline}</h3>
        </div>
        <div className="py-12 border-y border-white/5">
          <ExecutionFlow />
        </div>
      </div>

      <FeatureGrid />

      {/* ── CTA ─────────────────────────────────────────────────────────────── */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto border rounded-[4rem] p-12 md:p-24 text-center backdrop-blur-3xl relative overflow-hidden"
          style={{ background: `linear-gradient(to bottom right, ${accentColor}33, ${accentColorTo}33)`, borderColor: `${accentColor}33` }}>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-7xl font-black mb-8 italic tracking-tighter">{ctaHeadline}</h2>
            <p className="text-blue-100/70 text-lg md:text-xl mb-12 max-w-2xl mx-auto">{ctaBody}</p>
            <div className="flex flex-col items-center gap-6">
              <button className="bg-white px-16 py-6 rounded-full font-black text-2xl hover:scale-110 transition-all shadow-2xl"
                style={{ color: accentColor }}>
                {ctaBtnLabel}
              </button>
              <div className="font-mono text-sm tracking-widest" style={{ color: accentColor }}>{ctaContact}</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}