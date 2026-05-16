'use client';

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import { usePageContent } from '@/hooks/usePageContent';
import {
  Zap, Layers, Cpu, Activity, Database, UnfoldVertical, ArrowRight,
} from 'lucide-react';

// ── Helpers ───────────────────────────────────────────────────────────────────
function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

// ── Types ─────────────────────────────────────────────────────────────────────
interface PipelineStep  { title: string; val: string; icon: string }
interface FeatureItem   { title: string; text: string }
interface ComputeStat   { label: string; value: string }

// ── Icon maps ─────────────────────────────────────────────────────────────────
const ICON_MAP: Record<string, React.ElementType> = {
  Database, Layers, Zap, UnfoldVertical, Activity, Cpu,
};

// ── Defaults ──────────────────────────────────────────────────────────────────
const DEFAULT_PIPELINE_STEPS = JSON.stringify([
  { title: 'Data Curation',      val: 'Cleanse', icon: 'Database'       },
  { title: 'Weight Tuning',      val: 'Forge',   icon: 'Layers'         },
  { title: 'RLHF Loop',          val: 'Align',   icon: 'UnfoldVertical' },
  { title: 'Model Quantization', val: 'Deploy',  icon: 'Zap'            },
]);
const DEFAULT_FEATURES = JSON.stringify([
  { title: 'Quantized Distillation', text: 'Compressing 70B models into 8-bit or 4-bit precision with zero accuracy loss.'          },
  { title: 'Custom RLHF',            text: 'Aligning models to your corporate ethics and safety guidelines through human feedback.' },
  { title: 'Vector Embeddings',      text: 'Training custom embedding models for industry-specific semantic search.'                },
]);
const DEFAULT_COMPUTE_STATS = JSON.stringify([
  { label: 'Total FLOPs', value: '420.5 Peta' },
  { label: 'Interconnect', value: 'NVLink 4.0' },
  { label: 'SLA Uptime',   value: '99.995%'    },
]);

export default function NeuralTrainingPage() {
  const { get } = usePageContent('home-neural-training');

  // ── Hero ──────────────────────────────────────────────────────────────────
  const accentColor      = get('hero', 'accent_color',       '#f59e0b');
  const badgeText        = get('hero', 'badge_text',         'Hyper-Parameter Optimization Active');
  const heroPl           = get('hero', 'headline_plain',     'Neural');
  const heroAcc          = get('hero', 'headline_accent',    'Distillation');
  const heroBody         = get('hero', 'body_text',          'Generic models aren\'t enough for the enterprise. We forge custom weights using LoRA, QLoRA, and Full-Parameter Tuning to bake your proprietary domain expertise into the model\'s core architecture.');
  const heroBtnPrimary   = get('hero', 'btn_primary_label',  'Start Training Run');
  const heroBtnSecondary = get('hero', 'btn_secondary_label','View GPU Clusters');

  // ── Pipeline Steps ────────────────────────────────────────────────────────
  const pipelineSteps    = safeParse<PipelineStep[]>(get('pipeline', 'steps_json', DEFAULT_PIPELINE_STEPS), []);

  // ── Synapse Section ───────────────────────────────────────────────────────
  const synapseHeadline  = get('synapse', 'headline',         'Refining The Synapse.');
  const synapseBody      = get('synapse', 'body_text',        'We specialize in Parameter-Efficient Fine-Tuning (PEFT). This allows us to deliver high-performance, specialized models that fit on consumer hardware without sacrificing the reasoning depth of foundation models.');
  const terminalBadge    = get('synapse', 'terminal_badge',   'LIVE_LOSS_CONVERGENCE');
  const terminalCluster  = get('synapse', 'terminal_cluster', 'Cluster: H100_NODE_4');
  const lrValue          = get('synapse', 'lr_value',         '2e-5');
  const valError         = get('synapse', 'val_error',        '0.0042');
  const terminalLog      = get('synapse', 'terminal_log',     'Applying Low-Rank Adaptation (LoRA) to Self-Attention layers... Memory efficient mode enabled.');
  const features         = safeParse<FeatureItem[]>(get('synapse', 'features_json', DEFAULT_FEATURES), []);

  // ── Compute Section ───────────────────────────────────────────────────────
  const computeHeadline  = get('compute', 'headline',         'Massive Scale Compute');
  const computeSubline   = get('compute', 'subline',          'Dedicated H100 and A100 clusters optimized for rapid iteration.');
  const computeStats     = safeParse<ComputeStat[]>(get('compute', 'stats_json', DEFAULT_COMPUTE_STATS), []);

  // ── CTA ───────────────────────────────────────────────────────────────────
  const ctaHeadline      = get('cta', 'headline',            'Own Your Intelligence');
  const ctaBody          = get('cta', 'body_text',           'Stop relying on public APIs. Train a model that is legally and technically yours.');
  const ctaBtnLabel      = get('cta', 'btn_label',           'Schedule Training Audit');
  const ctaFooterNote    = get('cta', 'footer_note',         'Compute Node // Gurugram, India');

  return (
    <main className="min-h-screen bg-[#020617] text-slate-100 overflow-x-hidden font-sans"
      style={{ '--selection-bg': `${accentColor}4d` } as React.CSSProperties}>
      <Navbar />

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-16 md:pt-52 md:pb-32 px-6">
        <div className="absolute inset-0 -z-10"
          style={{ background: `radial-gradient(circle at 50% 40%, ${accentColor}1e 0%, transparent 60%)` }} />
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full mb-6 backdrop-blur-xl"
            style={{ background: `${accentColor}1a`, border: `1px solid ${accentColor}33` }}>
            <Cpu className="w-3.5 h-3.5 animate-pulse" style={{ color: accentColor }} />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]" style={{ color: `${accentColor}cc` }}>
              {badgeText}
            </span>
          </div>
          <h1 className="text-6xl md:text-9xl font-black tracking-tighter leading-[0.85] uppercase mb-10">
            {heroPl} <br />
            <span className="italic" style={{
              backgroundImage: `linear-gradient(to right, ${accentColor}cc, ${accentColor}, #ea580c)`,
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>{heroAcc}</span>
          </h1>
          <p className="max-w-2xl text-slate-400 text-base md:text-xl leading-relaxed mb-12 font-light">{heroBody}</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all hover:scale-105 shadow-2xl flex items-center justify-center gap-2 text-white"
              style={{ background: accentColor, boxShadow: `0 25px 50px ${accentColor}4d` }}>
              {heroBtnPrimary} <Zap className="w-4 h-4" />
            </button>
            <button className="px-10 py-5 bg-white/5 border border-white/10 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-white/10 transition-all backdrop-blur-md">
              {heroBtnSecondary}
            </button>
          </div>
        </div>
      </section>

      {/* ── PIPELINE STEPS ────────────────────────────────────────────────── */}
      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {pipelineSteps.map((step, i) => {
              const Icon = ICON_MAP[step.icon] ?? Zap;
              return (
                <div key={i} className="p-8 rounded-[2rem] bg-slate-950 border border-white/5 transition-all group text-center"
                  onMouseEnter={e => (e.currentTarget.style.borderColor = `${accentColor}66`)}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)')}>
                  <div className="mb-4 flex justify-center transition-transform group-hover:scale-110">
                    <Icon style={{ color: `${accentColor}80` }} />
                  </div>
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Step 0{i + 1}</h4>
                  <p className="text-xl font-bold text-white mb-1 uppercase">{step.val}</p>
                  <p className="text-[11px] text-slate-500">{step.title}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SYNAPSE SECTION ───────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-[#010610]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Terminal Card */}
          <div className="relative group order-2 lg:order-1">
            <div className="absolute -inset-10 rounded-full blur-[120px] transition-colors"
              style={{ background: `${accentColor}0d` }} />
            <div className="relative bg-black/60 border rounded-[3rem] p-8 md:p-12 shadow-2xl font-mono"
              style={{ borderColor: `${accentColor}33` }}>
              <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4 text-[10px]">
                <span className="font-black tracking-widest animate-pulse" style={{ color: accentColor }}>{terminalBadge}</span>
                <span className="text-slate-500 uppercase">{terminalCluster}</span>
              </div>
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border" style={{ background: `${accentColor}0d`, borderColor: `${accentColor}33` }}>
                  <p className="text-[8px] text-slate-500 uppercase font-black">Learning Rate</p>
                  <p className="text-xl font-black tracking-tighter" style={{ color: accentColor }}>{lrValue}</p>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                  <p className="text-[8px] text-slate-500 uppercase font-black">Validation Error</p>
                  <p className="text-xl font-black italic text-emerald-400">{valError}</p>
                </div>
              </div>
              <div className="mt-6 p-4 bg-slate-900/50 rounded-xl border border-dashed border-white/10 text-[9px] text-slate-400">
                <span className="mr-2 font-bold tracking-tighter" style={{ color: accentColor }}>LOG:</span>
                {terminalLog}
              </div>
            </div>
          </div>
          {/* Text */}
          <div className="order-1 lg:order-2">
            <h2 className="text-4xl md:text-7xl font-black mb-8 italic tracking-tighter uppercase leading-none text-white">
              {synapseHeadline.split(' ').map((word, i, arr) => (
                <React.Fragment key={i}>
                  {i === arr.length - 1
                    ? <span style={{ color: accentColor }}>{word}</span>
                    : <>{word}<br /></>}
                </React.Fragment>
              ))}
            </h2>
            <p className="text-slate-400 text-lg mb-8 leading-relaxed font-light">{synapseBody}</p>
            <div className="space-y-4 mt-10">
              {features.map((feat, idx) => (
                <div key={idx} className="flex gap-4 p-5 rounded-2xl bg-white/5 border border-white/5 transition-all cursor-default group"
                  onMouseEnter={e => (e.currentTarget.style.borderColor = `${accentColor}33`)}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)')}>
                  <div className="w-1.5 h-1.5 rounded-full mt-2 transition-transform group-hover:scale-150" style={{ background: accentColor }} />
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-widest mb-1" style={{ color: `${accentColor}cc` }}>{feat.title}</h4>
                    <p className="text-slate-500 text-xs leading-relaxed">{feat.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── COMPUTE ───────────────────────────────────────────────────────── */}
      <section className="py-24 border-y border-white/5" style={{ background: `${accentColor}02` }}>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Activity className="w-12 h-12 mx-auto mb-8" style={{ color: `${accentColor}80` }} />
          <h2 className="text-3xl font-black uppercase tracking-[0.3em] text-white mb-6">{computeHeadline}</h2>
          <p className="text-slate-500 text-sm mb-12 italic">{computeSubline}</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {computeStats.map((stat, i) => (
              <div key={i} className="p-6 rounded-3xl bg-slate-900/50 border border-white/5">
                <p className="text-xs font-bold text-slate-500 uppercase mb-2">{stat.label}</p>
                <p className="text-2xl font-black text-white">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto border rounded-[3rem] p-12 md:p-24 text-center backdrop-blur-3xl relative overflow-hidden shadow-3xl"
          style={{ background: `linear-gradient(to bottom right, ${accentColor}14, #000)`, borderColor: `${accentColor}4d`, boxShadow: `0 0 80px ${accentColor}1a` }}>
          <div className="relative z-10">
            <h2 className="text-5xl md:text-8xl font-black mb-8 italic tracking-tighter uppercase leading-tight">{ctaHeadline}</h2>
            <p className="text-lg md:text-xl mb-12 max-w-xl mx-auto" style={{ color: `${accentColor}b3` }}>{ctaBody}</p>
            <div className="flex flex-col items-center gap-6">
              <button className="px-16 py-7 rounded-2xl font-black text-2xl hover:scale-105 transition-all shadow-2xl uppercase italic text-white"
                style={{ background: accentColor }}>
                {ctaBtnLabel}
              </button>
              <div className="font-mono text-[10px] tracking-[0.4em] uppercase" style={{ color: `${accentColor}80` }}>
                {ctaFooterNote}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}