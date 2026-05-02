// app/services/custom-ai/page.tsx
'use client';

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import ExecutionFlow from '@/components/sections/ExecutionFlow';
import FeatureGrid from '@/components/sections/FeatureGrid';
import {
  Code2, Cpu, Database, GitBranch, Layers,
  Terminal, Sparkles, ArrowRight, Blocks,
} from 'lucide-react';
import { usePageContent } from '@/hooks/usePageContent';

// ── Icon maps ─────────────────────────────────────────────────────────────────
const CARD_ICON_MAP: Record<string, React.ElementType> = { Layers, Blocks, Cpu, Code2, Sparkles, Database };

// ── Types ─────────────────────────────────────────────────────────────────────
interface FeatureCard { title: string; desc: string; icon: string }

function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

// ── Defaults ──────────────────────────────────────────────────────────────────
const DEFAULT_FEATURE_CARDS = JSON.stringify([
  { title: 'RAG Architectures',  desc: 'Connecting LLMs to your private data sources with sub-second retrieval latency.',      icon: 'Layers'   },
  { title: 'Agentic Workflows',  desc: 'Autonomous agents that can use tools, call APIs, and perform multi-step reasoning.',   icon: 'Blocks'   },
  { title: 'Fine-Tuning',        desc: 'Training models on your industry-specific jargon, style, and domain logic.',           icon: 'Cpu'      },
  { title: 'AI-API Middleware',  desc: 'Custom bridges that connect your existing ERP/CRM systems to neural compute.',         icon: 'Code2'    },
  { title: 'Edge AI',            desc: 'Deploying lightweight, high-performance models for on-premise or mobile environments.',icon: 'Sparkles' },
  { title: 'Vector Ops',         desc: 'Scalable vector database management for handling billions of embeddings.',             icon: 'Database' },
]);

export default function CustomAIDevelopmentPage() {
  const { get } = usePageContent('services-custom-ai');

  // ── CMS values ────────────────────────────────────────────────────────────
  const accentColor     = get('hero', 'accent_color',          '#3b82f6');
  const accentColorTo   = get('hero', 'accent_color_to',       '#6366f1');
  const badgeText       = get('hero', 'badge_text',            'Full-Stack AI Engineering');
  const headlineLine1   = get('hero', 'headline_line1',        'BUILDING');
  const headlineAccent  = get('hero', 'headline_accent',       'PROPRIETARY AI');
  const heroBody        = get('hero', 'body_text',             'Standard LLMs are just the beginning. We build custom-trained models, fine-tuned agents, and scalable AI infrastructure tailored to your specific enterprise datasets.');
  const btnPrimaryLabel = get('hero', 'btn_primary_label',     'Engineer My Solution');
  const terminalLabel   = get('hero', 'terminal_label',        'Model_Training_Active...');
  const paramCount      = get('hero', 'param_count',           '70B+ Fine-Tuned');

  const featuresHeadline = get('features', 'headline',         'Specialized Vertical Build');
  const featuresSub      = get('features', 'subheading',       'From RAG pipelines to multi-agent swarms.');
  const featureCards     = safeParse<FeatureCard[]>(get('features', 'cards_json', DEFAULT_FEATURE_CARDS), []);

  const pipelineHeadline = get('pipeline', 'headline',         'The Development Pipeline');

  const ctaHeadline      = get('cta', 'headline',              'Code Your Advantage');
  const ctaBody          = get('cta', 'body_text',             'Our engineering team at DLF Cyber City is ready to build your proprietary AI core.');
  const ctaBtnLabel      = get('cta', 'btn_label',             'START BUILDING');
  const ctaContact       = get('cta', 'contact_number',        '+91 870023 6923');

  return (
    <main className="flex min-h-screen flex-col bg-[#020617] text-white overflow-x-hidden">
      <Navbar />

      {/* ── HERO ────────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[120px] -z-10"
          style={{ background: `${accentColor}1a` }} />
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 backdrop-blur-md"
              style={{ background: `${accentColor}1a`, border: `1px solid ${accentColor}33` }}>
              <Code2 className="w-4 h-4" style={{ color: accentColor }} />
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: accentColor }}>{badgeText}</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-tight">
              {headlineLine1} <br />
              <span className="text-transparent bg-clip-text italic"
                style={{ backgroundImage: `linear-gradient(to right, ${accentColor}, ${accentColorTo})` }}>
                {headlineAccent}
              </span>
            </h1>
            <p className="max-w-xl text-gray-400 text-lg md:text-xl leading-relaxed mb-12">{heroBody}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-10 py-5 rounded-2xl font-bold transition-all shadow-xl flex items-center justify-center gap-2 text-white"
                style={{ background: accentColor, boxShadow: `0 20px 40px ${accentColor}33` }}>
                {btnPrimaryLabel} <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Hero terminal widget */}
          <div className="relative group">
            <div className="absolute -inset-1 rounded-[3rem] blur opacity-25 group-hover:opacity-40 transition duration-1000"
              style={{ backgroundImage: `linear-gradient(to right, ${accentColor}, ${accentColorTo})` }} />
            <div className="relative bg-[#03081a] border border-white/10 rounded-[3rem] p-8 overflow-hidden">
              <div className="flex items-center gap-3 mb-10 pb-4 border-b border-white/5">
                <Terminal className="w-5 h-5" style={{ color: accentColor }} />
                <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">{terminalLabel}</span>
              </div>
              <div className="space-y-6">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400">Parameter Count</span>
                  <span className="font-bold" style={{ color: accentColor }}>{paramCount}</span>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full w-3/4 animate-pulse rounded-full" style={{ background: accentColor }} />
                </div>
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                    <Database className="w-5 h-5 mb-2" style={{ color: accentColor }} />
                    <p className="text-[10px] text-gray-500 uppercase">Vector Database</p>
                    <p className="text-sm font-bold">Integrated</p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                    <GitBranch className="w-5 h-5 mb-2" style={{ color: accentColor }} />
                    <p className="text-[10px] text-gray-500 uppercase">Architecture</p>
                    <p className="text-sm font-bold">RAG-Optimized</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES GRID ───────────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold italic">{featuresHeadline}</h2>
            <p className="text-gray-500 mt-4 text-lg">{featuresSub}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featureCards.map((card, i) => {
              const Icon = CARD_ICON_MAP[card.icon] ?? Code2;
              return (
                <div key={i} className="p-10 rounded-[2.5rem] border border-white/5 hover:border-blue-500/30 transition-all group"
                  style={{ background: `${accentColor}08` }}>
                  <div className="mb-6 p-4 rounded-2xl inline-block transition-all group-hover:opacity-90"
                    style={{ background: `${accentColor}1a` }}>
                    <Icon className="w-6 h-6" style={{ color: accentColor }} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{card.title}</h3>
                  <p className="text-gray-500 leading-relaxed text-sm">{card.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── PIPELINE ────────────────────────────────────────────────────────── */}
      <div className="py-20 border-y border-white/5" style={{ background: '#03081a50' }}>
        <div className="max-w-7xl mx-auto px-6 text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold italic">{pipelineHeadline}</h2>
        </div>
        <div className="mt-20">
          <ExecutionFlow />
        </div>
      </div>

      <FeatureGrid />

      {/* ── CTA ─────────────────────────────────────────────────────────────── */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto border rounded-[4rem] p-12 md:p-24 text-center backdrop-blur-3xl relative overflow-hidden"
          style={{ background: `linear-gradient(to bottom right, ${accentColor}33, ${accentColorTo}33)`, borderColor: `${accentColor}33` }}>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-7xl font-black mb-8 italic tracking-tighter uppercase">{ctaHeadline}</h2>
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