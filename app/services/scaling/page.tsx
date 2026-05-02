// app/services/ai-scaling/page.tsx
'use client';

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import ExecutionFlow from '@/components/sections/ExecutionFlow';
import SuccessStories from '@/components/sections/SuccessStories';
import {
  Rocket, Globe, Zap, BarChart, Server,
  Infinity, ArrowRight, TrendingUp, Activity,
} from 'lucide-react';
import { usePageContent } from '@/hooks/usePageContent';

// ── Icon maps ─────────────────────────────────────────────────────────────────
const INFRA_ICON_MAP: Record<string, React.ElementType> = { Server, Globe, Zap };
const POINT_ICON_MAP: Record<string, React.ElementType> = { TrendingUp, Zap, BarChart };

// ── Types ─────────────────────────────────────────────────────────────────────
interface InfraCard  { title: string; desc: string; icon: string }
interface ScalePoint { title: string; desc: string; icon: string }

function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

// ── Defaults ──────────────────────────────────────────────────────────────────
const DEFAULT_INFRA_CARDS = JSON.stringify([
  { title: 'GPU Orchestration',   desc: 'Dynamic load balancing across H100/A100 clusters to ensure sub-second inference latency.', icon: 'Server' },
  { title: 'Global Distribution', desc: 'Deploy AI nodes across 40+ regions to maintain low-latency response times for global users.',icon: 'Globe'  },
  { title: 'Elastic Concurrency', desc: 'Infrastructure that auto-scales based on token demand, handling sudden spikes without failure.', icon: 'Zap' },
]);
const DEFAULT_SCALE_POINTS = JSON.stringify([
  { title: 'Predictive Scaling',  desc: 'AI that predicts token usage spikes and scales GPU resources ahead of time.',              icon: 'TrendingUp' },
  { title: 'Multi-Model Routing', desc: 'Dynamically switch between models based on task complexity to save costs.',               icon: 'Zap'        },
  { title: 'Telemetry & Logs',    desc: 'Full-stack observability to monitor agent behavior and cost per request.',                icon: 'BarChart'   },
]);

export default function AIScalingPage() {
  const { get } = usePageContent('services-ai-scaling');

  // ── CMS values ────────────────────────────────────────────────────────────
  const accentColor      = get('hero', 'accent_color',         '#6366f1');
  const accentColorTo    = get('hero', 'accent_color_to',      '#3b82f6');
  const badgeText        = get('hero', 'badge_text',           'Enterprise Industrialization');
  const headlineLine1    = get('hero', 'headline_line1',       'SCALE TO');
  const headlineAccent   = get('hero', 'headline_accent',      'INFINITY');
  const heroBody         = get('hero', 'body_text',            'Move from a single agent to a global swarm. We provide the infrastructure, GPU orchestration, and monitoring layers required to serve millions of users with 99.9% uptime.');
  const btnPrimaryLabel  = get('hero', 'btn_primary_label',    'Launch Scaling Audit');

  const infraCards       = safeParse<InfraCard[]>(get('infrastructure', 'cards_json', DEFAULT_INFRA_CARDS), []);

  const monitorLabel     = get('metrics', 'monitor_label',     'CLUSTER_HEALTH_MONITOR');
  const throughputLabel  = get('metrics', 'throughput_label',  'Token Throughput');
  const throughputValue  = get('metrics', 'throughput_value',  '1.2M / sec');
  const latencyValue     = get('metrics', 'latency_value',     '140ms');
  const uptimeValue      = get('metrics', 'uptime_value',      '99.99%');
  const metricsHeadline  = get('metrics', 'section_headline',  'Zero-Friction Deployment');
  const scalePoints      = safeParse<ScalePoint[]>(get('metrics', 'points_json', DEFAULT_SCALE_POINTS), []);

  const ctaHeadline      = get('cta', 'headline',              "Go Global\nInstantly");
  const ctaBody          = get('cta', 'body_text',             'Our infrastructure architects at DLF Cyber City are ready to take your AI from pilot to production.');
  const ctaBtnLabel      = get('cta', 'btn_label',             'UPGRADE STACK');
  const ctaLocation      = get('cta', 'location_label',        'Location: Gurugram, India');

  return (
    <main className="flex min-h-screen flex-col bg-[#020617] text-white overflow-x-hidden">
      <Navbar />

      {/* ── HERO ────────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] rounded-full blur-[120px] -z-10"
          style={{ background: `${accentColor}1a` }} />
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 backdrop-blur-md"
            style={{ background: `${accentColor}1a`, border: `1px solid ${accentColor}33` }}>
            <Rocket className="w-4 h-4" style={{ color: accentColor }} />
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: accentColor }}>{badgeText}</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-tight">
            {headlineLine1} <br />
            <span className="text-transparent bg-clip-text italic"
              style={{ backgroundImage: `linear-gradient(to right, ${accentColor}, ${accentColorTo})` }}>
              {headlineAccent}
            </span>
          </h1>
          <p className="max-w-3xl mx-auto text-gray-400 text-lg md:text-xl leading-relaxed mb-12">{heroBody}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-10 py-5 rounded-2xl font-bold transition-all shadow-xl flex items-center justify-center gap-2 text-white"
              style={{ background: accentColor, boxShadow: `0 20px 40px ${accentColor}33` }}>
              {btnPrimaryLabel} <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* ── INFRASTRUCTURE CARDS ────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {infraCards.map((card, i) => {
            const Icon = INFRA_ICON_MAP[card.icon] ?? Server;
            return (
              <div key={i} className="group p-10 rounded-[2.5rem] border border-white/5 hover:border-indigo-500/30 transition-all"
                style={{ background: `${accentColor}08` }}>
                <div className="mb-6 p-4 rounded-2xl inline-block transition-all"
                  style={{ background: `${accentColor}1a` }}>
                  <Icon className="w-8 h-8" style={{ color: accentColor }} />
                </div>
                <h3 className="text-2xl font-bold mb-4">{card.title}</h3>
                <p className="text-gray-500 leading-relaxed">{card.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── METRICS & DEPLOYMENT ────────────────────────────────────────────── */}
      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Monitor widget */}
          <div className="relative">
            <div className="absolute -inset-10 rounded-full blur-[100px] opacity-10"
              style={{ background: accentColor }} />
            <div className="relative bg-[#03081a] border border-white/10 rounded-[3rem] p-10 shadow-2xl">
              <div className="flex justify-between items-center mb-10">
                <div className="flex items-center gap-3">
                  <Activity className="w-4 h-4 animate-pulse" style={{ color: accentColor }} />
                  <span className="font-mono text-[10px] text-gray-500">{monitorLabel}</span>
                </div>
                <Infinity style={{ color: accentColor }} className="w-5 h-5" />
              </div>
              <div className="space-y-8">
                <div>
                  <div className="flex justify-between text-[10px] uppercase text-gray-500 font-bold mb-2">
                    <span>{throughputLabel}</span>
                    <span style={{ color: accentColor }}>{throughputValue}</span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full w-[92%] rounded-full" style={{ background: accentColor }} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                    <p className="text-[10px] text-gray-500 uppercase">Latency</p>
                    <p className="text-2xl font-black italic" style={{ color: accentColor }}>{latencyValue}</p>
                  </div>
                  <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                    <p className="text-[10px] text-gray-500 uppercase">Uptime</p>
                    <p className="text-2xl font-black italic" style={{ color: accentColor }}>{uptimeValue}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Copy + scale points */}
          <div>
            <h2 className="text-4xl md:text-6xl font-black mb-8 italic tracking-tighter leading-tight">{metricsHeadline}</h2>
            <div className="space-y-8">
              {scalePoints.map((point, idx) => {
                const Icon = POINT_ICON_MAP[point.icon] ?? Zap;
                return (
                  <div key={idx} className="flex gap-5 group">
                    <div className="mt-1 p-3 rounded-xl bg-white/5 transition-all"
                      style={{}} >
                      <Icon style={{ color: accentColor }} />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-1">{point.title}</h4>
                      <p className="text-gray-400 leading-relaxed text-sm">{point.desc}</p>
                    </div>
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

      <SuccessStories />

      {/* ── CTA ─────────────────────────────────────────────────────────────── */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto border rounded-[4rem] p-12 md:p-24 text-center backdrop-blur-3xl relative overflow-hidden"
          style={{ background: `linear-gradient(to bottom right, ${accentColor}33, ${accentColorTo}33)`, borderColor: `${accentColor}33` }}>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-7xl font-black mb-8 italic tracking-tighter uppercase leading-tight">
              {ctaHeadline.split('\n').map((line, i) => (
                <React.Fragment key={i}>{line}{i < ctaHeadline.split('\n').length - 1 && <br />}</React.Fragment>
              ))}
            </h2>
            <p className="text-blue-100/70 text-lg md:text-xl mb-12 max-w-2xl mx-auto">{ctaBody}</p>
            <div className="flex flex-col items-center gap-6">
              <button className="bg-white px-16 py-6 rounded-full font-black text-2xl hover:scale-110 transition-all shadow-2xl"
                style={{ color: accentColor }}>
                {ctaBtnLabel}
              </button>
              <div className="font-mono text-sm tracking-widest uppercase" style={{ color: accentColor }}>{ctaLocation}</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}