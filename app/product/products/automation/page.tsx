'use client';

import React, { useEffect, useRef, useState } from 'react';
import Navbar from '@/components/product/Navbar';
import Footer from '@/components/product/Footer';
import ExecutionFlow from '@/components/product/ExecutionFlow';
import FeatureGrid from '@/components/product/FeatureGrid';
import CTAModal from '@/components/product/CTAModel';
import { Cpu, Network, Settings, Workflow, Zap } from 'lucide-react';
import { usePageContent } from '@/hooks/usePageContent';

// ── Inline icons ──────────────────────────────────────────────────────────────
const BotIcon = ({ size = 12, style = {} }: { size?: number; style?: React.CSSProperties }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <rect x="3" y="11" width="18" height="10" rx="2" /><circle cx="12" cy="5" r="2" /><path d="M12 7v4" /><line x1="8" y1="16" x2="8" y2="16" /><line x1="16" y1="16" x2="16" y2="16" />
  </svg>
);
const ZapIconSvg = ({ size = 14, style = {}, color = 'currentColor' }: { size?: number; style?: React.CSSProperties; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);
const CodeIconSvg = ({ size = 14, style = {}, color = 'currentColor' }: { size?: number; style?: React.CSSProperties; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
  </svg>
);
const LayersIconSvg = ({ size = 14, style = {}, color = 'currentColor' }: { size?: number; style?: React.CSSProperties; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" />
  </svg>
);
const GlobeIconSvg = ({ size = 14, style = {}, color = 'currentColor' }: { size?: number; style?: React.CSSProperties; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);
const CheckIconSvg = ({ size = 10, style = {} }: { size?: number; style?: React.CSSProperties }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
const ArrowRightIconSvg = ({ size = 13, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

// ── Fade-in hook ──────────────────────────────────────────────────────────────
function useFadeIn() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible] as const;
}

function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

// ── Defaults ──────────────────────────────────────────────────────────────────
const DEFAULT_CHIPS_JSON = JSON.stringify(['Zero-latency execution', '100% precision', 'Self-healing agents']);

const DEFAULT_PIPELINE_STEPS_JSON = JSON.stringify([
  { label: 'Trigger',  desc: 'Event fired',   icon: 'Zap'    },
  { label: 'Process',  desc: 'Logic runs',    icon: 'Code'   },
  { label: 'Branch',   desc: 'Conditional',   icon: 'Layers' },
  { label: 'Deploy',   desc: 'Live action',   icon: 'Globe'  },
]);

const DEFAULT_PIPELINE_STATS_JSON = JSON.stringify([
  { value: '2.4M', label: 'Tasks/day' },
  { value: '0ms',  label: 'Latency'  },
  { value: '100%', label: 'Uptime'   },
]);

const DEFAULT_FEATURES_JSON = JSON.stringify([
  { title: 'Agent Orchestration', desc: 'Deploy multiple AI agents that collaborate in real-time to solve complex enterprise problems.',                        icon: 'Cpu'      },
  { title: 'Adaptive Pipelines',  desc: 'Self-healing workflows that automatically reroute tasks based on real-time system performance.',                    icon: 'Network'  },
  { title: 'Universal Connectors', desc: 'Native integration with your existing CRM, ERP, and legacy stacks via secure AI gateways.',                       icon: 'Settings' },
]);

const DEFAULT_STATS_JSON = JSON.stringify([
  { value: '4.2B+', label: 'Workflow Executions'     },
  { value: '99.999%', label: 'System Reliability'    },
  { value: '1ms',   label: 'Processing Latency'      },
  { value: '120+',  label: 'Enterprise Integrations' },
]);

const ICON_COMPONENT_MAP: Record<string, React.ElementType> = { Cpu, Network, Settings, Workflow };

const PIPELINE_ICON_MAP: Record<string, React.ElementType> = {
  Zap:    ({ size = 14, color = 'currentColor' }: { size?: number; color?: string }) =>
    <ZapIconSvg size={size} color={color} />,
  Code:   ({ size = 14, color = 'currentColor' }: { size?: number; color?: string }) =>
    <CodeIconSvg size={size} color={color} />,
  Layers: ({ size = 14, color = 'currentColor' }: { size?: number; color?: string }) =>
    <LayersIconSvg size={size} color={color} />,
  Globe:  ({ size = 14, color = 'currentColor' }: { size?: number; color?: string }) =>
    <GlobeIconSvg size={size} color={color} />,
};

const AutomationPlatformPage = () => {
  const [ref, visible] = useFadeIn();
  const [active, setActive] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  const { get } = usePageContent('automation-platform');

  // ── CMS values ────────────────────────────────────────────────────────────
  const accentFrom        = get('hero', 'accent_from',        '#3b82f6');
  const accentTo          = get('hero', 'accent_to',          '#6366f1');
  const badgeText         = get('hero', 'badge_text',         'Workflow Orchestration');
  const headline1         = get('hero', 'headline_1',         'AUTOMATION');
  const headline2         = get('hero', 'headline_2',         'PLATFORM');
  const heroBody          = get('hero', 'body_text',          'Eliminate repetitive tasks and architectural friction. Deploy autonomous agents that handle complex cross-functional workflows with zero-latency and 100% precision.');
  const heroBtn1Label     = get('hero', 'btn_1_label',        'Build Your Workflow');
  const heroBtn2Label     = get('hero', 'btn_2_label',        'WhatsApp Demo');
  const whatsappNumber    = get('hero', 'whatsapp_number',    '919810984968');
  const whatsappMsg       = get('hero', 'whatsapp_message',   "Hello! I'm interested in Automation and would like to see a demo.");
  const heroImageUrl      = get('hero', 'hero_image_url',     'https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1');

  const chipsRaw          = get('hero', 'chips_json',         DEFAULT_CHIPS_JSON);
  const chips             = safeParse<string[]>(chipsRaw, ['Zero-latency execution', '100% precision', 'Self-healing agents']);

  const pipelineTitle     = get('pipeline', 'title',          'workflow://production/pipeline-v3');
  const pipelineLiveLabel = get('pipeline', 'live_label',     'LIVE');
  const pipelineStepsRaw  = get('pipeline', 'steps_json',     DEFAULT_PIPELINE_STEPS_JSON);
  const pipelineSteps     = safeParse<{ label: string; desc: string; icon: string }[]>(pipelineStepsRaw, []);
  const pipelineStatsRaw  = get('pipeline', 'stats_json',     DEFAULT_PIPELINE_STATS_JSON);
  const pipelineStats     = safeParse<{ value: string; label: string }[]>(pipelineStatsRaw, []);
  const floatingBadge     = get('pipeline', 'floating_badge', '↑ 98% Resolution');

  const featuresHeadline  = get('features', 'headline',       'Core Automation');
  const featuresAccent    = get('features', 'accent_word',    'Modules');
  const featuresRaw       = get('features', 'items_json',     DEFAULT_FEATURES_JSON);
  const featureItems      = safeParse<{ title: string; desc: string; icon: string }[]>(featuresRaw, []);

  const statsRaw          = get('stats', 'items_json',        DEFAULT_STATS_JSON);
  const statsItems        = safeParse<{ value: string; label: string }[]>(statsRaw, []);
  const statsHeadline     = get('stats', 'headline',          'Proven Automation Performance');
  const statsSubhead      = get('stats', 'subheading',        'Built to scale mission-critical enterprise workflows.');

  const ctaHeadline       = get('cta', 'headline',            'AUTO-PILOT YOUR SCALE');
  const ctaBody           = get('cta', 'body_text',           'Our engineering team in Gurugram is ready to architect your autonomous future. Schedule your technical deep-dive today.');
  const ctaBtnLabel       = get('cta', 'btn_label',           'START AUTOMATING');
  const ctaPhone          = get('cta', 'phone',               '+91 870023 6923');

  // Pipeline step cycling
  useEffect(() => {
    if (pipelineSteps.length === 0) return;
    const t = setInterval(() => setActive(p => (p + 1) % pipelineSteps.length), 1800);
    return () => clearInterval(t);
  }, [pipelineSteps.length]);

  // Step accent colors — derived from accentFrom/accentTo gradient stops
  const stepColors = [accentFrom, accentTo, '#8b5cf6', '#06b6d4'];

  return (
    <main className="flex min-h-screen flex-col bg-[#020617] text-white overflow-x-hidden">
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section
        ref={ref as React.RefObject<HTMLElement>}
        className="relative min-h-screen flex items-center overflow-hidden bg-[#040810] px-5 sm:px-8 lg:px-14 py-20 pt-28"
      >
        {/* Background */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: `linear-gradient(${accentFrom}0a 1px, transparent 1px), linear-gradient(90deg, ${accentFrom}0a 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }} />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: `radial-gradient(circle, ${accentFrom} 0%, transparent 70%)`, filter: 'blur(80px)', opacity: 0.15 }} />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full pointer-events-none"
          style={{ background: `radial-gradient(circle, ${accentTo} 0%, transparent 70%)`, filter: 'blur(60px)', opacity: 0.1 }} />

        <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* LEFT */}
          <div style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(32px)', transition: 'all 0.7s ease' }}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border mb-6"
              style={{ borderColor: `${accentFrom}50`, background: `${accentFrom}1a` }}>
              <BotIcon size={12} style={{ color: accentFrom }} />
              <span className="text-[9px] font-black uppercase tracking-[0.3em]" style={{ color: accentFrom }}>{badgeText}</span>
            </div>

            <h1 className="font-black text-white leading-none mb-4" style={{ fontSize: 'clamp(3rem, 8vw, 4.5rem)', letterSpacing: '-0.04em' }}>
              <span style={{ WebkitTextStroke: `2px ${accentFrom}99`, color: 'transparent' }}>{headline1}</span>
              <br />
              <span style={{ color: accentFrom }}>{headline2}</span>
            </h1>

            <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-md mb-8">{heroBody}</p>

            <div className="flex flex-wrap gap-3 mb-8">
              {chips.map(f => (
                <div key={f} className="flex items-center gap-2 text-slate-300 text-xs font-semibold">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center"
                    style={{ background: `${accentFrom}33`, border: `1px solid ${accentFrom}66` }}>
                    <CheckIconSvg size={10} style={{ color: accentFrom }} />
                  </div>
                  {f}
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                className="w-full group flex items-center justify-center gap-2 px-7 py-4 text-white rounded-xl font-black text-[10px] tracking-[0.2em] uppercase transition-all"
                style={{ background: accentFrom, boxShadow: `0 20px 40px ${accentFrom}40` }}
                onClick={() => setModalOpen(true)}
              >
                {heroBtn1Label}
                <ArrowRightIconSvg size={13} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <a
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMsg)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group w-full flex items-center justify-center gap-3 px-8 py-4 bg-white/5 hover:bg-green-600 text-white rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] transition-all border border-white/10 hover:border-[#25D366]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
                </svg>
                {heroBtn2Label}
              </a>
            </div>
          </div>

          {/* RIGHT — Pipeline widget */}
          <div style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateX(40px)', transition: 'all 0.8s ease 0.2s', position: 'relative' }}>
            <div className="relative bg-[#070f1e] border border-white/[0.08] rounded-3xl p-6 md:p-8 overflow-hidden"
              style={{ boxShadow: `0 0 60px ${accentFrom}1a` }}>
              {/* Window chrome */}
              <div className="flex items-center gap-2 mb-6">
                <div className="flex gap-1.5">
                  {['#ff5f57', '#ffbd2e', '#28c840'].map(c => (
                    <div key={c} className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />
                  ))}
                </div>
                <div className="flex-1 mx-3 h-6 rounded-md bg-white/5 flex items-center px-3">
                  <span className="text-[9px] text-slate-600 font-mono">{pipelineTitle}</span>
                </div>
                <div className="px-2 py-1 rounded text-[8px] font-bold"
                  style={{ color: '#4ade80', background: '#16a34a1a', border: '1px solid #16a34a33' }}>
                  {pipelineLiveLabel}
                </div>
              </div>

              {/* Pipeline steps */}
              <div className="space-y-3 mb-6">
                {pipelineSteps.map((step, i) => {
                  const PipeIcon = PIPELINE_ICON_MAP[step.icon];
                  const isActive = i === active;
                  const isDone = i < active;
                  const color = stepColors[i % stepColors.length];
                  return (
                    <div key={step.label}
                      className="flex items-center gap-3 p-3 rounded-xl transition-all duration-500"
                      style={{
                        background: isActive ? `${color}12` : 'transparent',
                        border: `1px solid ${isActive ? color + '40' : 'rgba(255,255,255,0.04)'}`,
                      }}
                    >
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-500 shrink-0"
                        style={{
                          background: isActive || isDone ? `${color}25` : 'rgba(255,255,255,0.04)',
                          border: `1px solid ${isActive || isDone ? color + '50' : 'rgba(255,255,255,0.06)'}`,
                        }}>
                        {PipeIcon && <PipeIcon size={14} color={isActive || isDone ? color : '#4b5563'} />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-black uppercase tracking-wider"
                          style={{ color: isActive ? '#fff' : isDone ? '#6b7280' : '#374151' }}>
                          {step.label}
                        </p>
                        <p className="text-[9px] text-slate-600">{step.desc}</p>
                      </div>
                      <div className="shrink-0">
                        {isDone && (
                          <div className="w-5 h-5 rounded-full flex items-center justify-center"
                            style={{ background: `${color}25`, border: `1px solid ${color}50` }}>
                            <CheckIconSvg size={8} style={{ color }} />
                          </div>
                        )}
                        {isActive && <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: color }} />}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-2 pt-4 border-t border-white/5">
                {pipelineStats.map(({ value, label }) => (
                  <div key={label} className="text-center">
                    <p className="text-white font-black text-lg">{value}</p>
                    <p className="text-slate-600 text-[8px] uppercase tracking-widest">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -top-4 -right-4 rounded-2xl px-4 py-2 backdrop-blur-sm hidden sm:block"
              style={{ background: '#16a34a1a', border: '1px solid #16a34a50' }}>
              <p className="text-green-400 text-[9px] font-black uppercase tracking-widest">{floatingBadge}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── IMAGE SECTION ────────────────────────────────────────────────── */}
      <section className="px-6 py-12 relative">
        <div className="max-w-6xl mx-auto">
          <div className="relative rounded-[3rem] overflow-hidden border border-white/10 bg-[#03081a] group">
            <img
              src={heroImageUrl}
              alt="Automation Logic"
              className="w-full h-auto opacity-50 group-hover:scale-105 transition-transform duration-1000"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="hidden md:flex items-center gap-3 backdrop-blur-xl border p-4 rounded-2xl animate-pulse"
                    style={{ background: `${accentFrom}26`, borderColor: `${accentFrom}50` }}>
                    <Workflow className="w-5 h-5" style={{ color: accentFrom }} />
                    <span className="text-xs font-mono">NODE_EXECUTION_{i}: SUCCESS</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent" />
          </div>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-black mb-4">
            {featuresHeadline}{' '}
            <span style={{ color: accentFrom }}>{featuresAccent}</span>
          </h2>
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {featureItems.map((item, i) => {
            const Icon = ICON_COMPONENT_MAP[item.icon] ?? Cpu;
            return (
              <div key={i}
                className="group p-10 rounded-[2.5rem] bg-blue-900/5 border border-white/5 transition-all"
                onMouseEnter={e => (e.currentTarget.style.borderColor = `${accentFrom}50`)}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)')}>
                <div className="mb-6 p-4 rounded-2xl inline-block transition-all"
                  style={{ background: `${accentFrom}1a` }}
                  onMouseEnter={e => (e.currentTarget.style.background = accentFrom)}
                  onMouseLeave={e => (e.currentTarget.style.background = `${accentFrom}1a`)}>
                  <Icon className="w-8 h-8" style={{ color: accentFrom }} />
                </div>
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      <div className="py-12 border-y border-white/5">
        <ExecutionFlow />
      </div>

      {/* ── STATS ────────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-black mb-4">{statsHeadline}</h2>
          <p className="text-gray-400">{statsSubhead}</p>
        </div>
        <div className="grid md:grid-cols-4 gap-8 text-center max-w-6xl mx-auto">
          {statsItems.map(({ value, label }) => (
            <div key={label} className="p-8 rounded-3xl border border-white/5"
              style={{ background: `${accentFrom}0d` }}>
              <p className="text-4xl font-black mb-2" style={{ color: accentFrom }}>{value}</p>
              <p className="text-gray-500 text-sm">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <FeatureGrid />

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto rounded-[4rem] p-12 md:p-24 text-center backdrop-blur-3xl relative overflow-hidden group"
          style={{ background: `linear-gradient(to bottom right, ${accentFrom}26, ${accentTo}1a)`, border: `1px solid ${accentFrom}33` }}>
          <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full blur-3xl group-hover:scale-150 transition-all duration-1000"
            style={{ background: `${accentFrom}1a` }} />
          <div className="relative z-10">
            <h2 className="text-4xl md:text-7xl font-black mb-8 tracking-tighter italic">{ctaHeadline}</h2>
            <p className="text-blue-100/70 text-lg md:text-xl mb-12 max-w-2xl mx-auto">{ctaBody}</p>
            <div className="flex flex-col items-center gap-6">
              <button
                className="px-16 py-6 rounded-full font-black text-2xl hover:scale-110 transition-all shadow-2xl"
                style={{ background: '#fff', color: '#0f172a' }}
                onClick={() => setModalOpen(true)}
              >
                {ctaBtnLabel}
              </button>
              <div className="flex items-center gap-3 font-mono" style={{ color: accentFrom }}>
                <Zap className="w-4 h-4" style={{ color: '#facc15' }} />
                <span>{ctaPhone}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTAModal isOpen={modalOpen} onClose={() => setModalOpen(false)} productName="Automation Platform" productTagline="Workflow Orchestration" accentColor={accentFrom} />
      <Footer />
    </main>
  );
};

export default AutomationPlatformPage;