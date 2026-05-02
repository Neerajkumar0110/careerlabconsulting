"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import ExecutionFlow from '@/components/sections/ExecutionFlow';
import FeatureGrid from '@/components/sections/FeatureGrid';
import { usePageContent } from '@/hooks/usePageContent';
import {
  ShieldCheck, FileText, Scale, Lock, Globe,
  Eye, ArrowRight, Gavel, CheckCircle,
} from 'lucide-react';

function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

interface CoreCard  { title: string; desc: string }
interface CheckItem { t: string }
interface HealthItem { label: string; val: string }

const DEFAULT_CORE_CARDS = JSON.stringify([
  { title: 'Regulatory Mapping', desc: 'Aligning your AI systems with the EU AI Act, GDPR, HIPAA, and industry-specific regulations.' },
  { title: 'Ethical AI Audits',  desc: 'Deep-dive assessments into model transparency, explainability, and bias mitigation protocols.' },
  { title: 'Data Sovereignty',   desc: 'Implementing localized data residency and privacy-preserving compute (PPC) architectures.' },
]);
const DEFAULT_CHECK_ITEMS = JSON.stringify([
  { t: 'Automated Impact Assessments' },
  { t: 'Bias Detection & Reporting' },
  { t: 'EU AI Act Risk Classification' },
]);
const DEFAULT_HEALTH = JSON.stringify([
  { label: 'Privacy Compliance', val: '100%' },
  { label: 'Ethics Alignment',   val: '96%'  },
  { label: 'Audit Readiness',    val: 'High' },
]);

const CORE_ICONS = [<Scale key="sc" className="w-8 h-8" />, <Eye key="ey" className="w-8 h-8" />, <Lock key="lk" className="w-8 h-8" />];
const CHECK_ICONS = [<FileText key="ft" />, <Gavel key="gv" />, <Globe key="gb" />];

export default function AICompliancePage() {
  const { get } = usePageContent('services-ai-compliance');

  // Hero
  const accentFrom     = get('hero', 'accent_from',      '#10b981');
  const accentTo       = get('hero', 'accent_to',        '#3b82f6');
  const badgeText      = get('hero', 'badge_text',       'Regulatory & Ethical Oversight');
  const heroPl         = get('hero', 'headline_plain',   'AI GOVERNANCE');
  const heroAcc        = get('hero', 'headline_accent',  '& COMPLIANCE');
  const heroBody       = get('hero', 'body_text',        'Navigate the complex landscape of AI regulation with confidence. We provide the framework for responsible AI deployment, ensuring your models meet global legal standards and ethical mandates.');
  const heroBtnLabel   = get('hero', 'btn_label',        'Get Compliance Ready');

  // Core pillars
  const coreCards     = safeParse<CoreCard[]>(get('core', 'cards_json', DEFAULT_CORE_CARDS), []);

  // Standards section
  const standardsPl   = get('standards', 'headline_plain',  'Global');
  const standardsAcc  = get('standards', 'headline_accent', 'Standards');
  const standardsBody = get('standards', 'body_text',       "We don't just check boxes. We build a continuous monitoring layer that flags compliance risks in real-time, ensuring your AI stays within legal and ethical guardrails as it evolves.");
  const checkItems    = safeParse<CheckItem[]>(get('standards', 'check_items_json', DEFAULT_CHECK_ITEMS), []);
  const healthItems   = safeParse<HealthItem[]>(get('standards', 'health_items_json', DEFAULT_HEALTH), []);
  const healthBadge   = get('standards', 'health_badge', '"System certified for SOC2 Type II and GDPR interoperability."');

  // CTA
  const ctaHeadline   = get('cta', 'headline',   'Ship with Certainty');
  const ctaAccent     = get('cta', 'headline_accent', 'Certainty');
  const ctaBody       = get('cta', 'body_text',   'Our legal-tech engineers at DLF Cyber City are ready to secure your AI roadmap against future liabilities.');
  const ctaBtnLabel   = get('cta', 'btn_label',   'START COMPLIANCE AUDIT');
  const ctaSubtext    = get('cta', 'subtext',     'Safety Location: Gurugram, India');

  return (
    <main className="flex min-h-screen flex-col bg-[#020617] text-white overflow-x-hidden">
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full blur-[120px] -z-10" style={{ background: `${accentFrom}0d` }} />
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-8 backdrop-blur-md" style={{ background: `${accentFrom}1a`, borderColor: `${accentFrom}33` }}>
            <ShieldCheck className="w-4 h-4" style={{ color: accentFrom }} />
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: accentFrom }}>{badgeText}</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-tight">
            {heroPl} <br />
            <span className="italic" style={{ backgroundImage: `linear-gradient(to right, ${accentFrom}, ${accentTo}, #6366f1)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              {heroAcc}
            </span>
          </h1>
          <p className="max-w-3xl mx-auto text-gray-400 text-lg md:text-xl leading-relaxed mb-12">{heroBody}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-10 py-5 rounded-2xl font-bold transition-all shadow-xl flex items-center justify-center gap-2" style={{ background: accentFrom }}>
              {heroBtnLabel} <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* ── CORE PILLARS ── */}
      <section className="py-24 px-6 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {coreCards.map((item, i) => (
            <div key={i} className="group p-10 rounded-[2.5rem] border border-white/5 transition-all"
              style={{ background: `${accentFrom}0d` }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = `${accentFrom}4d`)}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)')}>
              <div className="mb-6 p-4 rounded-2xl inline-block transition-all" style={{ background: `${accentFrom}1a`, color: accentFrom }}>
                {CORE_ICONS[i % CORE_ICONS.length]}
              </div>
              <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
              <p className="text-gray-500 leading-relaxed text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── STANDARDS ── */}
      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-4xl md:text-6xl font-black mb-8 italic tracking-tighter uppercase">
              {standardsPl}<br /><span style={{ color: accentFrom }}>{standardsAcc}</span>
            </h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">{standardsBody}</p>
            <div className="space-y-4 pt-8">
              {checkItems.map((point, idx) => (
                <div key={idx} className="flex items-center gap-4 p-4 rounded-xl border border-white/5" style={{ background: 'rgba(255,255,255,0.05)' }}>
                  <div style={{ color: accentFrom }}>{CHECK_ICONS[idx % CHECK_ICONS.length]}</div>
                  <span className="font-bold">{point.t}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-10 rounded-full" style={{ background: `${accentFrom}0d`, filter: 'blur(100px)' }} />
            <div className="relative border border-white/10 rounded-[3rem] p-10 shadow-2xl" style={{ background: '#03081a' }}>
              <div className="mb-10 flex justify-between items-center">
                <h3 className="font-mono text-xs uppercase tracking-[0.3em] text-gray-500">Compliance_Health_Index</h3>
                <div className="w-3 h-3 rounded-full animate-pulse" style={{ background: accentFrom }} />
              </div>
              <div className="space-y-8">
                {healthItems.map((stat, i) => (
                  <div key={i} className="flex items-center gap-6">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ border: `2px solid ${accentFrom}33` }}>
                      <CheckCircle className="w-6 h-6" style={{ color: accentFrom }} />
                    </div>
                    <div className="flex-1">
                      <p className="text-[10px] uppercase text-gray-500 font-bold mb-1">{stat.label}</p>
                      <p className="text-xl font-black">{stat.val}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-12 p-6 rounded-2xl" style={{ background: `${accentFrom}1a`, border: `1px solid ${accentFrom}33` }}>
                <p className="text-xs italic" style={{ color: `${accentFrom}cc` }}>{healthBadge}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="py-12 border-y border-white/5">
        <ExecutionFlow />
      </div>

      <FeatureGrid />

      {/* ── CTA ── */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto border rounded-[4rem] p-12 md:p-24 text-center backdrop-blur-3xl relative overflow-hidden group"
          style={{ backgroundImage: `linear-gradient(to bottom right, ${accentFrom}66, ${accentTo}33)`, borderColor: `${accentFrom}33` }}>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-7xl font-black mb-8 italic tracking-tighter uppercase leading-tight">
              {ctaHeadline.replace(ctaAccent, '')}
              <span style={{ color: accentFrom }}>{ctaAccent}</span>
            </h2>
            <p className="text-lg md:text-xl mb-12 max-w-2xl mx-auto" style={{ color: `${accentFrom}cc` }}>{ctaBody}</p>
            <div className="flex flex-col items-center gap-6">
              <button className="bg-white text-emerald-950 px-16 py-6 rounded-full font-black text-2xl hover:scale-110 transition-all shadow-2xl">
                {ctaBtnLabel}
              </button>
              <div className="font-mono text-sm tracking-widest uppercase" style={{ color: accentFrom }}>{ctaSubtext}</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}