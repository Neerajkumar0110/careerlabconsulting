'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  ScanEye, CheckCircle2, Zap, Microscope, Search,
  ArrowRight, Maximize, LineChart, ShieldCheck, AlertCircle, Activity,
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import ExecutionFlow from '@/components/sections/ExecutionFlow';
import SuccessStories from '@/components/sections/SuccessStories';
import { usePageContent } from '@/hooks/usePageContent';

function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

interface FeatureCard { title: string; desc: string; icon: string; stat: string }
interface MetricItem  { label: string; value: string; delta: string; positive: boolean }
interface BadgeItem   { icon: string; text: string }

const ICON_MAP: Record<string, React.ElementType> = {
  ScanEye, CheckCircle2, Zap, Microscope, Search, Maximize, LineChart, ShieldCheck, AlertCircle, Activity,
};

const DEFAULT_METRICS = JSON.stringify([
  { label: 'Inspection Accuracy',      value: '99.998%', delta: '+4.2%', positive: true },
  { label: 'False Rejection Rate',      value: '0.02%',   delta: '-12%',  positive: true },
  { label: 'Line Speed Integration',    value: '1,200 PPM',delta: 'Stable',positive: true },
  { label: 'Defect Detection Latency',  value: '14ms',    delta: '-2ms',  positive: true },
]);
const DEFAULT_FEATURES = JSON.stringify([
  { title: 'Sub-Pixel Metrology',  desc: 'AI measurement engines that verify dimensional tolerances down to 0.5 microns for aerospace and medical components.', icon: 'Maximize',  stat: '99.9% Yield'   },
  { title: 'Automated RCA',        desc: 'Closed-loop feedback systems that trace surface defects back to specific upstream process drifts in real-time.',       icon: 'Search',    stat: '40% Faster RCA' },
  { title: 'Surface Anomaly AI',   desc: 'Cognitive vision that distinguishes between harmless surface dust and critical structural fractures or micro-fissures.',icon: 'LineChart', stat: '0% Leakage'     },
]);
const DEFAULT_BADGES = JSON.stringify([
  { icon: 'CheckCircle2', text: 'Automated 21 CFR Part 11 Compliance for MedTech' },
  { icon: 'Microscope',   text: 'Multi-Spectral & X-Ray Integration'               },
  { icon: 'ShieldCheck',  text: 'Edge-AI Deployment (0 Cloud Dependency)'         },
]);

export default function QualityControlPage() {
  const { get } = usePageContent('industry-quality-control');

  // ── Hero ──────────────────────────────────────────────────────────────────
  const accentFrom    = get('hero', 'accent_from',     '#06b6d4');
  const accentTo      = get('hero', 'accent_to',       '#3b82f6');
  const badgeText     = get('hero', 'badge_text',      'Industrial Vision Intelligence v4.2');
  const heroPl        = get('hero', 'headline_plain',  'QUANTUM');
  const heroAcc       = get('hero', 'headline_accent', 'PRECISION');
  const heroBody      = get('hero', 'body_text',       'Move beyond statistical sampling. We enable 100% End-of-Line inspection using Deep Learning models trained on millions of synthetic defect permutations.');
  const heroBtnLabel  = get('hero', 'btn_label',       'Deploy AI Inspection');
  const metricItems   = safeParse<MetricItem[]>(get('hero', 'metrics_json', DEFAULT_METRICS), []);

  // ── Features ──────────────────────────────────────────────────────────────
  const featPl        = get('features', 'headline_plain',  'Vision');
  const featAcc       = get('features', 'headline_accent', 'Modules.');
  const featureCards  = safeParse<FeatureCard[]>(get('features', 'cards_json', DEFAULT_FEATURES), []);

  // ── Beyond Human Eye ──────────────────────────────────────────────────────
  const visionPl      = get('vision', 'headline_plain',  'Beyond');
  const visionAcc     = get('vision', 'headline_accent', 'Human Eye');
  const visionBody    = get('vision', 'body_text',       'We replace unreliable manual checks with high-frequency cognitive vision. Our systems integrate with existing high-speed production lines (up to 2,000 units/min) to provide a transparent, audit-ready data trail.');
  const badgeItems    = safeParse<BadgeItem[]>(get('vision', 'badges_json', DEFAULT_BADGES), []);
  const surfaceVar    = get('vision', 'surface_variance', '±0.002mm');
  const defectLabel   = get('vision', 'defect_label',    'Solder_Bridge_Defect');
  const defectConf    = get('vision', 'defect_confidence','98.4%');
  const rootCauseLog  = get('vision', 'root_cause_log',  '$ ROOT_CAUSE_ENGINE: Anomalous temperature spike detected in Wave-Solder Zone 4 (+4.2°C). Correlating with defect pattern. Adjusting PLC parameters...');

  // ── CTA ───────────────────────────────────────────────────────────────────
  const ctaHeadline   = get('cta', 'headline',       'Master\nYour Yield');
  const ctaBody       = get('cta', 'body_text',      'Ready to eliminate waste and protect your brand? Our Precision Lab at DLF Cyber City is ready to benchmark your production line.');
  const ctaBtnLabel   = get('cta', 'btn_label',      'DEPLOY AI INSPECTION');
  const ctaLocation   = get('cta', 'location_label', 'Certified ISO 9001 AI Integration Partner');

  return (
    <main className="flex min-h-screen flex-col bg-[#020617] text-white overflow-x-hidden">
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[120px] -z-10"
          style={{ background: `${accentFrom}1a` }} />
        <div className="max-w-7xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-8 backdrop-blur-md"
            style={{ background: `${accentFrom}1a`, borderColor: `${accentFrom}33` }}>
            <ScanEye className="w-4 h-4" style={{ color: accentFrom }} />
            <span className="text-xs font-bold uppercase tracking-widest italic" style={{ color: accentFrom }}>{badgeText}</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-6xl md:text-9xl font-black mb-8 tracking-tighter leading-[0.85] uppercase">
            {heroPl} <br />
            <span className="italic" style={{
              backgroundImage: `linear-gradient(to right, #e0f2fe, ${accentFrom}, ${accentTo})`,
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>{heroAcc}</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="max-w-3xl mx-auto text-gray-400 text-lg md:text-xl leading-relaxed mb-12">
            {heroBody}
          </motion.p>
          {/* Metrics bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto p-2 bg-white/5 border border-white/10 rounded-[2rem] backdrop-blur-xl mb-12">
            {metricItems.map((m, i) => (
              <div key={i} className="p-6 text-left border-r border-white/10 last:border-0">
                <p className="text-[10px] text-gray-500 uppercase font-bold mb-1 tracking-wider">{m.label}</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-xl md:text-2xl font-black" style={{ color: '#e0f2fe' }}>{m.value}</span>
                  <span className={`text-[10px] ${m.positive ? 'text-emerald-400' : 'text-red-400'}`}>{m.delta}</span>
                </div>
              </div>
            ))}
          </div>
          <button className="px-10 py-5 rounded-2xl font-bold transition-all shadow-xl flex items-center justify-center gap-2 mx-auto text-black hover:opacity-90"
            style={{ background: accentFrom, boxShadow: `0 20px 40px ${accentFrom}33` }}>
            {heroBtnLabel} <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight uppercase">
              {featPl} <span className="italic" style={{ color: accentFrom }}>{featAcc}</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featureCards.map((item, i) => {
              const Icon = ICON_MAP[item.icon] ?? Zap;
              return (
                <motion.div key={i} whileHover={{ y: -8 }}
                  className="group p-10 rounded-[3rem] border border-white/5 relative overflow-hidden transition-all"
                  style={{ background: `linear-gradient(to bottom, ${accentFrom}0d, transparent)` }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = `${accentFrom}4d`)}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)')}>
                  <div className="mb-6 p-4 rounded-2xl inline-block transition-all" style={{ background: `${accentFrom}1a` }}>
                    <Icon className="w-8 h-8" style={{ color: accentFrom }} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                  <p className="text-gray-400 leading-relaxed text-sm mb-6">{item.desc}</p>
                  <div className="font-mono text-xs font-bold py-2 px-4 rounded-full inline-block"
                    style={{ background: `${accentFrom}0d`, color: accentFrom }}>
                    KPI: {item.stat}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── VISION ───────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* AI Vision card */}
          <div className="relative order-2 lg:order-1">
            <div className="absolute -inset-10 rounded-full" style={{ background: `${accentFrom}0d`, filter: 'blur(100px)' }} />
            <div className="relative border rounded-[3rem] p-8 shadow-2xl font-mono" style={{ background: '#01080a', borderColor: `${accentFrom}33` }}>
              <div className="flex justify-between items-center mb-8 pb-4 border-b border-white/5">
                <div className="flex items-center gap-2" style={{ color: accentFrom }}>
                  <Activity className="w-4 h-4 animate-pulse" />
                  <span className="text-[10px] uppercase tracking-widest font-black">AI_CORE_ANALYSIS: LIVE</span>
                </div>
                <div className="text-[10px] text-gray-500">FRAME_ID: #X99-204</div>
              </div>
              <div className="aspect-video bg-zinc-950 rounded-2xl mb-8 relative border border-white/10 overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/20 to-transparent pointer-events-none" />
                <div className="absolute top-10 left-10 border border-red-500 p-2 bg-red-500/10 backdrop-blur-sm">
                  <p className="text-[8px] text-red-500 font-bold uppercase">{defectLabel}</p>
                  <p className="text-[10px] text-white">Conf: {defectConf}</p>
                </div>
                <AlertCircle size={32} className="text-red-500/30" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[9px] text-gray-500 uppercase">Surface Variance</span>
                    <span className="text-[10px]" style={{ color: accentFrom }}>{surfaceVar}</span>
                  </div>
                  <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full rounded-full w-[15%]" style={{ background: accentFrom }} />
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/20">
                  <p className="text-[9px] text-red-400 uppercase font-bold mb-1 italic">Action Triggered</p>
                  <p className="text-sm font-bold">Auto-Reject Unit #882</p>
                </div>
              </div>
              <div className="mt-6 text-[10px] leading-relaxed border-t border-white/5 pt-4" style={{ color: `${accentFrom}80` }}>
                {rootCauseLog}
              </div>
            </div>
          </div>
          {/* Text */}
          <div className="order-1 lg:order-2">
            <h2 className="text-4xl md:text-7xl font-black mb-8 italic tracking-tighter uppercase leading-tight">
              {visionPl} <br /><span style={{ color: accentFrom }}>{visionAcc}</span>
            </h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">{visionBody}</p>
            <div className="grid grid-cols-1 gap-4">
              {badgeItems.map((b, i) => {
                const Icon = ICON_MAP[b.icon] ?? CheckCircle2;
                return (
                  <div key={i} className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/5 transition-all"
                    onMouseEnter={e => (e.currentTarget.style.background = `${accentFrom}1a`)}
                    onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.05)')}>
                    <Icon className="shrink-0" style={{ color: accentFrom }} />
                    <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#e0f2fe' }}>{b.text}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <div className="py-12 border-y border-white/5" style={{ background: `${accentFrom}0d` }}><ExecutionFlow /></div>
      <SuccessStories />

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto border rounded-[4rem] p-12 md:p-24 text-center backdrop-blur-3xl relative overflow-hidden"
          style={{ background: 'linear-gradient(to bottom right, #0a1e26, #000)', borderColor: `${accentFrom}33` }}>
          <div className="absolute top-0 left-0 w-full h-1" style={{ background: `linear-gradient(to right, transparent, ${accentFrom}, transparent)` }} />
          <div className="relative z-10">
            <h2 className="text-4xl md:text-8xl font-black mb-8 italic tracking-tighter uppercase leading-tight whitespace-pre-line">{ctaHeadline}</h2>
            <p className="text-lg md:text-xl mb-12 max-w-2xl mx-auto" style={{ color: `${accentFrom}b3` }}>{ctaBody}</p>
            <div className="flex flex-col items-center gap-6">
              <button className="px-16 py-6 rounded-2xl font-black text-2xl hover:scale-105 transition-all shadow-2xl flex items-center gap-3 text-black"
                style={{ background: accentFrom, boxShadow: `0 20px 40px ${accentFrom}33` }}>
                {ctaBtnLabel} <ArrowRight className="w-6 h-6" />
              </button>
              <div className="flex items-center gap-4 font-mono text-sm tracking-widest uppercase" style={{ color: accentFrom }}>
                <span className="flex h-2 w-2 rounded-full animate-ping" style={{ background: accentFrom }} />
                {ctaLocation}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}