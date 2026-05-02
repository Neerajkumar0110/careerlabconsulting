// app/services/iot-ai/page.tsx
'use client';

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import ExecutionFlow from '@/components/sections/ExecutionFlow';
import FeatureGrid from '@/components/sections/FeatureGrid';
import { usePageContent } from '@/hooks/usePageContent';
import {
  Cpu, Radio, Settings, Zap, ShieldCheck,
  Factory, Activity, ArrowRight, HardDrive, Waves,
} from 'lucide-react';

const ICON_MAP: Record<string, React.ElementType> = {
  Settings, Factory, Waves, Cpu, Zap, ShieldCheck,
};

interface CapabilityItem { title: string; desc: string; icon: string }
interface SensorStat     { label: string; val: string; status: string }
interface EdgePoint      { t: string; i: string }

function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

const DEFAULT_CAPABILITIES: CapabilityItem[] = [
  { title: 'Predictive Maintenance', desc: 'Algorithms that analyze vibration, heat, and sound to predict machine failure before it occurs.',         icon: 'Settings' },
  { title: 'Edge Computer Vision',   desc: 'On-device visual inspection for quality control on manufacturing lines with zero latency.',                icon: 'Factory'  },
  { title: 'Sensor Fusion AI',       desc: 'Combining data from multiple IoT sources into a single unified neural intelligence layer.',               icon: 'Waves'    },
];
const DEFAULT_SENSOR_STATS: SensorStat[] = [
  { label: 'Thermal Variance', val: '42.8°C', status: 'Nominal'      },
  { label: 'RPM Efficiency',   val: '94%',    status: 'Optimal'      },
  { label: 'Signal Latency',   val: '4ms',    status: 'Edge_Active'  },
];
const DEFAULT_EDGE_POINTS: EdgePoint[] = [
  { t: 'Custom Firmware Integration',  i: 'Cpu'        },
  { t: 'Zero-Latency Inference',       i: 'Zap'        },
  { t: 'Encrypted Hardware Handshakes',i: 'ShieldCheck'},
];

export default function IoTAIPage() {
  const { get } = usePageContent('services-iot-ai');

  // ── Hero
  const badgeText   = get('hero', 'badge_text',      'Industrial Intelligence & Edge');
  const heroPl      = get('hero', 'headline_plain',  'PHYSICAL');
  const heroAcc     = get('hero', 'headline_accent', 'AI SYSTEMS');
  const heroBody    = get('hero', 'body_text',        'Bring autonomous intelligence to the physical world. We integrate AI directly into hardware, sensors, and industrial machinery to enable real-time decision-making at the edge.');
  const heroBtnLbl  = get('hero', 'btn_label',        'Connect Your Hardware');
  const accentColor = get('hero', 'accent_color',     '#10b981');
  const accentSec   = get('hero', 'accent_secondary', '#14b8a6');

  // ── Capabilities
  const capabilities = safeParse<CapabilityItem[]>(get('capabilities', 'items_json', '[]'), DEFAULT_CAPABILITIES);

  // ── Edge
  const edgeHeadline   = get('edge', 'headline',          'Intelligence at the Edge');
  const edgeBody       = get('edge', 'body_text',         'Cloud dependency is a bottleneck for industrial operations. We deploy lightweight, optimized models directly onto ARM and RISC-V hardware to ensure your systems remain intelligent even in offline environments.');
  const sensorStats    = safeParse<SensorStat[]>(get('edge', 'sensor_stats_json', '[]'), DEFAULT_SENSOR_STATS);
  const edgePoints     = safeParse<EdgePoint[]>(get('edge', 'edge_points_json', '[]'), DEFAULT_EDGE_POINTS);

  // ── CTA
  const ctaHeadline = get('cta', 'headline',   'Sync the Physical World');
  const ctaBody     = get('cta', 'body_text',  'Our IoT architects at DLF Cyber City are ready to digitize your industrial footprint.');
  const ctaBtnLbl   = get('cta', 'btn_label',  'START PROTOTYPING');
  const phoneNumber = get('cta', 'phone_number', '+91 870023 6923');

  return (
    <main className="flex min-h-screen flex-col bg-[#020617] text-white overflow-x-hidden">
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full -z-10"
          style={{ background: `${accentColor}0d`, filter: 'blur(120px)' }} />
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-8 backdrop-blur-md"
            style={{ background: `${accentColor}1a`, borderColor: `${accentColor}33` }}>
            <Radio className="w-4 h-4" style={{ color: accentColor }} />
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: accentColor }}>{badgeText}</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-tight">
            {heroPl} <br />
            <span className="italic" style={{
              backgroundImage: `linear-gradient(to right, ${accentColor}, ${accentSec}, #3b82f6)`,
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>{heroAcc}</span>
          </h1>
          <p className="max-w-3xl mx-auto text-gray-400 text-lg md:text-xl leading-relaxed mb-12">{heroBody}</p>
          <button className="px-10 py-5 rounded-2xl font-bold transition-all shadow-xl flex items-center justify-center gap-2 mx-auto"
            style={{ background: accentColor, boxShadow: `0 20px 40px ${accentColor}33` }}>
            {heroBtnLbl} <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* ── CAPABILITIES ─────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {capabilities.map((item, i) => {
            const Icon = ICON_MAP[item.icon] ?? Zap;
            return (
              <div key={i} className="group p-10 rounded-[2.5rem] border border-white/5 transition-all"
                style={{ background: `${accentColor}08` }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = `${accentColor}50`)}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)')}>
                <div className="mb-6 p-4 rounded-2xl inline-block transition-all"
                  style={{ background: `${accentColor}1a` }}>
                  <Icon className="w-8 h-8" style={{ color: accentColor }} />
                </div>
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-gray-500 leading-relaxed text-sm">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── EDGE INTELLIGENCE ─────────────────────────────────────────── */}
      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Sensor Dashboard Card */}
          <div className="relative">
            <div className="absolute -inset-10 rounded-full"
              style={{ background: `${accentColor}08`, filter: 'blur(100px)' }} />
            <div className="relative bg-[#03081a] border border-white/10 rounded-[3rem] p-10 shadow-2xl overflow-hidden">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 animate-pulse" style={{ color: accentColor }} />
                  <span className="font-mono text-[10px] text-gray-500">REALTIME_SENSOR_DATA</span>
                </div>
                <HardDrive className="w-4 h-4 text-gray-600" />
              </div>
              <div className="space-y-6">
                {sensorStats.map((row, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-white/5 border border-white/5 flex justify-between items-center">
                    <div>
                      <p className="text-[10px] text-gray-500 uppercase tracking-widest">{row.label}</p>
                      <p className="text-xl font-bold">{row.val}</p>
                    </div>
                    <span className="text-[10px] px-2 py-1 rounded font-bold border"
                      style={{ background: `${accentColor}1a`, color: accentColor, borderColor: `${accentColor}33` }}>
                      {row.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Text */}
          <div>
            <h2 className="text-4xl md:text-6xl font-black mb-8 italic tracking-tighter uppercase">{edgeHeadline}</h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">{edgeBody}</p>
            <div className="space-y-4">
              {edgePoints.map((point, idx) => {
                const Icon = ICON_MAP[point.i] ?? Zap;
                return (
                  <div key={idx} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 transition-all cursor-default"
                    onMouseEnter={e => (e.currentTarget.style.borderColor = `${accentColor}80`)}
                    onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)')}>
                    <Icon style={{ color: accentColor }} />
                    <span className="font-bold">{point.t}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <div className="py-12 border-y border-white/5">
        <ExecutionFlow />
      </div>

      <FeatureGrid />

      {/* ── CTA ───────────────────────────────────────────────────────── */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto border rounded-[4rem] p-12 md:p-24 text-center backdrop-blur-3xl relative overflow-hidden"
          style={{ background: `linear-gradient(to bottom right, ${accentColor}1a, ${accentSec}0d)`, borderColor: `${accentColor}33` }}>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-7xl font-black mb-8 italic tracking-tighter uppercase leading-tight">{ctaHeadline}</h2>
            <p className="mb-12 max-w-2xl mx-auto" style={{ color: `${accentColor}b3` }}>{ctaBody}</p>
            <div className="flex flex-col items-center gap-6">
              <button className="bg-white px-16 py-6 rounded-full font-black text-2xl hover:scale-110 transition-all shadow-2xl"
                style={{ color: '#020617' }}>
                {ctaBtnLbl}
              </button>
              <div className="font-mono text-sm tracking-widest uppercase" style={{ color: accentColor }}>{phoneNumber}</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}