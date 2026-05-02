'use client';

import React from 'react';
import {
  Database, Share2, Dna, Lock, Binary,
  FastForward, ArrowRight, ShieldCheck, Search,
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
interface PipelineStat { label: string; value: string }

const ICON_MAP: Record<string, React.ElementType> = {
  Database, Share2, Dna, Lock, Binary, FastForward, ShieldCheck, Search,
};

const DEFAULT_FEATURES = JSON.stringify([
  { title: 'Synthetic Data Gen',      desc: 'Creating HIPAA-compliant, privacy-preserving synthetic patient twins for model training without using real PHI.',               icon: 'Binary'   },
  { title: 'FHIR/HL7 Integration',    desc: 'Real-time data orchestration between disparate EHR systems using modern FHIR standards and AI mapping.',                       icon: 'Share2'   },
  { title: 'Semantic Normalization',  desc: 'Using NLP to standardize unstructured clinician notes into structured, searchable diagnostic codes.',                           icon: 'Search'   },
], null, 2);
const DEFAULT_TRUST_BADGES = JSON.stringify([
  { label: 'Zero-Trust Access', icon: 'ShieldCheck'  },
  { label: 'Real-time ETL',     icon: 'FastForward'  },
], null, 2);
const DEFAULT_PIPELINE_STATS = JSON.stringify([
  { label: 'Patient Identity Resolution', value: '99.2%'   },
  { label: 'FHIR v4.0 Validation',        value: 'ACTIVE'  },
  { label: 'Anonymization Layer',         value: 'VERIFIED'},
], null, 2);

export default function HealthDataPage() {
  const { get } = usePageContent('industry-health-data');

  // Hero
  const accentFrom      = get('hero', 'accent_from',     '#3b82f6');
  const accentTo        = get('hero', 'accent_to',       '#10b981');
  const badgeText       = get('hero', 'badge_text',      'Healthcare Interoperability & Big Data');
  const heroPl          = get('hero', 'headline_plain',  'LIQUID');
  const heroAcc         = get('hero', 'headline_accent', 'HEALTH DATA');
  const heroBody        = get('hero', 'body_text',       'Breaking down silos without breaking compliance. We build the infrastructure that turns fragmented EHR records into unified, AI-ready datasets for clinical research and predictive care.');
  const heroBtnLabel    = get('hero', 'btn_label',       'Unify Your Data');

  // Features
  const featuresItems   = safeParse<FeatureCard[]>(get('features', 'items_json', DEFAULT_FEATURES), []);

  // Stability
  const stablePl        = get('stability', 'headline_plain',     'Structured');
  const stableAcc       = get('stability', 'headline_accent',    'Stability');
  const stableBody      = get('stability', 'body_text',          'We architect healthcare data lakehouses that handle petabytes of genomic and clinical information. By implementing automated data governance and lineage tracking, we ensure your AI models are built on a foundation of clean, verifiable truth.');
  const trustBadges     = safeParse<TrustBadge[]>(get('stability', 'trust_badges_json', DEFAULT_TRUST_BADGES), []);
  const pipelineStats   = safeParse<PipelineStat[]>(get('stability', 'pipeline_stats_json', DEFAULT_PIPELINE_STATS), []);
  const pipelineLabel   = get('stability', 'pipeline_label',    'ENCRYPTED_PIPELINE_STREAMS');
  const systemLog       = get('stability', 'system_log',        'Successfully ingested 1.2M oncology records. PHI scrubbed and vectorized for RAG ingestion.');

  // CTA
  const ctaHeadline     = get('cta', 'headline',      'Architect Your Data Future');
  const ctaBody         = get('cta', 'body_text',     'Our data engineers at DLF Cyber City are ready to build the clinical infrastructure that powers tomorrow\'s medicine.');
  const ctaBtnLabel     = get('cta', 'btn_label',     'START DATA AUDIT');
  const ctaLocation     = get('cta', 'location_text', 'Network Hub: Gurugram, India');

  return (
    <main className="flex min-h-screen flex-col bg-[#020617] text-white overflow-x-hidden">
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[120px] -z-10"
          style={{ background: `${accentFrom}1a` }} />
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-8 backdrop-blur-md"
            style={{ background: `${accentFrom}1a`, borderColor: `${accentFrom}33` }}>
            <Database className="w-4 h-4" style={{ color: accentFrom }} />
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
            const Icon = ICON_MAP[item.icon] ?? Database;
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

      {/* ── STABILITY ────────────────────────────────────────────────── */}
      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Text */}
          <div>
            <h2 className="text-4xl md:text-6xl font-black mb-8 italic tracking-tighter uppercase leading-tight">
              {stablePl}<br /><span style={{ color: accentFrom }}>{stableAcc}</span>
            </h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">{stableBody}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              {trustBadges.map((badge, i) => {
                const Icon = ICON_MAP[badge.icon] ?? ShieldCheck;
                return (
                  <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/5 flex flex-col gap-4">
                    <Icon className="w-6 h-6" style={{ color: i === 0 ? '#10b981' : accentFrom }} />
                    <span className="font-bold text-sm tracking-widest uppercase">{badge.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Pipeline Card */}
          <div className="relative">
            <div className="absolute -inset-10 rounded-full blur-[100px]" style={{ background: `${accentTo}0d` }} />
            <div className="relative bg-[#03081a] border border-white/10 rounded-[3rem] p-10 shadow-2xl font-mono">
              <div className="flex justify-between items-center mb-10 pb-6 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4" style={{ color: accentFrom }} />
                  <span className="text-[10px] text-gray-500">{pipelineLabel}</span>
                </div>
              </div>
              <div className="space-y-8">
                {pipelineStats.map((stat, i) => (
                  <div key={i} className="relative">
                    <p className="text-[9px] text-gray-500 uppercase mb-2">{stat.label}</p>
                    <div className="flex items-center gap-4">
                      <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full rounded-full animate-pulse"
                          style={{ width: '85%', background: `linear-gradient(to right, ${accentFrom}, ${accentTo})` }} />
                      </div>
                      <span className="text-xs font-bold" style={{ color: accentFrom }}>{stat.value}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-12 p-6 rounded-xl border border-dashed" style={{ background: `${accentTo}0d`, borderColor: `${accentTo}4d` }}>
                <p className="text-[10px] text-gray-500">SYSTEM_LOG:</p>
                <p className="text-[11px] mt-1 text-emerald-400">{systemLog}</p>
              </div>
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