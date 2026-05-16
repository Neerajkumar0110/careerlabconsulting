'use client';

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import { usePageContent } from '@/hooks/usePageContent';
import {
  BarChart3, Globe, Zap, ArrowUpRight, Layers, ShieldCheck, ChevronRight,
} from 'lucide-react';

function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

interface CaseStudy { client: string; title: string; impact: string; tags: string[]; image: string }
interface MetricStat { value: string; label: string; icon: string }

const ICON_MAP: Record<string, React.ElementType> = { BarChart3, Globe, ShieldCheck, Zap, Layers, ChevronRight };

const DEFAULT_CASES = JSON.stringify([
  { client: 'Global Logistics Corp', title: 'Autonomous Fleet Routing Engine', impact: '+42% Efficiency',        tags: ['Agentic AI', 'Logistics', 'Optimization'], image: 'https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
  { client: 'FinTech NeoBank',       title: 'Self-Learning Fraud Detection',   impact: '-88% False Positives',   tags: ['Machine Learning', 'Security', 'Real-time'], image: 'https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
  { client: 'BioMed Research',       title: 'Accelerated Protein Folding LLM', impact: '3yr Progress in 4mo',    tags: ['Deep Learning', 'Healthcare', 'Analysis'], image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
], null, 2);

const DEFAULT_METRICS = JSON.stringify([
  { value: '99.8%', label: 'Inference Reliability',      icon: 'BarChart3'  },
  { value: '240ms', label: 'Global Avg Latency',          icon: 'Globe'      },
  { value: 'Zero',  label: 'Data Leaks Post-Inference',   icon: 'ShieldCheck'},
], null, 2);

export default function CaseStudiesPage() {
  const { get } = usePageContent('home-case-studies');

  const accentFrom     = get('hero', 'accent_from',     '#3b82f6');
  const accentTo       = get('hero', 'accent_to',       '#6366f1');
  const badgeText      = get('hero', 'badge_text',      'Validated Impact');
  const heroPl         = get('hero', 'headline_plain',  'Proven');
  const heroAcc        = get('hero', 'headline_accent', 'Deployments.');
  const heroBody       = get('hero', 'body_text',       "Real-world results for global enterprises. We don't just build models; we architect solutions that redefine bottom lines.");

  const caseItems      = safeParse<CaseStudy[]>(get('cases', 'items_json', DEFAULT_CASES), []);
  const caseBodyTpl    = get('cases', 'body_template',  'Extensive technical overhaul involving the integration of {tag0} protocols to optimize core business logic and reduce manual overhead by significant margins.');
  const caseBtnLabel   = get('cases', 'btn_label',      'Read Full Blueprint');

  const metricItems    = safeParse<MetricStat[]>(get('metrics', 'items_json', DEFAULT_METRICS), []);

  const ctaHeadline    = get('cta', 'headline',         'Your Case Could Be Next.');
  const ctaBtnLabel    = get('cta', 'btn_label',        'Schedule Discovery');

  return (
    <main className="min-h-screen bg-[#020617] text-slate-100 selection:bg-blue-600/30 font-sans">
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 md:pt-52 md:pb-32 px-6">
        <div className="absolute inset-0 -z-10" style={{ background: 'radial-gradient(circle at 50% 30%, rgba(37,99,235,0.1) 0%, transparent 70%)' }} />
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-8 backdrop-blur-xl"
            style={{ background: `${accentFrom}1a`, border: `1px solid ${accentFrom}33` }}>
            <Zap className="w-3.5 h-3.5" style={{ color: accentFrom }} />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] italic" style={{ color: accentFrom }}>{badgeText}</span>
          </div>
          <h1 className="text-6xl md:text-9xl font-black tracking-tighter leading-[0.8] uppercase mb-12">
            {heroPl} <br />
            <span className="text-transparent bg-clip-text italic"
              style={{ backgroundImage: `linear-gradient(to right, ${accentFrom}, ${accentTo})` }}>
              {heroAcc}
            </span>
          </h1>
          <p className="max-w-2xl text-slate-400 text-lg md:text-xl font-light leading-relaxed">{heroBody}</p>
        </div>
      </section>

      {/* ── CASE STUDIES ─────────────────────────────────────────────── */}
      <section className="pb-32 px-6">
        <div className="max-w-7xl mx-auto space-y-32">
          {caseItems.map((study, index) => (
            <div key={index} className="group grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className={`lg:col-span-7 relative ${index % 2 !== 0 ? 'lg:order-2' : ''}`}>
                <div className="relative aspect-[16/9] rounded-[3rem] overflow-hidden border border-white/5 shadow-2xl">
                  <img src={study.image} alt={study.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" />
                  <div className="absolute inset-0 opacity-60" style={{ background: 'linear-gradient(to top, #020617, transparent, transparent)' }} />
                  <div className="absolute bottom-8 right-8 p-6 rounded-3xl backdrop-blur-xl shadow-2xl translate-y-4 group-hover:translate-y-0 transition-transform"
                    style={{ background: accentFrom }}>
                    <p className="text-[10px] font-black uppercase tracking-widest mb-1" style={{ color: `#EEEEEE` }}>Key Impact</p>
                    <p className="text-2xl font-black italic">{study.impact}</p>
                  </div>
                </div>
              </div>
              <div className={`lg:col-span-5 ${index % 2 !== 0 ? 'lg:order-1' : ''}`}>
                <div className="space-y-6">
                  <div className="flex items-center gap-4 font-mono text-xs font-bold tracking-[0.2em] uppercase" style={{ color: accentFrom }}>
                    <Layers size={16} /> {study.client}
                  </div>
                  <h3 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter leading-none transition-colors"
                    style={{ color: '#fff' }}
                    onMouseEnter={e => (e.currentTarget.style.color = accentFrom)}
                    onMouseLeave={e => (e.currentTarget.style.color = '#fff')}>
                    {study.title}
                  </h3>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {study.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-slate-400 uppercase tracking-widest">{tag}</span>
                    ))}
                  </div>
                  <p className="text-slate-400 font-light leading-relaxed text-lg pt-4">
                    {caseBodyTpl.replace('{tag0}', study.tags[0] ?? 'AI')}
                  </p>
                  <button className="flex items-center gap-4 text-xs font-black uppercase tracking-[0.3em] pt-8 group/btn">
                    {caseBtnLabel}
                    <div className="p-2 rounded-full bg-white/5 transition-all" style={{}}
                      onMouseEnter={e => ((e.currentTarget as HTMLDivElement).style.background = accentFrom)}
                      onMouseLeave={e => ((e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.05)')}>
                      <ArrowUpRight size={16} />
                    </div>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── METRICS ──────────────────────────────────────────────────── */}
      <section className="py-24 px-6 border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
          {metricItems.map((m, i) => {
            const Icon = ICON_MAP[m.icon] ?? BarChart3;
            return (
              <div key={i} className="space-y-4">
                <Icon className="mx-auto md:mx-0" size={32} style={{ color: accentFrom }} />
                <h4 className="text-4xl font-black italic">{m.value}</h4>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">{m.label}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-7xl font-black uppercase italic tracking-tighter mb-10 leading-none">
            {ctaHeadline.split(' ').slice(0, -1).join(' ')} <br />
            <span style={{ color: accentFrom }}>{ctaHeadline.split(' ').slice(-1)[0]}</span>
          </h2>
          <button className="bg-white text-black px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:scale-105 transition-all">
            {ctaBtnLabel}
          </button>
        </div>
      </section>

      <Footer />
    </main>
  );
}