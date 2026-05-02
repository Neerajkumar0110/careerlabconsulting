// app/industry/ip/page.tsx
'use client';

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import ExecutionFlow from '@/components/sections/ExecutionFlow';
import SuccessStories from '@/components/sections/SuccessStories';
import { usePageContent } from '@/hooks/usePageContent';
import {
  Lightbulb, Search, ShieldCheck, Zap, FileText, Globe,
  ArrowRight, Target, BarChart3,
} from 'lucide-react';

const ICON_MAP: Record<string, React.ElementType> = {
  Lightbulb, Search, ShieldCheck, Zap, FileText, Globe, Target, BarChart3,
};

interface Metric  { label: string; value: string; detail: string }
interface Feature { title: string; desc: string; icon: string }
interface Badge   { icon: string; label: string }

function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

const DEFAULT_METRICS = JSON.stringify([
  { label: 'Search Velocity',    value: '5,000+',    detail: 'Patents Analyzed/Sec'  },
  { label: 'Detection Recall',   value: '98.8%',     detail: 'Infringement Accuracy' },
  { label: 'Drafting Efficiency',value: '4x Faster', detail: 'Claims Generation'     },
  { label: 'FTO Analysis',       value: 'Real-time', detail: 'Freedom to Operate'    },
]);
const DEFAULT_FEATURES = JSON.stringify([
  { title: 'Semantic Prior Art',  desc: 'Moving beyond keywords. Our AI understands the engineering concepts behind your invention to find relevant prior art that traditional searches miss.', icon: 'Search'   },
  { title: 'Infringement Radar', desc: 'Continuous monitoring of new patent filings and product launches worldwide to detect potential infringements of your IP assets in real-time.',        icon: 'Target'   },
  { title: 'Smart Claim Drafting',desc: 'Assist your legal team in drafting robust patent claims that provide maximum protection while minimizing the risk of office action rejections.',     icon: 'FileText' },
]);
const DEFAULT_BADGES = JSON.stringify([
  { icon: 'Globe',     label: 'WIPO / USPTO / EPO Cross-Registry Sync'  },
  { icon: 'BarChart3', label: 'Automated Portfolio Valuation Metrics'     },
]);

export default function IntellectualPropertyAIPage() {
  const { get } = usePageContent('industry-ip');

  const badgeText       = get('hero', 'badge_text',      'IP Protection & Patent Intelligence Vertical');
  const headlinePlain   = get('hero', 'headline_plain',  'Blueprinting');
  const headlineAccent  = get('hero', 'headline_accent', 'INTELLECT');
  const heroBody        = get('hero', 'body_text',       'Protect your competitive edge at scale.');
  const ctaLabel        = get('hero', 'cta_label',       'Audit Your IP Portfolio');
  const accentColor     = get('hero', 'accent_color',    '#6366f1');
  const metrics         = safeParse<Metric[]>(get('hero', 'metrics_json', DEFAULT_METRICS), []);

  const features        = safeParse<Feature[]>(get('features', 'items_json', DEFAULT_FEATURES), []);

  const ddHeadline      = get('defensive_depth', 'headline',          'Defensive Depth');
  const ddBody          = get('defensive_depth', 'body_text',         '');
  const badges          = safeParse<Badge[]>(get('defensive_depth', 'badges_json', DEFAULT_BADGES), []);
  const innovScore      = get('defensive_depth', 'innovation_score',  'High (8.4)');
  const riskOverlap     = get('defensive_depth', 'risk_overlap',      '4.2%');
  const architectLog    = get('defensive_depth', 'architect_log',     '');

  const ctaHeadline     = get('cta', 'headline',      'Secure Your Legacy');
  const ctaBody         = get('cta', 'body_text',     '');
  const ctaBtnLabel     = get('cta', 'btn_label',     'Fortify My Patents');
  const ctaLocation     = get('cta', 'location_text', 'IP Strategy Center: Gurugram, India');

  return (
    <main className="flex min-h-screen flex-col bg-[#020617] text-white overflow-x-hidden">
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] rounded-full -z-10"
          style={{ background: `${accentColor}0f`, filter: 'blur(140px)' }} />
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-8 backdrop-blur-md"
            style={{ background: `${accentColor}1a`, borderColor: `${accentColor}33` }}>
            <Lightbulb className="w-4 h-4" style={{ color: accentColor }} />
            <span className="text-xs font-bold uppercase tracking-widest italic" style={{ color: `${accentColor}dd` }}>{badgeText}</span>
          </div>
          <h1 className="text-4xl md:text-7xl font-black mb-8 tracking-tighter leading-none uppercase">
            {headlinePlain} <br />
            <span className="text-transparent bg-clip-text italic"
              style={{ backgroundImage: `linear-gradient(to right, #e0e7ff, ${accentColor}, #d97706)` }}>
              {headlineAccent}
            </span>
          </h1>
          <p className="max-w-3xl mx-auto text-gray-400 text-lg md:text-xl leading-relaxed mb-12">{heroBody}</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto mb-16">
            {metrics.map((m, i) => (
              <div key={i} className="p-6 rounded-3xl text-left hover:border-amber-500/30 transition-all border"
                style={{ background: `${accentColor}0a`, borderColor: `${accentColor}22` }}>
                <p className="text-3xl font-black mb-1 text-white">{m.value}</p>
                <p className="text-[10px] uppercase font-bold tracking-widest" style={{ color: accentColor }}>{m.label}</p>
                <p className="text-[9px] text-gray-500 italic mt-2">{m.detail}</p>
              </div>
            ))}
          </div>
          <button className="px-12 py-6 rounded-2xl font-black transition-all shadow-2xl flex items-center gap-3 mx-auto text-white uppercase tracking-tighter hover:opacity-90"
            style={{ background: accentColor, boxShadow: `0 20px 60px ${accentColor}40` }}>
            {ctaLabel} <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((item, i) => {
            const Icon = ICON_MAP[item.icon] ?? Zap;
            return (
              <div key={i} className="group p-10 rounded-[3rem] bg-zinc-900/40 border border-white/5 hover:border-indigo-500/30 transition-all">
                <div className="mb-6 p-4 rounded-xl inline-block" style={{ background: `${accentColor}0d` }}>
                  <Icon className="w-8 h-8" style={{ color: accentColor }} />
                </div>
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── DEFENSIVE DEPTH ──────────────────────────────────────────────── */}
      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-4xl md:text-7xl font-black mb-8 italic tracking-tighter uppercase leading-tight"
              style={{ color: `${accentColor}dd` }}>
              {ddHeadline}
            </h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">{ddBody}</p>
            <div className="space-y-4 mt-8">
              {badges.map((b, i) => {
                const Icon = ICON_MAP[b.icon] ?? Globe;
                return (
                  <div key={i} className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/10">
                    <Icon style={{ color: accentColor }} />
                    <span className="text-xs font-bold uppercase tracking-widest italic" style={{ color: `${accentColor}dd` }}>{b.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
          {/* Terminal card */}
          <div className="relative">
            <div className="absolute -inset-10 rounded-full pointer-events-none"
              style={{ background: `${accentColor}07`, filter: 'blur(100px)' }} />
            <div className="relative bg-[#05030a] rounded-[3rem] p-10 shadow-2xl font-mono overflow-hidden border"
              style={{ borderColor: `${accentColor}33` }}>
              <div className="flex justify-between items-center mb-8 pb-4 border-b border-white/5">
                <div className="flex items-center gap-2" style={{ color: accentColor }}>
                  <Zap className="w-4 h-4 animate-pulse" />
                  <span className="text-[10px] uppercase font-black">IP_LANDSCAPE_ANALYZER</span>
                </div>
                <div className="text-[10px] text-gray-500 uppercase">MAP_ID: #B992_TECH_SECTOR</div>
              </div>
              <div className="space-y-6">
                <div className="p-6 rounded-2xl bg-white/5 border border-white/5 text-center">
                  <p className="text-[10px] text-gray-500 uppercase mb-4 italic">Semantic Similarity Heatmap</p>
                  <div className="grid grid-cols-5 gap-1">
                    {Array.from({ length: 25 }, (_, j) => (
                      <div key={j} className="h-6 rounded"
                        style={{ background: `${accentColor}${Math.floor(Math.random() * 80 + 20).toString(16).padStart(2,'0')}` }} />
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl border text-center"
                    style={{ background: `${accentColor}0d`, borderColor: `${accentColor}33` }}>
                    <p className="text-[8px] text-gray-500 uppercase mb-1 font-bold">Innovation Score</p>
                    <p className="text-xl font-black" style={{ color: accentColor }}>{innovScore}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-center">
                    <p className="text-[8px] text-gray-500 uppercase mb-1 font-bold">Risk Overlap</p>
                    <p className="text-xl font-black italic text-red-400">{riskOverlap}</p>
                  </div>
                </div>
              </div>
              <div className="mt-8 p-4 rounded-xl border border-dashed text-[9px]"
                style={{ background: `${accentColor}0a`, borderColor: `${accentColor}44`, color: `${accentColor}bb` }}>
                <p className="font-bold uppercase mb-1 tracking-widest" style={{ color: accentColor }}>IP_ARCHITECT_LOG:</p>
                <p className="italic">{architectLog}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="py-12 border-y border-white/5"><ExecutionFlow /></div>
      <SuccessStories />

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto rounded-[4rem] p-12 md:p-24 text-center backdrop-blur-3xl relative overflow-hidden border"
          style={{ background: 'linear-gradient(to bottom right, #050310, #020617)', borderColor: `${accentColor}33` }}>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-8xl font-black mb-8 italic tracking-tighter uppercase leading-tight">{ctaHeadline}</h2>
            <p className="text-lg md:text-xl mb-12 max-w-2xl mx-auto" style={{ color: `${accentColor}99` }}>{ctaBody}</p>
            <div className="flex flex-col items-center gap-6">
              <button className="bg-white px-16 py-6 rounded-2xl font-black text-2xl hover:scale-105 transition-all shadow-2xl uppercase"
                style={{ color: '#020617' }}>
                {ctaBtnLabel}
              </button>
              <div className="font-mono text-sm tracking-widest uppercase italic" style={{ color: accentColor }}>{ctaLocation}</div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}