'use client';

import React from 'react';
import {
  Cpu, Watch, Activity, Eye, Zap,
  ShieldCheck, ArrowRight, HardDrive, Waves,
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import ExecutionFlow from '@/components/sections/ExecutionFlow';
import SuccessStories from '@/components/sections/SuccessStories';
import { usePageContent } from '@/hooks/usePageContent';

function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

interface FeatureCard  { title: string; desc: string; icon: string }
interface TrustBadge   { label: string; icon: string }
interface EdgeMetric   { label: string; value: string; color: string; bar?: number }

const ICON_MAP: Record<string, React.ElementType> = {
  Cpu, Watch, Activity, Eye, Zap, ShieldCheck, HardDrive, Waves,
};

const DEFAULT_FEATURES = JSON.stringify([
  { title: 'Surgical Computer Vision', desc: 'Real-time organ segmentation and tool tracking for minimally invasive robotic surgery systems.',                                  icon: 'Eye'      },
  { title: 'Wearable Biosignals',      desc: 'On-device processing of ECG, SpO2, and EEG data using tinyML to detect arrhythmias and seizures instantly.',                     icon: 'Watch'    },
  { title: 'Diagnostic Imaging AI',    desc: 'Deep learning models for portable ultrasound and X-ray hardware for immediate triage in remote areas.',                           icon: 'Activity' },
], null, 2);
const DEFAULT_TRUST_BADGES = JSON.stringify([
  { label: 'Firmware Optimized', icon: 'HardDrive'   },
  { label: 'ISO 13485 Ready',    icon: 'ShieldCheck' },
], null, 2);
const DEFAULT_EDGE_METRICS = JSON.stringify([
  { label: 'NPU Load',            value: '42%',    color: '#06b6d4', bar: 42  },
  { label: 'Inference Latency',   value: '8.4ms',  color: '#3b82f6', bar: null },
  { label: 'Power Efficiency',    value: 'Optimal',color: '#10b981', bar: null },
], null, 2);

export default function HealthDevicesPage() {
  const { get } = usePageContent('industry-health-devices');

  // Hero
  const accentFrom      = get('hero', 'accent_from',     '#3b82f6');
  const accentTo        = get('hero', 'accent_to',       '#06b6d4');
  const badgeText       = get('hero', 'badge_text',      'Medical IoT & Edge AI Vertical');
  const heroPl          = get('hero', 'headline_plain',  'INTELLIGENT');
  const heroAcc         = get('hero', 'headline_accent', 'SILICON CARE');
  const heroBody        = get('hero', 'body_text',       'Intelligence at the point of care. We build low-latency, high-reliability AI models for medical hardware—from wearable biosensors to autonomous surgical robotics and diagnostic imaging devices.');
  const heroBtnLabel    = get('hero', 'btn_label',       'Engineer Your Device');

  // Features
  const featuresItems   = safeParse<FeatureCard[]>(get('features', 'items_json', DEFAULT_FEATURES), []);

  // Edge
  const edgePl          = get('edge', 'headline_plain',    'Hardened for');
  const edgeAcc         = get('edge', 'headline_accent',   'Reliability');
  const edgeBody        = get('edge', 'body_text',         'Medical hardware leaves no room for error. We specialize in Model Quantization and Hardware Acceleration to ensure your AI runs locally on the device—eliminating cloud latency and maintaining patient privacy.');
  const trustBadges     = safeParse<TrustBadge[]>(get('edge', 'trust_badges_json', DEFAULT_TRUST_BADGES), []);
  const edgeMetrics     = safeParse<EdgeMetric[]>(get('edge', 'edge_metrics_json', DEFAULT_EDGE_METRICS), []);
  const coreLabel       = get('edge', 'core_label',        'Edge_Inference_Core');
  const tracerQuote     = get('edge', 'tracer_quote',      'Vascular pattern recognized. Guiding tool path to bypass arterial branch...');

  // CTA
  const ctaHeadline     = get('cta', 'headline',      'Bring Silicon To Life');
  const ctaBody         = get('cta', 'body_text',     'Our hardware-AI engineers at DLF Cyber City are ready to build the future of medical robotics and wearables.');
  const ctaBtnLabel     = get('cta', 'btn_label',     'START HARDWARE BUILD');
  const ctaLocation     = get('cta', 'location_text', 'Sector 24, Cyber Hub, Gurugram');

  return (
    <main className="flex min-h-screen flex-col bg-[#020617] text-white overflow-x-hidden">
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[120px] -z-10"
          style={{ background: `${accentFrom}1a` }} />
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-8 backdrop-blur-md"
            style={{ background: `${accentFrom}1a`, borderColor: `${accentFrom}33` }}>
            <Cpu className="w-4 h-4" style={{ color: accentFrom }} />
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: accentFrom }}>{badgeText}</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-tight uppercase">
            {heroPl} <br />
            <span className="text-transparent bg-clip-text italic"
              style={{ backgroundImage: `linear-gradient(to right, ${accentFrom}, ${accentTo})` }}>
              {heroAcc}
            </span>
          </h1>
          <p className="max-w-3xl mx-auto text-gray-400 text-lg md:text-xl leading-relaxed mb-12">{heroBody}</p>
          <button className="px-10 py-5 rounded-2xl font-bold transition-all shadow-xl flex items-center justify-center gap-2 text-white mx-auto"
            style={{ background: accentFrom }}>
            {heroBtnLabel} <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuresItems.map((item, i) => {
            const Icon = ICON_MAP[item.icon] ?? Activity;
            return (
              <div key={i} className="group p-10 rounded-[2.5rem] border border-white/5 transition-all"
                style={{ background: `${accentFrom}08` }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = `${accentFrom}4d`)}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)')}>
                <div className="mb-6 p-4 rounded-2xl inline-block" style={{ background: `${accentFrom}1a` }}>
                  <Icon className="w-8 h-8" style={{ color: accentFrom }} />
                </div>
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-gray-500 leading-relaxed text-sm">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── EDGE RELIABILITY ─────────────────────────────────────────── */}
      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Edge Card */}
          <div className="relative">
            <div className="absolute -inset-10 rounded-full blur-[100px]" style={{ background: `${accentTo}0d` }} />
            <div className="relative bg-[#03081a] border border-white/10 rounded-[3rem] p-10 shadow-2xl font-mono">
              <div className="flex justify-between items-center mb-12">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4" style={{ color: accentTo }} />
                  <span className="text-[10px] text-gray-500 uppercase">{coreLabel}</span>
                </div>
                <Waves className="w-4 h-4 animate-pulse" style={{ color: accentFrom }} />
              </div>
              <div className="space-y-8">
                {edgeMetrics.map((m, i) => (
                  <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/5">
                    <p className="text-[10px] text-gray-500 uppercase mb-3">{m.label}</p>
                    {m.bar != null ? (
                      <div className="flex items-center gap-4">
                        <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: `${m.bar}%`, background: m.color }} />
                        </div>
                        <span className="text-xs font-bold" style={{ color: m.color }}>{m.value}</span>
                      </div>
                    ) : (
                      <p className="text-xl font-bold" style={{ color: m.color }}>{m.value}</p>
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-10 pt-6 border-t border-white/5">
                <p className="text-[10px] text-gray-500">REAL-TIME_TRACER:</p>
                <p className="text-[11px] mt-2 italic" style={{ color: `${accentTo}cc` }}>&ldquo;{tracerQuote}&rdquo;</p>
              </div>
            </div>
          </div>

          {/* Text */}
          <div>
            <h2 className="text-4xl md:text-6xl font-black mb-8 italic tracking-tighter uppercase leading-tight">
              {edgePl}<br /><span style={{ color: accentTo }}>{edgeAcc}</span>
            </h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">{edgeBody}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              {trustBadges.map((badge, i) => {
                const Icon = ICON_MAP[badge.icon] ?? HardDrive;
                return (
                  <div key={i} className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/5">
                    <Icon style={{ color: accentFrom }} />
                    <span className="text-xs font-bold uppercase tracking-widest">{badge.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <div className="py-12 border-y border-white/5"><ExecutionFlow /></div>
      <SuccessStories />

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto border rounded-[4rem] p-12 md:p-24 text-center backdrop-blur-3xl relative overflow-hidden"
          style={{ background: `linear-gradient(to bottom right, ${accentFrom}1a, ${accentTo}1a)`, borderColor: `${accentFrom}33` }}>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-7xl font-black mb-8 italic tracking-tighter uppercase leading-tight">{ctaHeadline}</h2>
            <p className="text-lg md:text-xl mb-12 max-w-2xl mx-auto" style={{ color: 'rgba(219,234,254,0.7)' }}>{ctaBody}</p>
            <div className="flex flex-col items-center gap-6">
              <button className="bg-white px-16 py-6 rounded-full font-black text-2xl hover:scale-110 transition-all shadow-2xl"
                style={{ color: '#1e3a8a' }}>
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