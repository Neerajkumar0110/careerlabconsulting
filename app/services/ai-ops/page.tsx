"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import { usePageContent } from '@/hooks/usePageContent';
import Link from 'next/link';
import Image from 'next/image';
import {
  Activity, CloudLightning, ShieldAlert, BrainCircuit,
  BarChart3, ArrowRight, ServerCrash, Infinity, Microchip, Globe,
} from 'lucide-react';

function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

interface FeatureCard { title: string; desc: string; img: string }
interface PipelineItem { label: string; val: string }

const DEFAULT_FEATURES = JSON.stringify([
  { title: 'Predictive Maintenance',       desc: 'AI-driven anomaly detection jo server failures ko hone se pehle hi identify aur fix kar deta hai.',                         img: 'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
  { title: 'Automated Incident Response',  desc: 'L1/L2 support tasks ko automate karein smart bots ke sath jo complex infrastructure issues resolve karte hain.',           img: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
]);
const DEFAULT_PIPELINE = JSON.stringify([
  { label: 'Data Ingestion',    val: 'Multi-Cloud' },
  { label: 'Pattern Discovery', val: 'ML-Driven'   },
  { label: 'Self-Healing',      val: 'Automated'   },
  { label: 'Cost Optimization', val: 'Dynamic'     },
]);
const PIPELINE_ICONS = [<Globe key="g" />, <BrainCircuit key="bc" />, <CloudLightning key="cl" />, <BarChart3 key="b3" />];
const FEATURE_ICONS  = [ServerCrash, ShieldAlert];

export default function AIOpsPage() {
  const { get } = usePageContent('services-aiops');

  // Hero
  const accentFrom    = get('hero', 'accent_from',     '#a855f7');
  const accentTo      = get('hero', 'accent_to',       '#ec4899');
  const badgeText     = get('hero', 'badge_text',      'Autonomous Operations Layer');
  const heroPl        = get('hero', 'headline_plain',  'AIOps');
  const heroAcc       = get('hero', 'headline_accent', 'Evolution.');
  const heroBody      = get('hero', 'body_text',       'Transform your IT operations from reactive to proactive. Hum AI ka use karte hain aapke cloud infrastructure ko monitor, manage aur self-heal karne ke liye.');
  const heroBtnLabel  = get('hero', 'btn_label',       'Deploy AI Agent');
  const mttr          = get('hero', 'mttr',            '-74%');
  const uptime        = get('hero', 'uptime',          '99.999%');
  const eventsPerSec  = get('hero', 'events_per_sec',  '1.2 Million');

  // Pipeline
  const pipelineLabel = get('pipeline', 'section_label',  'The AIOps Pipeline');
  const pipelineItems = safeParse<PipelineItem[]>(get('pipeline', 'items_json', DEFAULT_PIPELINE), []);

  // Features
  const featureCards  = safeParse<FeatureCard[]>(get('features', 'cards_json', DEFAULT_FEATURES), []);

  // CTA
  const ctaHeadline   = get('cta', 'headline',       'Stop Firefighting. Start Automating.');
  const ctaAccent     = get('cta', 'headline_accent','Automating.');
  const ctaBody       = get('cta', 'body_text',      'Infrastructure manage karne ka naya tareeka yahan hai. Get rid of operational manual labor with AI.');
  const ctaBtnLabel   = get('cta', 'btn_label',      'Get Free Ops Audit');

  return (
    <main className="min-h-screen bg-[#020617] text-slate-100 selection:bg-purple-600/30 font-sans">
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative pt-32 pb-20 md:pt-52 md:pb-32 px-6 overflow-hidden">
        <div className="absolute inset-0 -z-10" style={{ background: `radial-gradient(circle at 50% 30%, ${accentFrom}1a 0%, transparent 70%)` }} />
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border mb-8 backdrop-blur-xl" style={{ background: `${accentFrom}1a`, borderColor: `${accentFrom}33` }}>
              <Infinity size={14} style={{ color: accentFrom }} />
              <span className="text-[10px] font-black uppercase tracking-[0.3em]" style={{ color: accentFrom }}>{badgeText}</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85] mb-8">
              {heroPl}<br />
              <span className="italic font-black" style={{ backgroundImage: `linear-gradient(to right, ${accentFrom}, ${accentTo})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{heroAcc}</span>
            </h1>
            <p className="max-w-xl text-slate-400 text-lg font-light leading-relaxed mb-10">{heroBody}</p>
            <Link href="/contact" className="text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center gap-3 w-fit transition-all shadow-xl" style={{ background: accentFrom }}>
              {heroBtnLabel} <ArrowRight size={16} />
            </Link>
          </div>
          {/* Widget */}
          <div className="lg:w-1/2 relative group w-full">
            <div className="absolute -inset-4 rounded-full" style={{ background: `${accentFrom}1a`, filter: 'blur(40px)' }} />
            <div className="relative p-8 border border-white/10 rounded-[3rem] backdrop-blur-2xl" style={{ background: 'rgba(2,6,23,0.8)' }}>
              <div className="flex justify-between items-center mb-8">
                <div className="flex gap-2 items-center">
                  <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: accentFrom }} />
                  <span className="text-[10px] font-mono uppercase tracking-widest" style={{ color: accentFrom }}>Autonomous_Control_v4</span>
                </div>
                <Activity size={18} style={{ color: accentFrom }} />
              </div>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-4 rounded-2xl border border-white/5" style={{ background: 'rgba(255,255,255,0.05)' }}>
                  <p className="text-[9px] text-slate-500 uppercase font-bold">MTTR Reduction</p>
                  <p className="text-2xl font-black" style={{ color: accentFrom }}>{mttr}</p>
                </div>
                <div className="p-4 rounded-2xl border border-white/5" style={{ background: 'rgba(255,255,255,0.05)' }}>
                  <p className="text-[9px] text-slate-500 uppercase font-bold">Uptime Status</p>
                  <p className="text-2xl font-black text-emerald-400">{uptime}</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="h-1.5 w-full rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
                  <div className="h-full w-[85%] rounded-full" style={{ background: accentFrom }} />
                </div>
                <p className="text-[10px] font-mono text-slate-500">Processing {eventsPerSec} events per second...</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PIPELINE ── */}
      <section className="py-24 px-6 border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center text-[10px] font-black uppercase tracking-[0.5em] text-slate-500 mb-20 italic">{pipelineLabel}</h2>
          <div className="mt-24 grid grid-cols-1 md:grid-cols-4 gap-8">
            {pipelineItems.map((item, i) => (
              <div key={i} className="text-center group p-6 hover:bg-white/[0.02] rounded-3xl transition-all">
                <div className="mb-4 flex justify-center group-hover:scale-110 transition-transform" style={{ color: accentFrom }}>{PIPELINE_ICONS[i % PIPELINE_ICONS.length]}</div>
                <h4 className="text-lg font-black italic mb-1 uppercase tracking-tight">{item.val}</h4>
                <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {featureCards.map((feature, i) => {
            const FeatureIcon = FEATURE_ICONS[i % FEATURE_ICONS.length];
            return (
              <div key={i} className="group relative rounded-[3rem] overflow-hidden border border-white/5 bg-slate-900/40 transition-all duration-500"
                onMouseEnter={e => (e.currentTarget.style.borderColor = `${accentFrom}4d`)}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)')}>
                <Image src={feature.img} alt={feature.title} fill className="object-cover opacity-10 grayscale group-hover:scale-110 transition-transform duration-1000" sizes="(max-width: 768px) 100vw, 50vw" />
                <div className="relative p-12 bg-gradient-to-t from-[#020617] via-[#020617]/95 to-transparent">
                  <div className="mb-6 p-4 rounded-2xl w-fit transition-all" style={{ background: `${accentFrom}1a`, color: accentFrom }}>
                    <FeatureIcon size={30} />
                  </div>
                  <h3 className="text-2xl font-black uppercase italic mb-4 tracking-tighter">{feature.title}</h3>
                  <p className="text-slate-400 font-light leading-relaxed mb-8">{feature.desc}</p>
                  <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest" style={{ color: accentFrom }}>
                    <Microchip size={14} /> Neural-Ops Certified
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto p-12 md:p-24 rounded-[4rem] border text-center relative overflow-hidden shadow-2xl"
          style={{ backgroundImage: `linear-gradient(to bottom right, ${accentFrom}33, rgba(15,23,42,0.4), #020617)`, borderColor: `${accentFrom}33` }}>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-7xl font-black italic uppercase tracking-tighter mb-10 leading-[0.85]">
              {ctaHeadline.replace(ctaAccent, '')}
              <br /><span style={{ color: accentFrom }}>{ctaAccent}</span>
            </h2>
            <p className="text-slate-400 mb-12 max-w-lg mx-auto font-light leading-relaxed">{ctaBody}</p>
            <Link href="/contact" className="inline-block bg-white text-black px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:scale-105 transition-all">
              {ctaBtnLabel}
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}