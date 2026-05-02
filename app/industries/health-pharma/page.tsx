'use client';

import React from 'react';
import {
  Dna, FlaskConical, Microscope, Database,
  ShieldCheck, Search, ArrowRight, Stethoscope, Network,
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import ExecutionFlow from '@/components/sections/ExecutionFlow';
import SuccessStories from '@/components/sections/SuccessStories';
import { usePageContent } from '@/hooks/usePageContent';

function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

interface FeatureCard { title: string; desc: string; icon: string }
interface PipelinePoint { label: string; icon: string }
interface MetricItem { label: string; value: string; status: 'high' | 'low' | 'neutral'; color: string }

const ICON_MAP: Record<string, React.ElementType> = {
  Dna, FlaskConical, Microscope, Database, ShieldCheck, Search, Network, Stethoscope,
};

const DEFAULT_FEATURES = JSON.stringify([
  { title: 'Molecular Design',        desc: 'Generative models that propose novel chemical structures optimized for target binding affinity and low toxicity.', icon: 'Dna'         },
  { title: 'Clinical Trial AI',       desc: 'Deep learning systems that analyze EHR data to identify ideal candidates for phase II/III trials, reducing dropouts.', icon: 'Search'      },
  { title: 'Regulatory Intelligence', desc: 'AI agents that automate the generation of FDA/EMA submission documentation and ensure trial compliance.', icon: 'ShieldCheck' },
], null, 2);
const DEFAULT_PIPELINE = JSON.stringify([
  { label: 'High-Throughput Virtual Screening',  icon: 'Database' },
  { label: 'Protein-Ligand Interaction Models',  icon: 'Network'  },
  { label: 'Adverse Effect Prediction',          icon: 'Microscope' },
], null, 2);
const DEFAULT_METRICS = JSON.stringify([
  { label: 'Target Protein Binding', value: '0.962', status: 'high',    color: '#3b82f6' },
  { label: 'Toxicity Risk',          value: 'Minimal',status: 'low',    color: '#10b981' },
  { label: 'Solubility',             value: 'Optimal',status: 'neutral', color: '#6366f1' },
], null, 2);

export default function PharmaPage() {
  const { get } = usePageContent('industry-pharma');

  // Hero
  const accentFrom    = get('hero', 'accent_from',     '#3b82f6');
  const accentTo      = get('hero', 'accent_to',       '#8b5cf6');
  const badgeText     = get('hero', 'badge_text',      'Life Sciences & R&D Vertical');
  const heroPl        = get('hero', 'headline_plain',  'AI DRUG');
  const heroAcc       = get('hero', 'headline_accent', 'DISCOVERY');
  const heroBody      = get('hero', 'body_text',       'Reducing the path to market from years to months. We build generative AI models for molecular design, protein folding prediction, and intelligent clinical trial patient matching.');
  const heroBtnLabel  = get('hero', 'btn_label',       'Accelerate R&D');

  // Features
  const featuresItems = safeParse<FeatureCard[]>(get('features', 'items_json', DEFAULT_FEATURES), []);

  // Intelligence
  const intPl         = get('intelligence', 'headline_plain',   'Biological');
  const intAcc        = get('intelligence', 'headline_accent',  'Intelligence');
  const intBody       = get('intelligence', 'body_text',        'Our AI architectures integrate AlphaFold-derived insights with custom proprietary datasets to predict biological interactions with over 94% accuracy, significantly de-risking the laboratory phase.');
  const pipelineItems = safeParse<PipelinePoint[]>(get('intelligence', 'pipeline_json', DEFAULT_PIPELINE), []);
  const metrics       = safeParse<MetricItem[]>(get('intelligence', 'metrics_json', DEFAULT_METRICS), []);
  const engineLabel   = get('intelligence', 'engine_label',    'Prediction_Engine_v4.2');
  const insightQuote  = get('intelligence', 'insight_quote',   'Candidate molecule #8421 shows superior blood-brain barrier penetration compared to control group.');

  // CTA
  const ctaHeadline   = get('cta', 'headline',      'The Future Of Life Sciences');
  const ctaBody       = get('cta', 'body_text',     'Collaborate with our R&D engineers at DLF Cyber City to bring life-saving treatments to market faster.');
  const ctaBtnLabel   = get('cta', 'btn_label',     'START DRUG-AI BUILD');
  const ctaLocation   = get('cta', 'location_text', 'Pharma Lab Hub: Gurugram, India');

  return (
    <main className="flex min-h-screen flex-col bg-[#020617] text-white overflow-x-hidden">
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        <div className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full blur-[120px] -z-10"
          style={{ background: `${accentFrom}0d` }} />
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-8 backdrop-blur-md"
            style={{ background: `${accentFrom}1a`, borderColor: `${accentFrom}33` }}>
            <FlaskConical className="w-4 h-4" style={{ color: accentFrom }} />
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
            const Icon = ICON_MAP[item.icon] ?? Dna;
            return (
              <div key={i} className="group p-10 rounded-[2.5rem] border border-white/5 transition-all"
                style={{ background: `${accentFrom}08` }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = `${accentFrom}4d`)}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)')}>
                <div className="mb-6 p-4 rounded-2xl inline-block transition-all" style={{ background: `${accentFrom}1a` }}>
                  <Icon className="w-8 h-8" style={{ color: accentFrom }} />
                </div>
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-gray-500 leading-relaxed text-sm">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── INTELLIGENCE ─────────────────────────────────────────────── */}
      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Text */}
          <div>
            <h2 className="text-4xl md:text-6xl font-black mb-8 italic tracking-tighter uppercase leading-tight">
              {intPl}<br /><span style={{ color: accentFrom }}>{intAcc}</span>
            </h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">{intBody}</p>
            <div className="space-y-4 mt-8">
              {pipelineItems.map((point, idx) => {
                const Icon = ICON_MAP[point.icon] ?? Database;
                return (
                  <div key={idx} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all cursor-default">
                    <Icon className="w-5 h-5" style={{ color: accentFrom }} />
                    <span className="font-bold">{point.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Prediction Engine Card */}
          <div className="relative">
            <div className="absolute -inset-10 rounded-full blur-[100px]" style={{ background: `${accentFrom}0d` }} />
            <div className="relative bg-[#03081a] border border-white/10 rounded-[3rem] p-10 shadow-2xl">
              <div className="mb-8 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: accentFrom }} />
                  <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">{engineLabel}</span>
                </div>
                <Stethoscope className="w-4 h-4 text-gray-700" />
              </div>
              <div className="space-y-6">
                {metrics.map((m, i) => (
                  <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/5">
                    <p className="text-[10px] text-gray-500 uppercase mb-2">{m.label}</p>
                    <div className="flex justify-between items-end">
                      <span className="text-2xl font-bold" style={{ color: m.color }}>{m.value}</span>
                      {i === 0 && <span className="text-[10px] font-mono text-emerald-400 pb-1">HIGH_AFFINITY</span>}
                    </div>
                    {i === 0 && (
                      <div className="mt-2 h-1 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full w-[96%] rounded-full" style={{ background: accentFrom }} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-8 p-6 rounded-2xl border border-dashed" style={{ background: `${accentTo}0d`, borderColor: `${accentTo}33` }}>
                <p className="text-xs italic" style={{ color: `${accentTo}cc` }}>&ldquo;{insightQuote}&rdquo;</p>
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