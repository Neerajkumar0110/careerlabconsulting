// app/industry/tech-ai/page.tsx
'use client';

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import ExecutionFlow from '@/components/sections/ExecutionFlow';
import { Cpu, Binary, Boxes, GitBranch, Zap, ArrowRight, Workflow, Microscope, Database } from 'lucide-react';
import { usePageContent } from '@/hooks/usePageContent';

// ── Types ─────────────────────────────────────────────────────────────────────
interface FeatureCard  { title: string; desc: string; icon: string }
interface ClusterStat  { label: string; value: string }
interface LogLine      { text: string; color: string }
interface DetailPoint  { title: string; icon: string }

function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

const ICON_MAP: Record<string, React.ElementType> = { Binary, Workflow, Zap, Database, GitBranch, Boxes, Cpu, Microscope };

const DEFAULT_FEATURE_CARDS = JSON.stringify([
  { title: 'Model Fine-Tuning',       desc: 'Specialized LoRA and QLoRA adapters for Llama-3, Mistral, and specialized domain models.',           icon: 'Binary'   },
  { title: 'Agentic Workflows',        desc: 'Developing autonomous swarms using LangGraph and CrewAI for complex, multi-step reasoning.',         icon: 'Workflow' },
  { title: 'Inference Optimization',   desc: 'Quantization (GGUF/AWQ) and vLLM deployment to cut your API costs by up to 70%.',                   icon: 'Zap'      },
]);
const DEFAULT_CLUSTER_STATS = JSON.stringify([
  { label: 'GPU UTIL', value: '94%'  },
  { label: 'LATENCY',  value: '24ms' },
]);
const DEFAULT_CLUSTER_LOG = JSON.stringify([
  { text: '# Initializing Weight Optimization...', color: 'blue'    },
  { text: '[>] Loading model: Nexus-Alpha-7b-v2',  color: 'muted'   },
  { text: '[>] Quantization level: 4-bit (AWQ)',   color: 'muted'   },
  { text: '[>] Throughput: 142 tokens/sec',         color: 'emerald' },
  { text: '[>] Memory Footprint: 5.4GB VRAM',       color: 'muted'   },
]);
const DEFAULT_DETAIL_POINTS = JSON.stringify([
  { title: 'Custom Vector Retrieval (RAG)', icon: 'Database'  },
  { title: 'Evaluation Pipelines',          icon: 'GitBranch' },
  { title: 'Distributed Model Training',    icon: 'Boxes'     },
]);

const LOG_COLOR: Record<string, string> = {
  blue:    'text-blue-400',
  emerald: 'text-emerald-400',
  muted:   'text-gray-500 italic',
};

export default function TechAIIndustryPage() {
  const { get } = usePageContent('industry-tech-ai');

  const badgeText    = get('hero', 'badge_text',      'Advanced AI Engineering Vertical');
  const heroPl       = get('hero', 'headline_plain',  'FOR AI');
  const heroAcc      = get('hero', 'headline_accent', 'BUILDERS');
  const heroBody     = get('hero', 'body_text',       'We provide elite engineering support for AI companies.');
  const ctaLabel     = get('hero', 'cta_label',       'Accelerate Your Roadmap');
  const accentColor  = get('hero', 'accent_color',    '#3b82f6');
  const accentColor2 = get('hero', 'accent_color_2',  '#22d3ee');

  const featureCards = safeParse<FeatureCard[]>(get('features', 'items_json', DEFAULT_FEATURE_CARDS), []);

  const clusterPl    = get('cluster', 'headline_plain',     'Code-First');
  const clusterAcc   = get('cluster', 'headline_accent',    'Intelligence');
  const clusterBody  = get('cluster', 'body_text',          'We speak your language—Python, Rust, CUDA, and Mojo.');
  const panelLabel   = get('cluster', 'panel_label',        'CLUSTER_LOG_01');
  const logLines     = safeParse<LogLine[]>(get('cluster', 'log_json', DEFAULT_CLUSTER_LOG), []);
  const clusterStats = safeParse<ClusterStat[]>(get('cluster', 'stats_json', DEFAULT_CLUSTER_STATS), []);
  const detailPoints = safeParse<DetailPoint[]>(get('cluster', 'detail_points_json', DEFAULT_DETAIL_POINTS), []);

  const ctaHeadline  = get('cta', 'headline',  'Ship Your Models Faster');
  const ctaBody      = get('cta', 'body_text', 'Collaborate with our AI engineers at DLF Cyber City.');
  const ctaBtnLabel  = get('cta', 'btn_label', 'Sync on Slack');
  const ctaLocation  = get('cta', 'location',  'Engineer Hub: Gurugram, India');

  return (
    <main className="flex min-h-screen flex-col bg-[#020617] text-white overflow-x-hidden">
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full blur-[120px] -z-10"
          style={{ background: `${accentColor}1a` }} />
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-8 backdrop-blur-md"
            style={{ background: `${accentColor}1a`, borderColor: `${accentColor}33` }}>
            <Microscope className="w-4 h-4" style={{ color: accentColor }} />
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: accentColor }}>{badgeText}</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-tight uppercase">
            {heroPl}<br />
            <span className="text-transparent bg-clip-text italic"
              style={{ backgroundImage: `linear-gradient(to right, ${accentColor}, ${accentColor2}, #6366f1)` }}>
              {heroAcc}
            </span>
          </h1>
          <p className="max-w-3xl mx-auto text-gray-400 text-lg md:text-xl leading-relaxed mb-12">{heroBody}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-10 py-5 rounded-2xl font-bold transition-all shadow-xl flex items-center justify-center gap-2 text-white"
              style={{ background: accentColor, boxShadow: `0 20px 40px ${accentColor}33` }}>
              {ctaLabel} <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {featureCards.map((item, i) => {
            const Icon = ICON_MAP[item.icon] ?? Zap;
            return (
              <div key={i} className="group p-10 rounded-[2.5rem] border border-white/5 transition-all"
                style={{ background: `${accentColor}08` }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = `${accentColor}4d`)}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)')}>
                <div className="mb-6 p-4 rounded-2xl inline-block" style={{ background: `${accentColor}1a` }}>
                  <Icon className="w-8 h-8" style={{ color: accentColor }} />
                </div>
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-gray-500 leading-relaxed text-sm">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── CLUSTER SECTION ──────────────────────────────────────────────── */}
      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative order-2 lg:order-1">
            <div className="absolute -inset-10 rounded-full blur-[100px] pointer-events-none" style={{ background: `${accentColor}0d` }} />
            <div className="relative bg-[#03081a] border border-white/10 rounded-[3rem] p-8 shadow-2xl">
              <div className="flex items-center gap-2 mb-8 text-[10px] font-mono text-gray-500">
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: accentColor }} />
                {panelLabel}
              </div>
              <div className="space-y-4 font-mono text-xs">
                {logLines.map((line, i) => (
                  <div key={i} className={LOG_COLOR[line.color] ?? 'text-gray-400'}>{line.text}</div>
                ))}
              </div>
              <div className="mt-8 pt-8 border-t border-white/5 grid grid-cols-2 gap-4">
                {clusterStats.map((stat, i) => (
                  <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/5">
                    <p className="text-[10px] text-gray-500">{stat.label}</p>
                    <p className="text-xl font-bold">{stat.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="text-4xl md:text-6xl font-black mb-8 italic tracking-tighter uppercase">
              {clusterPl}<br />{clusterAcc}
            </h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">{clusterBody}</p>
            <div className="space-y-6">
              {detailPoints.map((pt, idx) => {
                const Icon = ICON_MAP[pt.icon] ?? Database;
                return (
                  <div key={idx} className="flex items-center gap-4 group">
                    <div className="p-3 rounded-xl bg-white/5 transition-all group-hover:text-white"
                      style={{}}>
                      <Icon className="transition-colors" style={{ color: accentColor }} />
                    </div>
                    <span className="font-bold text-lg">{pt.title}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <div className="py-12 border-y border-white/5"><ExecutionFlow /></div>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto border rounded-[4rem] p-12 md:p-24 text-center backdrop-blur-3xl relative overflow-hidden"
          style={{ background: `linear-gradient(to bottom right, ${accentColor}66, #1e1b4b66)`, borderColor: `${accentColor}33` }}>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-7xl font-black mb-8 italic tracking-tighter uppercase leading-tight">{ctaHeadline}</h2>
            <p className="text-lg md:text-xl mb-12 max-w-2xl mx-auto" style={{ color: 'rgba(219,234,254,0.7)' }}>{ctaBody}</p>
            <div className="flex flex-col items-center gap-6">
              <button className="bg-white px-16 py-6 rounded-full font-black text-2xl hover:scale-110 transition-all shadow-2xl uppercase"
                style={{ color: accentColor }}>
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