// app/services/ai-integration/page.tsx
'use client';

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import ExecutionFlow from '@/components/sections/ExecutionFlow';
import FeatureGrid from '@/components/sections/FeatureGrid';
import {
  Zap, Unplug, Link as LinkIcon, Server,
  Database, ShieldCheck, ArrowRight, RefreshCw, Cpu,
} from 'lucide-react';
import { usePageContent } from '@/hooks/usePageContent';

// ── Icon maps ─────────────────────────────────────────────────────────────────
const CARD_ICON_MAP: Record<string, React.ElementType> = { LinkIcon, RefreshCw, Zap, ShieldCheck, Server, Cpu };

// ── Types ─────────────────────────────────────────────────────────────────────
interface FeatureCard { title: string; desc: string; icon: string }

function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

// ── Defaults ──────────────────────────────────────────────────────────────────
const DEFAULT_FEATURE_CARDS = JSON.stringify([
  { title: 'Custom API Wrappers',    desc: 'Developing secure, low-latency REST and GraphQL interfaces for legacy systems.',      icon: 'LinkIcon'    },
  { title: 'Real-time Data Sync',    desc: 'Bidirectional synchronization between your AI models and primary databases.',         icon: 'RefreshCw'   },
  { title: 'Event-Driven Hooks',     desc: 'Triggering AI actions automatically based on ERP or CRM state changes.',             icon: 'Zap'         },
  { title: 'Security Handshakes',    desc: 'Implementing OAuth, JWT, and custom encryption layers for AI data transit.',         icon: 'ShieldCheck' },
  { title: 'Multi-Cloud Bridge',     desc: 'Seamlessly connecting on-premise infrastructure with private AI cloud nodes.',       icon: 'Server'      },
  { title: 'Auto-Healing Pipelines', desc: 'Middleware that detects and resolves connection drops autonomously.',                 icon: 'Cpu'         },
]);

export default function AIIntegrationPage() {
  const { get } = usePageContent('services-ai-integration');

  // ── CMS values ────────────────────────────────────────────────────────────
  const accentColor      = get('hero', 'accent_color',         '#3b82f6');
  const accentColorTo    = get('hero', 'accent_color_to',      '#6366f1');
  const badgeText        = get('hero', 'badge_text',           'Enterprise Connectivity');
  const headlineLine1    = get('hero', 'headline_line1',       'SEAMLESS');
  const headlineAccent   = get('hero', 'headline_accent',      'INTEGRATION');
  const heroBody         = get('hero', 'body_text',            'Intelligence is useless in isolation. We build the high-speed bridges required to embed AI directly into your existing ERP, CRM, and operational workflows with zero downtime.');
  const btnPrimaryLabel  = get('hero', 'btn_primary_label',    'Connect Your Stack');
  const pipelineLabel    = get('hero', 'pipeline_label',       'Pipeline_Healthy');
  const erpLabel         = get('hero', 'erp_label',            'Legacy_ERP');
  const dbLabel          = get('hero', 'db_label',             'Vector_DB');

  const featureCards     = safeParse<FeatureCard[]>(get('features', 'cards_json', DEFAULT_FEATURE_CARDS), []);

  const layerHeadline    = get('layer', 'headline',            'The Integration Layer');
  const layerSub         = get('layer', 'subheading',          'Standardized architecture for the modern AI stack.');

  const ctaHeadline      = get('cta', 'headline',              "Unify Your\nIntelligence");
  const ctaBody          = get('cta', 'body_text',             'Our integration engineers at DLF Cyber City are ready to plug AI into your core operations.');
  const ctaBtnLabel      = get('cta', 'btn_label',             'START INTEGRATION');
  const ctaContact       = get('cta', 'contact_number',        '+91 870023 6923');

  return (
    <main className="flex min-h-screen flex-col bg-[#020617] text-white overflow-x-hidden">
      <Navbar />

      {/* ── HERO ────────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[120px] -z-10"
          style={{ background: `${accentColor}1a` }} />
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 backdrop-blur-md"
              style={{ background: `${accentColor}1a`, border: `1px solid ${accentColor}33` }}>
              <Unplug className="w-4 h-4" style={{ color: accentColor }} />
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: accentColor }}>{badgeText}</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-[0.9]">
              {headlineLine1} <br />
              <span className="text-transparent bg-clip-text italic"
                style={{ backgroundImage: `linear-gradient(to right, ${accentColor}, ${accentColorTo})` }}>
                {headlineAccent}
              </span>
            </h1>
            <p className="max-w-xl text-gray-400 text-lg md:text-xl leading-relaxed mb-12">{heroBody}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-10 py-5 rounded-2xl font-bold transition-all shadow-xl flex items-center justify-center gap-2 text-white"
                style={{ background: accentColor, boxShadow: `0 20px 40px ${accentColor}33` }}>
                {btnPrimaryLabel} <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Hero pipeline widget */}
          <div className="relative">
            <div className="absolute -inset-10 rounded-full blur-[100px]"
              style={{ background: `${accentColor}1a` }} />
            <div className="relative bg-[#03081a] border border-white/10 rounded-[3rem] p-12 overflow-hidden shadow-2xl">
              <div className="flex justify-between items-center mb-12">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full animate-ping" style={{ background: accentColor }} />
                  <span className="font-mono text-[10px] uppercase tracking-widest" style={{ color: accentColor }}>{pipelineLabel}</span>
                </div>
                <LinkIcon className="w-5 h-5 text-gray-600" />
              </div>
              <div className="flex flex-col items-center gap-4">
                <div className="w-full p-4 rounded-xl bg-white/5 border border-white/5 flex items-center gap-4">
                  <Server className="w-5 h-5" style={{ color: accentColor }} />
                  <div className="h-2 flex-1 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full w-[70%] animate-pulse rounded-full" style={{ background: accentColor }} />
                  </div>
                  <span className="text-[10px] font-mono">{erpLabel}</span>
                </div>
                <div className="h-8 w-px" style={{ background: `linear-gradient(to bottom, ${accentColor}80, transparent)` }} />
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-xl"
                  style={{ background: accentColor, boxShadow: `0 0 30px ${accentColor}66` }}>
                  <Cpu className="text-white w-8 h-8" />
                </div>
                <div className="h-8 w-px" style={{ background: `linear-gradient(to top, ${accentColorTo}80, transparent)` }} />
                <div className="w-full p-4 rounded-xl bg-white/5 border border-white/5 flex items-center gap-4">
                  <Database className="w-5 h-5" style={{ color: accentColorTo }} />
                  <div className="h-2 flex-1 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full w-[90%] animate-pulse rounded-full" style={{ background: accentColorTo }} />
                  </div>
                  <span className="text-[10px] font-mono">{dbLabel}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES GRID ───────────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featureCards.map((card, i) => {
              const Icon = CARD_ICON_MAP[card.icon] ?? Zap;
              return (
                <div key={i} className="p-10 rounded-[2.5rem] border border-white/5 hover:border-blue-500/30 transition-all group"
                  style={{ background: `${accentColor}08` }}>
                  <div className="mb-6 p-4 rounded-2xl inline-block transition-all"
                    style={{ background: `${accentColor}1a` }}>
                    <Icon className="w-6 h-6" style={{ color: accentColor }} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{card.title}</h3>
                  <p className="text-gray-500 leading-relaxed text-sm">{card.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── INTEGRATION LAYER ───────────────────────────────────────────────── */}
      <section className="py-24 px-6 border-y border-white/5" style={{ background: '#03081a4d' }}>
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold italic">{layerHeadline}</h2>
          <p className="text-gray-500 mt-4">{layerSub}</p>
        </div>
        <div className="mt-20">
          <ExecutionFlow />
        </div>
      </section>

      <FeatureGrid />

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
              <div className="font-mono text-sm tracking-widest" style={{ color: accentColor }}>{ctaContact}</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}