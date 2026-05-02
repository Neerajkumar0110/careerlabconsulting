'use client';

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import ExecutionFlow from '@/components/sections/ExecutionFlow';
import SuccessStories from '@/components/sections/SuccessStories';
import { usePageContent } from '@/hooks/usePageContent';
import { BatteryCharging, ThermometerSun, Leaf, Activity, ShieldCheck, ArrowRight, Cpu, Unplug } from 'lucide-react';

function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

interface StatCard    { label: string; value: string; detail: string }
interface CapCard     { title: string; desc: string; icon: string }
interface FeatureItem { icon: string; text: string }

const ICON_MAP: Record<string, React.ElementType> = {
  Cpu, ThermometerSun, Unplug, Leaf, ShieldCheck, BatteryCharging, Activity
};

const DEFAULT_STATS = JSON.stringify([
  { label: 'BMS Efficiency', value: '98.4%', detail: 'AI-Optimized Discharge' },
  { label: 'Thermal Stability', value: '+30%', detail: 'Active Liquid Cooling AI' },
  { label: 'Range Prediction', value: '±1%', detail: 'Deep Learning Error Margin' },
  { label: 'Cell Lifecycle', value: '+2,000', detail: 'Cycles via AI Balancing' },
]);

const DEFAULT_CAPS = JSON.stringify([
  { title: 'AI-BMS Architectures', desc: 'Predictive cell balancing and State-of-Health monitoring using edge-deployed neural networks.', icon: 'Cpu' },
  { title: 'Thermal Mapping AI', desc: 'Real-time fluid dynamics simulation to optimize cooling loops during ultra-fast charging sessions (350kW+).', icon: 'ThermometerSun' },
  { title: 'V2G Grid Sync', desc: 'Vehicle-to-Grid protocols that allow EV fleets to act as decentralized energy storage for stabilizing smart grids.', icon: 'Unplug' },
]);

const DEFAULT_FEATURES = JSON.stringify([
  { icon: 'Leaf', text: 'Carbon-Footprint Lifecycle Tracking' },
  { icon: 'ShieldCheck', text: 'ISO 26262 ASIL-D Safety Certified AI' },
]);

export default function EVManufacturingPage() {
  const { get } = usePageContent('industry-ev-manufacturing');

  const badgeText    = get('hero', 'badge_text',     'Electric Powertrain & Battery Intelligence');
  const heroHeadline = get('hero', 'headline_plain', 'VOLTAGE');
  const heroAccent   = get('hero', 'headline_accent','INTELLIGENCE');
  const heroBody     = get('hero', 'body_text',      'The future of mobility is a chemistry problem solved by software. We build the AI-driven BMS that squeezes every watt of performance out of silicon-carbide inverters and solid-state cells while maintaining 100% safety.');
  const heroBtnLabel = get('hero', 'btn_label',      'Engineer My Powertrain');
  const gradientFrom = get('hero', 'gradient_from',  'from-lime-100');
  const gradientVia  = get('hero', 'gradient_via',   'via-lime-400');
  const gradientTo   = get('hero', 'gradient_to',    'to-emerald-600');
  const stats        = safeParse<StatCard[]>(get('hero', 'stats_json', DEFAULT_STATS), []);

  const capabilities  = safeParse<CapCard[]>(get('capabilities', 'cards_json', DEFAULT_CAPS), []);

  const detailHeadline = get('detail', 'headline',      'Cell\nOptimization');
  const detailBody     = get('detail', 'body_text',     'We move beyond binary charging. Our AI analyzes the atomic-level degradation of cells to create personalized charging profiles, extending battery life by up to 40% for commercial fleets.');
  const featureItems   = safeParse<FeatureItem[]>(get('detail', 'features_json', DEFAULT_FEATURES), []);

  const ctaHeadline   = get('cta', 'headline',  'Charge The\nFuture');
  const ctaBody       = get('cta', 'body_text', 'Our power electronics engineers at DLF Cyber City are building the operating system for the global energy transition.');
  const ctaBtnLabel   = get('cta', 'btn_label', 'START POWERTRAIN BUILD');
  const ctaSubtext    = get('cta', 'subtext',   'Energy Mobility Lab: Gurugram, India');

  return (
    <main className="flex min-h-screen flex-col bg-[#020617] text-white overflow-x-hidden">
      <Navbar />

      {/* HERO */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-lime-500/5 rounded-full blur-[140px] -z-10" />
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-lime-500/10 border border-lime-500/20 mb-8 backdrop-blur-md">
            <BatteryCharging className="w-4 h-4 text-lime-400" />
            <span className="text-lime-400 text-xs font-bold uppercase tracking-widest">{badgeText}</span>
          </div>
          <h1 className="text-4xl md:text-7xl font-black mb-8 tracking-tighter leading-none uppercase">
            {heroHeadline}<br />
            <span className={`text-transparent bg-clip-text bg-gradient-to-r ${gradientFrom} ${gradientVia} ${gradientTo} italic`}>{heroAccent}</span>
          </h1>
          <p className="max-w-3xl mx-auto text-gray-400 text-lg md:text-xl leading-relaxed mb-12">{heroBody}</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto mb-16">
            {stats.map((stat, i) => (
              <div key={i} className="p-6 bg-lime-950/10 border border-lime-500/10 rounded-3xl text-left hover:border-lime-500/40 transition-all">
                <p className="text-3xl font-black mb-1 text-white">{stat.value}</p>
                <p className="text-[10px] text-lime-400 uppercase font-bold tracking-widest">{stat.label}</p>
                <p className="text-[9px] text-gray-500 italic mt-2">{stat.detail}</p>
              </div>
            ))}
          </div>
          <button className="px-12 py-6 bg-lime-600 hover:bg-lime-700 rounded-2xl font-black transition-all shadow-2xl shadow-lime-500/20 flex items-center gap-3 mx-auto text-black uppercase tracking-tighter">
            {heroBtnLabel} <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </section>

      {/* CAPABILITIES */}
      <section className="py-24 px-6 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {capabilities.map((item, i) => {
            const Icon = ICON_MAP[item.icon] ?? Cpu;
            return (
              <div key={i} className="p-10 rounded-[3rem] bg-zinc-900/40 border border-white/5 hover:border-lime-500/30 transition-all group">
                <div className="mb-6 p-4 bg-lime-500/5 rounded-xl inline-block group-hover:bg-lime-500 transition-all">
                  <Icon className="w-8 h-8 text-lime-400 group-hover:text-black" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* DETAIL */}
      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-4xl md:text-7xl font-black mb-8 italic tracking-tighter uppercase leading-tight text-lime-400 whitespace-pre-line">{detailHeadline}</h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">{detailBody}</p>
            <div className="space-y-4 mt-8">
              {featureItems.map((item, i) => {
                const Icon = ICON_MAP[item.icon] ?? Leaf;
                return (
                  <div key={i} className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/10">
                    <Icon className="text-lime-500" />
                    <span className="text-xs font-bold uppercase tracking-widest italic">{item.text}</span>
                  </div>
                );
              })}
            </div>
          </div>
          {/* Terminal */}
          <div className="relative">
            <div className="absolute -inset-10 bg-lime-500/5 blur-[100px] rounded-full" />
            <div className="relative bg-[#020401] border border-lime-500/20 rounded-[3rem] p-10 shadow-2xl font-mono overflow-hidden">
              <div className="flex justify-between items-center mb-8 pb-4 border-b border-white/5">
                <div className="flex items-center gap-2 text-lime-500">
                  <Activity className="w-4 h-4 animate-pulse" />
                  <span className="text-[10px] uppercase font-black">Energy_Core_v8</span>
                </div>
                <div className="text-[10px] text-gray-500 uppercase">FAST_CHARGE_ACTIVE</div>
              </div>
              <div className="space-y-6">
                <div className="p-6 rounded-2xl bg-white/5 border border-white/5 text-center">
                  <p className="text-[10px] text-gray-500 uppercase mb-4">Pack Thermal Distribution</p>
                  <div className="flex justify-center gap-1">
                    {[10, 20, 40, 80, 95, 80, 40, 20, 10].map((v, i) => (
                      <div key={i} className="w-4 h-20 bg-zinc-800 rounded-full relative overflow-hidden">
                        <div className="absolute bottom-0 w-full bg-gradient-to-t from-lime-600 to-emerald-400" style={{ height: `${v}%` }} />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-lime-500/5 border border-lime-500/20 text-center">
                    <p className="text-[8px] text-gray-500 uppercase mb-1 font-bold">Inverter Temp</p>
                    <p className="text-xl font-black text-lime-400">42°C</p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-center">
                    <p className="text-[8px] text-gray-500 uppercase mb-1 font-bold">Current Out</p>
                    <p className="text-xl font-black italic">640A</p>
                  </div>
                </div>
                <div className="p-4 bg-lime-950/20 rounded-xl border border-dashed border-lime-500/30 text-[9px] text-lime-200">
                  <p className="font-bold uppercase mb-1 tracking-widest">BMS_LOG:</p>
                  <p className="italic">"Anomaly detected in Cell_Block_B2. Re-balancing voltage delta. Efficiency maintained at 99.1%."</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="py-12 border-y border-white/5"><ExecutionFlow /></div>
      <SuccessStories />

      {/* CTA */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto bg-gradient-to-br from-lime-950/30 to-black border border-lime-500/20 rounded-[4rem] p-12 md:p-24 text-center backdrop-blur-3xl relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-8xl font-black mb-8 italic tracking-tighter uppercase leading-tight whitespace-pre-line">{ctaHeadline}</h2>
            <p className="text-lime-100/70 text-lg md:text-xl mb-12 max-w-2xl mx-auto">{ctaBody}</p>
            <div className="flex flex-col items-center gap-6">
              <button className="bg-lime-500 text-black px-16 py-6 rounded-2xl font-black text-2xl hover:scale-105 transition-all shadow-2xl">{ctaBtnLabel}</button>
              <div className="text-lime-500 font-mono text-sm tracking-widest uppercase italic">{ctaSubtext}</div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}