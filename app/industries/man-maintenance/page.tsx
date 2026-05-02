'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Wrench, Activity, ShieldAlert, Settings2, Clock,
  ArrowRight, Microscope, Database,
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
  Wrench, Activity, ShieldAlert, Settings2, Clock, Microscope, Database,
};

const DEFAULT_FEATURES = JSON.stringify([
  { title: 'Acoustic Anomaly AI',     desc: 'Deep learning models that identify internal mechanical wear by analyzing high-frequency sound patterns invisible to human ears.', icon: 'Activity'  },
  { title: 'Digital Health Records',  desc: 'Centralized AI ledgers that track every vibration, heat spike, and repair for every asset, creating a "Medical History" for your machines.', icon: 'Database'  },
  { title: 'Prescriptive Insights',   desc: "We don't just tell you when it will break; our AI generates step-by-step repair guides and automatically orders the required parts.", icon: 'Settings2' },
]);
const DEFAULT_BADGES = JSON.stringify([
  { icon: 'Microscope', text: 'Root Cause AI'    },
  { icon: 'Clock',      text: 'MTBF Optimization' },
]);

export default function PredictiveMaintenancePage() {
  const { get } = usePageContent('industry-predictive-maintenance');

  // ── Hero ──────────────────────────────────────────────────────────────────
  const accentFrom    = get('hero', 'accent_from',     '#eab308');
  const accentTo      = get('hero', 'accent_to',       '#78716c');
  const badgeText     = get('hero', 'badge_text',      'Asset Reliability & PdM Vertical');
  const heroPl        = get('hero', 'headline_plain',  'PREDICTIVE');
  const heroAcc       = get('hero', 'headline_accent', 'RESILIENCE');
  const heroBody      = get('hero', 'body_text',       'Eliminate reactive repairs. We build AI-driven reliability engines that listen to your machines, feel their vibrations, and predict RUL with surgical precision.');
  const heroBtnLabel  = get('hero', 'btn_label',       'Secure Your Assets');

  // ── Features ──────────────────────────────────────────────────────────────
  const featPl        = get('features', 'headline_plain',  'AI-Driven');
  const featAcc       = get('features', 'headline_accent', 'Capabilities.');
  const featureCards  = safeParse<FeatureCard[]>(get('features', 'cards_json', DEFAULT_FEATURES), []);

  // ── Asset Intelligence ────────────────────────────────────────────────────
  const assetPl       = get('asset', 'headline_plain',  'Asset');
  const assetAcc      = get('asset', 'headline_accent', 'Intelligence');
  const assetBody     = get('asset', 'body_text',       'Downtime is a data problem. By deploying Multi-Modal AI that correlates power consumption with mechanical output, we create a high-fidelity window into the soul of your infrastructure.');
  const badgeItems    = safeParse<BadgeItem[]>(get('asset', 'badges_json', DEFAULT_BADGES), []);
  const failureProb   = get('asset', 'failure_prob',    '8.2%');
  const rulHours      = get('asset', 'rul_hours',       '412 Hours');
  const aiPrescription = get('asset', 'ai_prescription', '"Lubrication viscosity drop detected. Schedule Top-up for Pump_09 during 02:00 Window to prevent thermal expansion."');

  // ── CTA ───────────────────────────────────────────────────────────────────
  const ctaHeadline   = get('cta', 'headline',       'Zero\nBreakdowns');
  const ctaBody       = get('cta', 'body_text',      'Our reliability engineers at DLF Cyber City are building the immune system for the world\'s most critical assets.');
  const ctaBtnLabel   = get('cta', 'btn_label',      'Start Reliability Audit');
  const ctaLocation   = get('cta', 'location_label', 'Reliability Hub: Gurugram, India');

  return (
    <main className="flex min-h-screen flex-col bg-[#020617] text-white overflow-x-hidden">
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full blur-[120px] -z-10"
          style={{ background: `${accentFrom}0d` }} />
        <div className="max-w-7xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-8 backdrop-blur-md"
            style={{ background: `${accentFrom}1a`, borderColor: `${accentFrom}33` }}>
            <Wrench className="w-4 h-4" style={{ color: accentFrom }} />
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
          <button className="px-10 py-5 rounded-2xl font-bold transition-all shadow-xl flex items-center justify-center gap-2 mx-auto hover:opacity-90"
            style={{ background: accentFrom, color: '#020617', boxShadow: `0 20px 40px ${accentFrom}33` }}>
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
              const Icon = ICON_MAP[item.icon] ?? Wrench;
              return (
                <motion.div key={i} whileHover={{ y: -8 }}
                  className="group p-10 rounded-[2.5rem] bg-zinc-900/40 border border-white/5 transition-all"
                  onMouseEnter={e => (e.currentTarget.style.borderColor = `${accentFrom}4d`)}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)')}>
                  <div className="mb-6 p-4 rounded-2xl inline-block transition-all" style={{ background: `${accentFrom}1a` }}>
                    <Icon className="w-8 h-8" style={{ color: accentFrom }} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                  <p className="text-gray-400 leading-relaxed text-sm">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── ASSET INTELLIGENCE ───────────────────────────────────────────── */}
      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Left: Reliability Engine Card */}
          <div className="relative">
            <div className="absolute -inset-10 rounded-full" style={{ background: `${accentFrom}0d`, filter: 'blur(100px)' }} />
            <div className="relative border border-white/10 rounded-[3rem] p-8 shadow-2xl font-mono" style={{ background: '#050401' }}>
              <div className="flex items-center gap-2 mb-8 border-b border-white/5 pb-4">
                <ShieldAlert className="w-4 h-4" style={{ color: accentFrom }} />
                <span className="text-[10px] uppercase tracking-widest" style={{ color: accentFrom }}>Reliability_Engine_v4</span>
              </div>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl border" style={{ background: `${accentFrom}0d`, borderColor: `${accentFrom}1a` }}>
                    <p className="text-[8px] text-gray-500 uppercase">Failure Probability</p>
                    <p className="text-xl font-bold text-red-500">{failureProb}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                    <p className="text-[8px] text-gray-500 uppercase">Est. RUL</p>
                    <p className="text-xl font-bold">{rulHours}</p>
                  </div>
                </div>
              </div>
              <div className="mt-8 p-4 rounded-xl border border-dashed text-[10px]"
                style={{ background: '#0a0801', borderColor: `${accentFrom}33`, color: `${accentFrom}cc` }}>
                <p className="font-bold mb-1 uppercase tracking-widest">AI_PRESCRIPTION:</p>
                <p className="italic">{aiPrescription}</p>
              </div>
            </div>
          </div>
          {/* Right */}
          <div>
            <h2 className="text-4xl md:text-6xl font-black mb-8 italic tracking-tighter uppercase leading-tight">
              {assetPl} <br /><span style={{ color: accentFrom }}>{assetAcc}</span>
            </h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">{assetBody}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              {badgeItems.map((b, i) => {
                const Icon = ICON_MAP[b.icon] ?? Wrench;
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
        </div>
      </section>

      <div className="py-12 border-y border-white/5"><ExecutionFlow /></div>
      <SuccessStories />

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto border rounded-[4rem] p-12 md:p-24 text-center backdrop-blur-3xl relative overflow-hidden"
          style={{ background: `linear-gradient(to bottom right, ${accentFrom}14, #000)`, borderColor: `${accentFrom}33` }}>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-7xl font-black mb-8 italic tracking-tighter uppercase leading-tight whitespace-pre-line">{ctaHeadline}</h2>
            <p className="text-lg md:text-xl mb-12 max-w-2xl mx-auto" style={{ color: `${accentFrom}b3` }}>{ctaBody}</p>
            <div className="flex flex-col items-center gap-6">
              <button className="px-16 py-6 rounded-full font-black text-2xl hover:scale-110 transition-all shadow-2xl uppercase"
                style={{ background: accentFrom, color: '#020617' }}>
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