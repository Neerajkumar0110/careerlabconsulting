"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import { usePageContent } from '@/hooks/usePageContent';
import {
  Zap, ShieldCheck, BrainCircuit, Scale, BarChart,
  SearchCode, ArrowRight, Database, Crosshair, Binary,
} from 'lucide-react';

function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

interface PillarCard { title: string; desc: string; img: string }
interface StatItem   { label: string; val: string }
interface MetricItem { label: string; val: string; width: string; color?: string }

const DEFAULT_PILLARS = JSON.stringify([
  { title: 'Bias & Fairness Audit',  desc: 'Detecting and mitigating algorithmic bias to ensure your AI models treat all demographic groups equitably.',                         img: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
  { title: 'Robustness Testing',     desc: 'Simulating adversarial attacks and out-of-distribution data to test the stability of model predictions.',                           img: 'https://images.pexels.com/photos/5473337/pexels-photo-5473337.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
]);
const DEFAULT_STATS = JSON.stringify([
  { label: 'Data Quality', val: 'Cleaned'  },
  { label: 'Bias Check',   val: 'Mitigated'},
  { label: 'Drift Sync',   val: 'Active'   },
  { label: 'Audit Log',    val: 'Immutable'},
]);
const DEFAULT_METRICS = JSON.stringify([
  { label: 'Precision',    val: '99.2%', width: '99%'  },
  { label: 'F1 Score',     val: '0.984', width: '98%'  },
  { label: 'Drift Detect', val: 'Low',   width: '15%', color: '#06b6d4' },
]);

const STAT_ICONS = [<Database key="db" />, <Scale key="sc" />, <Zap key="zp" />, <Binary key="bn" />];

export default function ModelValidation() {
  const { get } = usePageContent('services-model-validation');

  // Hero
  const accentFrom   = get('hero', 'accent_from',     '#6366f1');
  const accentTo     = get('hero', 'accent_to',       '#06b6d4');
  const badgeText    = get('hero', 'badge_text',      'AI Trust & Safety Node');
  const heroPl       = get('hero', 'headline_plain',  'Model');
  const heroAcc      = get('hero', 'headline_accent', 'Validation.');
  const heroBody     = get('hero', 'body_text',       'Ensure your intelligence is accurate, ethical, and reliable. We provide deep-tech validation for LLMs, Computer Vision, and Predictive Algorithms.');
  const heroBtnLabel = get('hero', 'btn_label',       'Request Model Audit');
  const metrics      = safeParse<MetricItem[]>(get('hero', 'metrics_json', DEFAULT_METRICS), []);

  // Stats
  const statsPl    = get('stats', 'section_label', 'The Validation Framework');
  const statsItems = safeParse<StatItem[]>(get('stats', 'items_json', DEFAULT_STATS), []);

  // Pillars
  const pillarCards = safeParse<PillarCard[]>(get('pillars', 'cards_json', DEFAULT_PILLARS), []);

  // CTA
  const ctaHeadline  = get('cta', 'headline',       'Validate Your Intelligence.');
  const ctaAccent    = get('cta', 'headline_accent','Intelligence.');
  const ctaQuote     = get('cta', 'quote',          '"An unvalidated model is a business risk. Secure your AI outputs with mathematical rigor."');
  const ctaBtnLabel  = get('cta', 'btn_label',      'Start Validation Audit');

  return (
    <main className="min-h-screen bg-[#020617] text-slate-100 selection:bg-indigo-600/30 font-sans">
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative pt-32 pb-20 md:pt-52 md:pb-32 px-6 overflow-hidden">
        <div className="absolute inset-0 -z-10" style={{ background: `radial-gradient(circle at 30% 30%, ${accentFrom}1f 0%, transparent 70%)` }} />
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border mb-8 backdrop-blur-xl" style={{ background: `${accentFrom}1a`, borderColor: `${accentFrom}33` }}>
              <BrainCircuit size={14} style={{ color: accentFrom }} />
              <span className="text-[10px] font-black uppercase tracking-[0.3em]" style={{ color: accentFrom }}>{badgeText}</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85] mb-8">
              {heroPl}<br />
              <span className="italic font-black" style={{ backgroundImage: `linear-gradient(to right, ${accentFrom}, ${accentTo})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{heroAcc}</span>
            </h1>
            <p className="max-w-xl text-slate-400 text-lg font-light leading-relaxed mb-10">{heroBody}</p>
            <button onClick={() => (window.location.href = '/contact')} className="text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center gap-3 transition-all shadow-xl" style={{ background: accentFrom }}>
              {heroBtnLabel} <ArrowRight size={16} />
            </button>
          </div>

          {/* Validation Matrix Widget */}
          <div className="lg:w-1/2 relative group w-full">
            <div className="absolute -inset-4 rounded-full animate-pulse" style={{ background: `${accentFrom}1a`, filter: 'blur(40px)' }} />
            <div className="relative p-8 border border-white/10 rounded-[3rem] backdrop-blur-3xl" style={{ background: 'rgba(2,6,23,0.8)' }}>
              <div className="flex justify-between items-center mb-10">
                <span className="text-xs font-mono uppercase tracking-widest italic" style={{ color: accentFrom }}>Validation_Matrix_Live</span>
                <div className="flex gap-2">
                  <div className="h-2 w-2 rounded-full" style={{ background: accentFrom }} />
                  <div className="h-2 w-2 rounded-full" style={{ background: accentTo }} />
                </div>
              </div>
              <div className="space-y-6">
                {metrics.map((m, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-[10px] uppercase font-bold text-slate-500 mb-2">
                      <span>{m.label}</span><span>{m.val}</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
                      <div className="h-full rounded-full" style={{ width: m.width, background: m.color ?? accentFrom }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="py-24 px-6 border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-500 mb-16 italic">{statsPl}</h2>
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
            {statsItems.map((stat, i) => (
              <div key={i} className="group p-6">
                <div className="mb-4 flex justify-center group-hover:scale-110 transition-transform" style={{ color: accentFrom }}>{STAT_ICONS[i % STAT_ICONS.length]}</div>
                <h4 className="text-2xl font-black italic mb-1">{stat.val}</h4>
                <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PILLARS ── */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {pillarCards.map((pillar, i) => (
            <div key={i} className="group relative rounded-[3rem] overflow-hidden border border-white/5 bg-slate-900/40 transition-all"
              onMouseEnter={e => (e.currentTarget.style.borderColor = `${accentFrom}4d`)}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)')}>
              <img src={pillar.img} className="absolute inset-0 w-full h-full object-cover opacity-10 grayscale group-hover:scale-110 transition-transform duration-1000" alt={pillar.title} />
              <div className="relative p-12 bg-gradient-to-t from-[#020617] via-[#020617]/95 to-transparent">
                <div className="mb-6 p-4 rounded-2xl w-fit transition-all" style={{ background: `${accentFrom}1a`, color: accentFrom }}>
                  {i === 0 ? <Scale size={30} /> : <ShieldCheck size={30} />}
                </div>
                <h3 className="text-2xl font-black uppercase italic mb-4">{pillar.title}</h3>
                <p className="text-slate-400 font-light leading-relaxed mb-8">{pillar.desc}</p>
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest" style={{ color: accentFrom }}>
                  <Crosshair size={14} /> Verification Certified
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto p-12 md:p-24 rounded-[4rem] border text-center relative overflow-hidden"
          style={{ backgroundImage: `linear-gradient(to bottom right, ${accentFrom}33, #020617)`, borderColor: `${accentFrom}33` }}>
          <div className="relative z-10">
            <BarChart className="mx-auto mb-8" size={48} style={{ color: accentFrom }} />
            <h2 className="text-4xl md:text-7xl font-black italic uppercase tracking-tighter mb-10 leading-none">
              {ctaHeadline.replace(ctaAccent, '')}
              <span style={{ color: accentFrom }}>{ctaAccent}</span>
            </h2>
            <p className="text-slate-400 mb-12 max-w-lg mx-auto italic font-light">{ctaQuote}</p>
            <button onClick={() => (window.location.href = '/contact')} className="bg-white text-black px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:scale-105 transition-all">
              {ctaBtnLabel}
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}