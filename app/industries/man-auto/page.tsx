'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Car, Cpu, Orbit, Zap, ShieldCheck, Wind, ArrowRight,
  Navigation, CheckCircle2, Activity,
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
  Wind, Orbit, Zap, ShieldCheck, Navigation, Car, Cpu, Activity, CheckCircle2,
};

const DEFAULT_FEATURES = JSON.stringify([
  { title: 'Generative Design AI',  desc: 'Optimizing vehicle components for weight, strength, and aerodynamics using AI models that explore thousands of iterations in minutes.', icon: 'Wind'  },
  { title: 'ADAS & Vision Systems', desc: 'Training custom neural networks for object detection, lane tracking, and path planning in diverse environmental conditions.',               icon: 'Orbit' },
  { title: 'Predictive Powertrain', desc: 'AI models that optimize EV battery management and internal combustion efficiency through real-time sensor fusion.',                        icon: 'Zap'   },
]);
const DEFAULT_BADGES = JSON.stringify([
  { icon: 'ShieldCheck', text: 'ISO 26262 Safety'      },
  { icon: 'Navigation',  text: 'Edge-SLAM Navigation'  },
]);

export default function AutomotiveManufacturingPage() {
  const { get } = usePageContent('industry-automotive');

  // ── Hero ──────────────────────────────────────────────────────────────────
  const accentFrom     = get('hero', 'accent_from',      '#3b82f6');
  const accentTo       = get('hero', 'accent_to',        '#06b6d4');
  const badgeText      = get('hero', 'badge_text',       'Automotive & Mobility Vertical');
  const heroPl         = get('hero', 'headline_plain',   'SOFTWARE');
  const heroAcc        = get('hero', 'headline_accent',  'DEFINED');
  const heroBody       = get('hero', 'body_text',        'The vehicle is the new platform. We build the AI architectures that power autonomous navigation, predictive maintenance, and next-gen cockpit experiences.');
  const heroBtnLabel   = get('hero', 'btn_label',        'Accelerate Innovation');
  const heroBgUrl      = get('hero', 'hero_bg_url',      '');

  // ── Features ──────────────────────────────────────────────────────────────
  const featPl         = get('features', 'headline_plain',  'Core');
  const featAcc        = get('features', 'headline_accent', 'Capabilities.');
  const featureCards   = safeParse<FeatureCard[]>(get('features', 'cards_json', DEFAULT_FEATURES), []);

  // ── Digital Chassis ───────────────────────────────────────────────────────
  const chassisPl      = get('chassis', 'headline_plain',  'Digital');
  const chassisAcc     = get('chassis', 'headline_accent', 'Chassis');
  const chassisBody    = get('chassis', 'body_text',       'We specialize in the integration of hardware and intelligence. Our teams build high-fidelity Digital Twins for crash simulations and OTA update systems that keep fleets at peak performance throughout their lifecycle.');
  const badgeItems     = safeParse<BadgeItem[]>(get('chassis', 'badges_json', DEFAULT_BADGES), []);
  const autonomyPct    = get('chassis', 'autonomy_pct',   '98');
  const latencyMs      = get('chassis', 'latency_ms',     '12ms');
  const energyRegen    = get('chassis', 'energy_regen',   '+22%');
  const debugMsg       = get('chassis', 'debug_message',  '"Detected unusual heat signature in rear motor inverter. Re-routing torque distribution. Performance impact: 0%."');

  // ── CTA ───────────────────────────────────────────────────────────────────
  const ctaHeadline    = get('cta', 'headline',         'Drive The Standard');
  const ctaBody        = get('cta', 'body_text',        'Our mobility engineers at DLF Cyber City are building the brain for the next billion miles.');
  const ctaBtnLabel    = get('cta', 'btn_label',        'START MOBILITY BUILD');
  const ctaLocation    = get('cta', 'location_label',   'Mobility Hub: Gurugram, India');

  return (
    <main className="flex min-h-screen flex-col bg-[#020617] text-white overflow-x-hidden">
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] rounded-full blur-[120px] -z-10"
          style={{ background: `${accentFrom}1a` }} />
        <div className="max-w-7xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-8 backdrop-blur-md"
            style={{ background: `${accentFrom}1a`, borderColor: `${accentFrom}33` }}>
            <Car className="w-4 h-4" style={{ color: accentFrom }} />
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: accentFrom }}>{badgeText}</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-tight uppercase">
            {heroPl} <br />
            <span className="italic" style={{
              backgroundImage: `linear-gradient(to right, ${accentFrom}, ${accentTo})`,
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>{heroAcc}</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="max-w-3xl mx-auto text-gray-400 text-lg md:text-xl leading-relaxed mb-12">
            {heroBody}
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-10 py-5 rounded-2xl font-bold transition-all shadow-xl flex items-center justify-center gap-2 text-white hover:opacity-90"
              style={{ background: accentFrom, boxShadow: `0 20px 40px ${accentFrom}33` }}>
              {heroBtnLabel} <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight uppercase">
              {featPl} <span className="italic" style={{ color: accentTo }}>{featAcc}</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featureCards.map((item, i) => {
              const Icon = ICON_MAP[item.icon] ?? Zap;
              return (
                <motion.div key={i} whileHover={{ y: -8 }}
                  className="group p-10 rounded-[2.5rem] bg-slate-900/40 border border-white/5 transition-all"
                  style={{ ['--hover-border' as any]: `${accentFrom}4d` }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = `${accentFrom}4d`)}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)')}>
                  <div className="mb-6 p-4 rounded-2xl inline-block transition-all"
                    style={{ background: `${accentFrom}1a` }}
                    onMouseEnter={e => (e.currentTarget.style.background = accentFrom)}
                    onMouseLeave={e => (e.currentTarget.style.background = `${accentFrom}1a`)}>
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

      {/* ── DIGITAL CHASSIS ──────────────────────────────────────────────── */}
      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-4xl md:text-6xl font-black mb-8 italic tracking-tighter uppercase leading-tight">
              {chassisPl} <br /><span style={{ color: accentFrom }}>{chassisAcc}</span>
            </h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">{chassisBody}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              {badgeItems.map((b, i) => {
                const Icon = ICON_MAP[b.icon] ?? ShieldCheck;
                return (
                  <div key={i} className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-blue-500/30 transition-all">
                    <Icon className="shrink-0" style={{ color: accentFrom }} />
                    <span className="text-xs font-bold uppercase tracking-widest">{b.text}</span>
                  </div>
                );
              })}
            </div>
          </div>
          {/* Telemetry card */}
          <div className="relative">
            <div className="absolute -inset-10 rounded-full" style={{ background: `${accentFrom}0d`, filter: 'blur(100px)' }} />
            <div className="relative bg-[#01040a] border border-white/10 rounded-[3rem] p-10 shadow-2xl overflow-hidden font-mono">
              <div className="flex justify-between items-center mb-10 pb-6 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4" style={{ color: accentFrom }} />
                  <span className="text-[10px] text-gray-500 uppercase tracking-widest">Vehicle_OS_Telemetry</span>
                </div>
                <div className="text-[10px] animate-pulse uppercase tracking-[0.2em]" style={{ color: accentTo }}>Connected</div>
              </div>
              <div className="space-y-6">
                <div className="p-5 rounded-2xl bg-white/5 border border-white/5">
                  <p className="text-[10px] text-gray-500 uppercase mb-3">Autonomy Confidence Level</p>
                  <div className="flex items-center gap-4">
                    <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ background: accentFrom, width: `${autonomyPct}%` }} />
                    </div>
                    <span className="text-xs font-bold" style={{ color: accentFrom }}>{autonomyPct}%</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl border" style={{ background: `${accentFrom}0d`, borderColor: `${accentFrom}1a` }}>
                    <p className="text-[8px] text-gray-500 uppercase mb-1">Compute Latency</p>
                    <p className="text-xl font-bold text-emerald-400">{latencyMs}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                    <p className="text-[8px] text-gray-500 uppercase mb-1">Energy Regen</p>
                    <p className="text-xl font-bold" style={{ color: accentFrom }}>{energyRegen}</p>
                  </div>
                </div>
              </div>
              <div className="mt-8 p-4 rounded-xl border border-dashed text-[10px]"
                style={{ background: `${accentFrom}0d`, borderColor: `${accentFrom}33`, color: `${accentTo}cc` }}>
                <p className="font-bold mb-1">FLEET_AI_DEBUG:</p>
                <p className="italic">{debugMsg}</p>
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
          style={{ background: `linear-gradient(to bottom right, ${accentFrom}1a, #000)`, borderColor: `${accentFrom}33` }}>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-7xl font-black mb-8 italic tracking-tighter uppercase leading-tight">{ctaHeadline}</h2>
            <p className="text-lg md:text-xl mb-12 max-w-2xl mx-auto" style={{ color: 'rgba(219,234,254,0.7)' }}>{ctaBody}</p>
            <div className="flex flex-col items-center gap-6">
              <button className="bg-white px-16 py-6 rounded-full font-black text-2xl hover:scale-110 transition-all shadow-2xl"
                style={{ color: '#020617' }}>
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