'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Settings, Cpu, Eye, Activity, Zap,
  HardHat, ArrowRight, Gauge, Construction,
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
interface BadgeItem   { icon: string; text: string }

const ICON_MAP: Record<string, React.ElementType> = {
  Settings, Cpu, Eye, Activity, Zap, HardHat, Gauge, Construction,
};

const DEFAULT_FEATURES = JSON.stringify([
  { title: 'Predictive Maintenance', desc: 'Analyzing vibration, heat, and acoustic data to predict bearing and motor failures before they cause costly downtime.', icon: 'Activity' },
  { title: 'Computer Vision QA',     desc: 'High-speed optical inspection systems that detect sub-millimeter defects in real-time on moving assembly lines.',         icon: 'Eye'      },
  { title: 'Digital Twin Ops',       desc: 'Creating real-time virtual replicas of your production floor to simulate "what-if" scenarios and optimize throughput.',   icon: 'Cpu'      },
]);
const DEFAULT_BADGES = JSON.stringify([
  { icon: 'HardHat', text: 'Worker Safety AI'  },
  { icon: 'Gauge',   text: 'OEE Optimization'  },
]);

export default function SmartManufacturingPage() {
  const { get } = usePageContent('industry-smart-manufacturing');

  // ── Hero ──────────────────────────────────────────────────────────────────
  const accentFrom    = get('hero', 'accent_from',     '#f97316');
  const accentTo      = get('hero', 'accent_to',       '#71717a');
  const badgeText     = get('hero', 'badge_text',      'Industry 4.0 & Smart Factory Vertical');
  const heroPl        = get('hero', 'headline_plain',  'AUTONOMOUS');
  const heroAcc       = get('hero', 'headline_accent', 'PRODUCTION');
  const heroBody      = get('hero', 'body_text',       'The factory of the future is self-healing. We deploy AI at the edge to predict equipment failure, automate defect detection, and synchronize complex assembly lines with zero-latency precision.');
  const heroBtnLabel  = get('hero', 'btn_label',       'Optimize My Plant');

  // ── Features ──────────────────────────────────────────────────────────────
  const featPl        = get('features', 'headline_plain',  'Smart');
  const featAcc       = get('features', 'headline_accent', 'Systems.');
  const featureCards  = safeParse<FeatureCard[]>(get('features', 'cards_json', DEFAULT_FEATURES), []);

  // ── Edge Intelligence ─────────────────────────────────────────────────────
  const edgePl        = get('edge', 'headline_plain',  'Edge');
  const edgeAcc       = get('edge', 'headline_accent', 'Intelligence');
  const edgeBody      = get('edge', 'body_text',       'We bring AI to the machines. By deploying high-performance models at the edge (NVIDIA Jetson, AWS Panorama), we enable real-time decision making without cloud dependency, ensuring safety and speed on the shop floor.');
  const badgeItems    = safeParse<BadgeItem[]>(get('edge', 'badges_json', DEFAULT_BADGES), []);
  const equipPct      = get('edge', 'equip_longevity', '68');
  const defectRate    = get('edge', 'defect_rate',     '0.001%');
  const energyDraw    = get('edge', 'energy_draw',     '-8.4%');
  const edgeLog       = get('edge', 'edge_log',        '"Anomaly detected in Motor_X. High-frequency vibration suggests potential bearing fatigue. Auto-scheduling maintenance during next shift change."');

  // ── CTA ───────────────────────────────────────────────────────────────────
  const ctaHeadline   = get('cta', 'headline',       'Engineer\nThe Future');
  const ctaBody       = get('cta', 'body_text',      'Our industrial AI engineers at DLF Cyber City are building the systems that make factories think.');
  const ctaBtnLabel   = get('cta', 'btn_label',      'START SMART BUILD');
  const ctaLocation   = get('cta', 'location_label', 'Industrial Lab: Gurugram, India');

  return (
    <main className="flex min-h-screen flex-col bg-[#020617] text-white overflow-x-hidden">
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[120px] -z-10"
          style={{ background: `${accentFrom}0d` }} />
        <div className="max-w-7xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-8 backdrop-blur-md"
            style={{ background: `${accentFrom}1a`, borderColor: `${accentFrom}33` }}>
            <Settings className="w-4 h-4 animate-spin" style={{ color: accentFrom, animationDuration: '4s' }} />
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: accentFrom }}>{badgeText}</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-tight uppercase">
            {heroPl} <br />
            <span className="italic" style={{
              backgroundImage: `linear-gradient(to right, #e4e4e7, ${accentFrom}, ${accentTo})`,
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>{heroAcc}</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="max-w-3xl mx-auto text-gray-400 text-lg md:text-xl leading-relaxed mb-12">
            {heroBody}
          </motion.p>
          <button className="px-10 py-5 rounded-2xl font-bold transition-all shadow-xl flex items-center justify-center gap-2 mx-auto text-white hover:opacity-90"
            style={{ background: accentFrom, boxShadow: `0 20px 40px ${accentFrom}33` }}>
            {heroBtnLabel} <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-white/[0.01]">
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
                  className="group p-10 rounded-[2.5rem] bg-zinc-900/40 border border-white/5 transition-all"
                  onMouseEnter={e => (e.currentTarget.style.borderColor = `${accentFrom}4d`)}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)')}>
                  <div className="mb-6 p-4 rounded-2xl inline-block transition-all" style={{ background: `${accentFrom}1a` }}>
                    <Icon className="w-8 h-8" style={{ color: accentFrom }} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                  <p className="text-gray-500 leading-relaxed text-sm">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── EDGE INTELLIGENCE ────────────────────────────────────────────── */}
      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-4xl md:text-6xl font-black mb-8 italic tracking-tighter uppercase leading-tight">
              {edgePl} <br /><span style={{ color: accentFrom }}>{edgeAcc}</span>
            </h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">{edgeBody}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              {badgeItems.map((b, i) => {
                const Icon = ICON_MAP[b.icon] ?? Settings;
                return (
                  <div key={i} className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/5 transition-all"
                    onMouseEnter={e => (e.currentTarget.style.borderColor = `${accentFrom}4d`)}
                    onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)')}>
                    <Icon className="shrink-0" style={{ color: accentFrom }} />
                    <span className="text-xs font-bold uppercase tracking-widest">{b.text}</span>
                  </div>
                );
              })}
            </div>
          </div>
          {/* Sensor card */}
          <div className="relative">
            <div className="absolute -inset-10 rounded-full" style={{ background: `${accentFrom}0d`, filter: 'blur(100px)' }} />
            <div className="relative border border-white/10 rounded-[3rem] p-10 shadow-2xl overflow-hidden font-mono" style={{ background: '#050301' }}>
              <div className="flex justify-between items-center mb-10 pb-6 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <Construction className="w-4 h-4" style={{ color: accentFrom }} />
                  <span className="text-[10px] text-gray-500 uppercase tracking-widest">Line_B42_Sensor_Array</span>
                </div>
                <div className="text-[10px] animate-pulse uppercase tracking-[0.2em]" style={{ color: accentFrom }}>MONITORING</div>
              </div>
              <div className="space-y-6">
                <div className="p-5 rounded-2xl bg-white/5 border border-white/5">
                  <p className="text-[10px] text-gray-500 uppercase mb-3 text-center">Equipment Longevity (Remaining)</p>
                  <div className="flex items-center gap-4">
                    <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ background: accentFrom, width: `${equipPct}%` }} />
                    </div>
                    <span className="text-xs font-bold">{equipPct}%</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl border" style={{ background: `${accentFrom}0d`, borderColor: `${accentFrom}1a` }}>
                    <p className="text-[8px] text-gray-500 uppercase mb-1">Defect Rate</p>
                    <p className="text-xl font-bold text-emerald-400">{defectRate}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                    <p className="text-[8px] text-gray-500 uppercase mb-1">Energy Draw</p>
                    <p className="text-xl font-bold">{energyDraw}</p>
                  </div>
                </div>
              </div>
              <div className="mt-8 p-4 rounded-xl border border-dashed text-[10px]"
                style={{ background: '#0a0501', borderColor: `${accentFrom}33`, color: `${accentFrom}cc` }}>
                <p className="font-bold mb-1">EDGE_LOG_AI:</p>
                <p className="italic">{edgeLog}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="py-12 border-y border-white/5"><ExecutionFlow /></div>
      <SuccessStories />

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto border rounded-[4rem] p-12 md:p-24 text-center backdrop-blur-3xl relative overflow-hidden"
          style={{ background: 'linear-gradient(to bottom right, rgba(39,39,42,0.8), #000)', borderColor: `${accentFrom}33` }}>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-7xl font-black mb-8 italic tracking-tighter uppercase leading-tight whitespace-pre-line">{ctaHeadline}</h2>
            <p className="text-lg md:text-xl mb-12 max-w-2xl mx-auto" style={{ color: `${accentFrom}b3` }}>{ctaBody}</p>
            <div className="flex flex-col items-center gap-6">
              <button className="px-16 py-6 rounded-full font-black text-2xl hover:scale-110 transition-all shadow-2xl text-white uppercase"
                style={{ background: accentFrom }}>
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