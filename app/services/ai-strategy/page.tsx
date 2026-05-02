// app/services/ai-strategy/page.tsx
'use client';

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import ExecutionFlow from '@/components/sections/ExecutionFlow';
import SuccessStories from '@/components/sections/SuccessStories';
import { Lightbulb, Compass, BarChart4, ShieldCheck, Microscope, Layers } from 'lucide-react';
import { usePageContent } from '@/hooks/usePageContent';

function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

interface PillarItem { title: string; desc: string; icon: string }
interface PhaseItem  { level: string; label: string; width: string }

const PILLAR_ICON_MAP: Record<string, React.ElementType> = {
  Microscope, ShieldCheck, BarChart4, Layers, Lightbulb,
};

const DEFAULT_PILLARS = JSON.stringify([
  { title: 'Feasibility Analysis',    desc: 'We analyze your data silos and infrastructure to determine AI readiness before you invest.',                              icon: 'Microscope'  },
  { title: 'Ethical AI Governance',   desc: 'Defining guardrails to ensure your AI deployments are compliant, unbiased, and secure.',                                  icon: 'ShieldCheck' },
  { title: 'ROI Forecasting',         desc: 'Data-driven projections of how AI implementation will impact your bottom line over 12–36 months.',                        icon: 'BarChart4'   },
  { title: 'Tech Stack Selection',    desc: 'Neutral advisory on selecting LLMs, vector databases, and cloud infrastructure.',                                         icon: 'Layers'      },
  { title: 'Change Management',       desc: 'Strategies to upskill your workforce and align organizational culture with AI adoption.',                                  icon: 'Lightbulb'   },
]);

const DEFAULT_PHASES = JSON.stringify([
  { level: 'Phase 1', label: 'Readiness Assessment',    width: 'w-1/3'  },
  { level: 'Phase 2', label: 'Use-Case Prioritization', width: 'w-1/2'  },
  { level: 'Phase 3', label: 'Pilot & Validation',      width: 'w-3/4'  },
  { level: 'Phase 4', label: 'Full-Scale Orchestration', width: 'w-full' },
]);

export default function AIStrategyPage() {
  const { get } = usePageContent('services-ai-strategy');

  // ── Hero ──────────────────────────────────────────────────────────────────
  const accentFrom      = get('hero', 'accent_from',       '#3b82f6');
  const accentTo        = get('hero', 'accent_to',         '#6366f1');
  const badgeText       = get('hero', 'badge_text',        'Consulting Division');
  const heroPl          = get('hero', 'headline_plain',    'Architecting Your');
  const heroAcc         = get('hero', 'headline_accent',   'AI Roadmap');
  const heroBody        = get('hero', 'body_text',         "Don't just adopt AI—integrate it. We help global enterprises define, validate, and deploy AI strategies that drive measurable ROI and long-term competitive advantage.");
  const heroBtnPrimary  = get('hero', 'btn_primary_label', 'Book Strategy Session');
  const heroBtnSecond   = get('hero', 'btn_secondary_label','Download Framework');
  const phone           = get('hero', 'phone_number',      '+91 870023 6923');

  // ── Maturity Model ────────────────────────────────────────────────────────
  const maturityTitle   = get('maturity', 'headline',      'Strategic Maturity Model');
  const phases          = safeParse<PhaseItem[]>(get('maturity', 'phases_json', DEFAULT_PHASES), []);

  // ── Pillars ───────────────────────────────────────────────────────────────
  const pillarsTitle    = get('pillars', 'headline',       'Consulting Pillars');
  const pillarsSubhead  = get('pillars', 'subheading',     'Structured intelligence for complex environments.');
  const pillars         = safeParse<PillarItem[]>(get('pillars', 'items_json', DEFAULT_PILLARS), []);

  // ── CTA ───────────────────────────────────────────────────────────────────
  const ctaHeadline     = get('cta', 'headline',           'READY TO ARCHITECT?');
  const ctaBody         = get('cta', 'body_text',          'Connect with our Lead Strategists at our Gurugram HQ to start your transition to an AI-first organization.');
  const ctaBtnLabel     = get('cta', 'btn_label',          'START CONSULTATION');
  const ctaPhone        = get('cta', 'phone_number',       '+91 870023 6923');

  return (
    <main className="flex min-h-screen flex-col bg-[#020617] text-white overflow-x-hidden">
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[150px] -z-10"
          style={{ background: `${accentTo}1a` }} />
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-8"
              style={{ background: `${accentFrom}1a`, borderColor: `${accentFrom}33` }}>
              <span className="text-xs font-bold uppercase tracking-[0.3em]" style={{ color: accentFrom }}>{badgeText}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-8 leading-[1.1]">
              {heroPl}<br />
              <span className="text-transparent bg-clip-text"
                style={{ backgroundImage: `linear-gradient(to right, ${accentFrom}, ${accentTo})` }}>
                {heroAcc}
              </span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl mb-10 max-w-xl leading-relaxed">{heroBody}</p>
            <div className="flex flex-wrap gap-4">
              <button className="px-8 py-4 font-bold rounded-xl transition-all shadow-lg"
                style={{ background: accentFrom, boxShadow: `0 10px 30px ${accentFrom}33` }}>
                {heroBtnPrimary}
              </button>
              <button className="px-8 py-4 bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl font-bold transition-all">
                {heroBtnSecond}
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-1 rounded-3xl blur opacity-20"
              style={{ backgroundImage: `linear-gradient(to right, ${accentTo}, ${accentFrom})` }} />
            <div className="relative bg-[#03081a] border border-white/10 p-8 rounded-3xl">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2 italic">
                <Compass style={{ color: accentFrom }} /> {maturityTitle}
              </h3>
              <div className="space-y-6">
                {phases.map((phase, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between text-xs font-mono text-gray-500 uppercase">
                      <span>{phase.level}</span><span>{phase.label}</span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${phase.width}`}
                        style={{ background: accentFrom }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PILLARS ──────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-3xl md:text-5xl font-bold italic">{pillarsTitle}</h2>
            <p className="text-gray-500 mt-4">{pillarsSubhead}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pillars.map((pillar, i) => {
              const Icon = PILLAR_ICON_MAP[pillar.icon] ?? Lightbulb;
              return (
                <div key={i} className="p-8 rounded-3xl border border-white/5 hover:border-blue-500/30 transition-all group"
                  style={{ background: `${accentFrom}08` }}>
                  <div className="mb-6 p-3 rounded-xl inline-block transition-all group-hover:bg-blue-600"
                    style={{ background: `${accentFrom}1a` }}>
                    <Icon className="w-8 h-8" style={{ color: accentFrom }} />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{pillar.title}</h3>
                  <p className="text-gray-500 leading-relaxed">{pillar.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <div className="py-12 border-y border-white/5"><ExecutionFlow /></div>
      <SuccessStories />

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto rounded-[4rem] p-12 md:p-24 text-center relative overflow-hidden"
          style={{ backgroundImage: `linear-gradient(to bottom right, ${accentFrom}66, ${accentTo}66)`, border: `1px solid ${accentFrom}33` }}>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-black mb-8 italic">{ctaHeadline}</h2>
            <p className="text-blue-100/70 text-lg md:text-xl mb-12 max-w-2xl mx-auto">{ctaBody}</p>
            <div className="flex flex-col items-center gap-6">
              <button className="bg-white px-16 py-6 rounded-full font-black text-2xl hover:scale-110 transition-all shadow-2xl"
                style={{ color: accentTo }}>
                {ctaBtnLabel}
              </button>
              <div className="font-mono text-sm tracking-widest" style={{ color: accentFrom }}>{ctaPhone}</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}