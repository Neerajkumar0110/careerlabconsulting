// app/industry/tech-cloud/page.tsx
'use client';

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import ExecutionFlow from '@/components/sections/ExecutionFlow';
import SuccessStories from '@/components/sections/SuccessStories';
import { Cloud, Cpu, Infinity, Terminal, Database, Zap, ArrowRight, ShieldCheck, Server } from 'lucide-react';
import { usePageContent } from '@/hooks/usePageContent';

// ── Types ─────────────────────────────────────────────────────────────────────
interface FeatureCard  { title: string; desc: string; icon: string }
interface InfraStat    { label: string; value: string; color: string }
interface DetailPoint  { title: string; desc: string; icon: string }

function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

const ICON_MAP: Record<string, React.ElementType> = { Terminal, Infinity, Cpu, Database, ShieldCheck, Zap, Cloud, Server };

const STAT_COLOR_MAP: Record<string, string> = {
  indigo:  'bg-indigo-500/10 text-indigo-400',
  emerald: 'bg-emerald-500/10 text-emerald-400',
  blue:    'bg-blue-500/10 text-blue-400',
};

const DEFAULT_FEATURE_CARDS = JSON.stringify([
  { title: 'AI-Native SaaS Features',   desc: 'From semantic search to generative content tools, we integrate LLMs directly into your product DNA.',               icon: 'Terminal'  },
  { title: 'Autonomous DevOps',          desc: 'Self-healing infrastructure and AI-driven monitoring to predict outages before they affect your SLA.',               icon: 'Infinity'  },
  { title: 'GPU Cloud Orchestration',    desc: 'Building proprietary inference layers to help you offer AI-as-a-Service to your own customers.',                    icon: 'Cpu'       },
]);
const DEFAULT_INFRA_STATS = JSON.stringify([
  { label: 'Vector Database Sync',  value: '99.9% Match', color: 'indigo'  },
  { label: 'Token Cost Efficiency', value: '-34.2%',      color: 'emerald' },
  { label: 'Auto-Scaling Latency',  value: '14ms',        color: 'blue'    },
]);
const DEFAULT_DETAIL_POINTS = JSON.stringify([
  { title: 'Managed RAG',  desc: 'Retrieval Augmented Generation at scale.', icon: 'Database'    },
  { title: 'SOC2/HIPAA',   desc: 'Security-first infrastructure.',           icon: 'ShieldCheck' },
]);

export default function TechCloudIndustryPage() {
  const { get } = usePageContent('industry-tech-cloud');

  const badgeText     = get('hero', 'badge_text',      'SaaS & Infrastructure Vertical');
  const heroPl        = get('hero', 'headline_plain',  'AI-DRIVEN');
  const heroAcc       = get('hero', 'headline_accent', 'TECH STACKS');
  const heroBody      = get('hero', 'body_text',       'Empowering the creators of the digital world.');
  const ctaLabel      = get('hero', 'cta_label',       'Modernize Your Platform');
  const accentColor   = get('hero', 'accent_color',    '#6366f1');
  const accentColor2  = get('hero', 'accent_color_2',  '#818cf8');

  const featureCards  = safeParse<FeatureCard[]>(get('features', 'items_json', DEFAULT_FEATURE_CARDS), []);

  const infraPl       = get('infra', 'headline_plain',  'Scale Your');
  const infraAcc      = get('infra', 'headline_accent', 'Innovation');
  const infraBody     = get('infra', 'body_text',       'We specialize in deep integrations with modern cloud stacks.');
  const panelTitle    = get('infra', 'panel_title',     'INFRA_ORCHESTRATOR_v4');
  const infraStats    = safeParse<InfraStat[]>(get('infra', 'stats_json', DEFAULT_INFRA_STATS), []);
  const detailPoints  = safeParse<DetailPoint[]>(get('infra', 'detail_points_json', DEFAULT_DETAIL_POINTS), []);

  const ctaHeadline   = get('cta', 'headline',  'Built for Scale');
  const ctaBody       = get('cta', 'body_text', 'Our cloud architects at DLF Cyber City are ready to transform your SaaS into an AI powerhouse.');
  const ctaBtnLabel   = get('cta', 'btn_label', 'UPGRADE YOUR STACK');
  const ctaLocation   = get('cta', 'location',  'Location: Cyber Hub, Gurugram');

  return (
    <main className="flex min-h-screen flex-col bg-[#020617] text-white overflow-x-hidden">
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[120px] -z-10" style={{ background: `${accentColor}1a` }} />
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-8 backdrop-blur-md"
            style={{ background: `${accentColor}1a`, borderColor: `${accentColor}33` }}>
            <Cloud className="w-4 h-4" style={{ color: accentColor }} />
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: accentColor }}>{badgeText}</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-tight">
            {heroPl}<br />
            <span className="text-transparent bg-clip-text italic"
              style={{ backgroundImage: `linear-gradient(to right, ${accentColor}, ${accentColor2}, #3b82f6)` }}>
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
                <div className="mb-6 p-4 rounded-2xl inline-block transition-all" style={{ background: `${accentColor}1a` }}>
                  <Icon className="w-8 h-8" style={{ color: accentColor }} />
                </div>
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-gray-500 leading-relaxed text-sm">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── INFRA SECTION ────────────────────────────────────────────────── */}
      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <div className="absolute -inset-10 rounded-full blur-[100px] pointer-events-none" style={{ background: `${accentColor}0d` }} />
            <div className="relative bg-[#03081a] border border-white/10 rounded-[3rem] p-10 shadow-2xl">
              <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-6">
                <h3 className="text-sm font-mono tracking-widest" style={{ color: accentColor }}>{panelTitle}</h3>
                <Server className="w-4 h-4 text-gray-500" />
              </div>
              <div className="space-y-6">
                {infraStats.map((stat, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <span className="text-xs text-gray-400 uppercase">{stat.label}</span>
                    <span className={`text-[10px] px-2 py-1 rounded ${STAT_COLOR_MAP[stat.color] ?? 'bg-white/5 text-white'}`}>{stat.value}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex justify-center">
                <div className="w-full h-24 rounded-xl border border-dashed flex items-center justify-center"
                  style={{ background: `${accentColor}08`, borderColor: `${accentColor}33` }}>
                  <Zap className="w-6 h-6 animate-pulse" style={{ color: accentColor }} />
                </div>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-4xl md:text-6xl font-black mb-8 italic tracking-tighter uppercase">
              {infraPl}<br />{infraAcc}
            </h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">{infraBody}</p>
            <div className="grid grid-cols-2 gap-6 mt-8">
              {detailPoints.map((pt, i) => {
                const Icon = ICON_MAP[pt.icon] ?? ShieldCheck;
                return (
                  <div key={i} className="flex items-start gap-3">
                    <Icon className="shrink-0 mt-1" style={{ color: accentColor }} />
                    <div>
                      <h4 className="font-bold">{pt.title}</h4>
                      <p className="text-xs text-gray-500">{pt.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <div className="py-12 border-y border-white/5"><ExecutionFlow /></div>
      <SuccessStories />

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto border rounded-[4rem] p-12 md:p-24 text-center backdrop-blur-3xl relative overflow-hidden"
          style={{ background: `linear-gradient(to bottom right, ${accentColor}66, #1e1b4b66)`, borderColor: `${accentColor}33` }}>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-7xl font-black mb-8 italic tracking-tighter uppercase leading-tight">{ctaHeadline}</h2>
            <p className="text-lg md:text-xl mb-12 max-w-2xl mx-auto" style={{ color: 'rgba(199,210,254,0.7)' }}>{ctaBody}</p>
            <div className="flex flex-col items-center gap-6">
              <button className="bg-white px-16 py-6 rounded-full font-black text-2xl hover:scale-110 transition-all shadow-2xl"
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