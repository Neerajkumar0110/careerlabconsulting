// app/industry/ai-devops/page.tsx
'use client';

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import ExecutionFlow from '@/components/sections/ExecutionFlow';
import FeatureGrid from '@/components/sections/FeatureGrid';
import { Infinity, Terminal, Cpu, Settings, Activity, GitMerge, ArrowRight, Container } from 'lucide-react';
import { usePageContent } from '@/hooks/usePageContent';

// ── Types ─────────────────────────────────────────────────────────────────────
interface FeatureCard    { title: string; desc: string; icon: string }
interface PipelineStep   { label: string; status: string; progress: number; color: string }
interface TechCard       { label: string; icon: string }

function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

const ICON_MAP: Record<string, React.ElementType> = { GitMerge, Cpu, Settings, Activity, Container, Infinity, Terminal };

const STEP_COLORS: Record<string, string> = {
  emerald: 'bg-emerald-500/20 text-emerald-500',
  blue:    'bg-blue-500/20 text-blue-500',
  muted:   'bg-white/5 text-gray-500',
};
const STEP_BAR_COLORS: Record<string, string> = {
  emerald: 'bg-emerald-500',
  blue:    'bg-blue-500 animate-pulse',
  muted:   '',
};
const STEP_STATUS_COLORS: Record<string, string> = {
  emerald: 'text-emerald-400',
  blue:    'text-blue-400',
  muted:   'text-gray-600',
};

const DEFAULT_FEATURE_CARDS = JSON.stringify([
  { title: 'MLOps Lifecycle',    desc: 'Automated model versioning, deployment, and A/B testing frameworks for seamless AI transitions.', icon: 'GitMerge' },
  { title: 'GPU Cluster Mgmt',   desc: 'Optimizing Kubernetes orchestrations for high-concurrency GPU workloads and inference servers.', icon: 'Cpu'      },
  { title: 'Self-Healing Infra', desc: 'AI-driven monitoring that detects anomalies and automatically triggers recovery protocols.',      icon: 'Settings' },
]);
const DEFAULT_PIPELINE_STEPS = JSON.stringify([
  { label: 'Build Sequence',     status: 'SUCCESS',     progress: 100, color: 'emerald' },
  { label: 'Model Quantization', status: 'IN_PROGRESS', progress: 65,  color: 'blue'    },
  { label: 'Edge Deployment',    status: 'PENDING',     progress: 0,   color: 'muted'   },
]);
const DEFAULT_TECH_CARDS = JSON.stringify([
  { label: 'Docker/K8s',    icon: 'Container' },
  { label: 'Real-time Obs', icon: 'Activity'  },
]);

export default function AIDevOpsPage() {
  const { get } = usePageContent('industry-ai-devops');

  const badgeText    = get('hero', 'badge_text',      'Autonomous Infrastructure & MLOps');
  const heroPl       = get('hero', 'headline_plain',  'INTELLIGENT');
  const heroAcc      = get('hero', 'headline_accent', 'Operations');
  const heroBody     = get('hero', 'body_text',       'Move from manual deployments to autonomous cycles.');
  const ctaLabel     = get('hero', 'cta_label',       'Deploy Your Pipeline');
  const accentColor  = get('hero', 'accent_color',    '#10b981');
  const accentColor2 = get('hero', 'accent_color_2',  '#22d3ee');

  const featureCards   = safeParse<FeatureCard[]>(get('features', 'items_json', DEFAULT_FEATURE_CARDS), []);

  const pipePl         = get('pipeline', 'headline_plain',  'Scale Without');
  const pipeAcc        = get('pipeline', 'headline_accent', 'the Friction');
  const pipeBody       = get('pipeline', 'body_text',       'We specialize in Infrastructure as Code (IaC) and containerization specifically for AI workloads.');
  const panelLabel     = get('pipeline', 'panel_label',     'DEVOPS_AGENT_STATUS: ACTIVE');
  const pipelineSteps  = safeParse<PipelineStep[]>(get('pipeline', 'pipeline_json', DEFAULT_PIPELINE_STEPS), []);
  const techCards      = safeParse<TechCard[]>(get('pipeline', 'tech_cards_json', DEFAULT_TECH_CARDS), []);

  const ctaHeadline  = get('cta', 'headline',  'Automate Everything');
  const ctaBody      = get('cta', 'body_text', 'Our DevOps engineers at DLF Cyber City are ready to optimize your cloud infrastructure for the AI era.');
  const ctaBtnLabel  = get('cta', 'btn_label', 'START AUTOMATION');
  const ctaLocation  = get('cta', 'location',  'Safety Location: Gurugram, India');

  return (
    <main className="flex min-h-screen flex-col bg-[#020617] text-white overflow-x-hidden">
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full blur-[120px] -z-10"
          style={{ background: `${accentColor}0d` }} />
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-8 backdrop-blur-md"
            style={{ background: `${accentColor}1a`, borderColor: `${accentColor}33` }}>
            <Infinity className="w-4 h-4" style={{ color: accentColor }} />
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: accentColor }}>{badgeText}</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-tight">
            {heroPl}<br />
            <span className="text-transparent bg-clip-text italic uppercase"
              style={{ backgroundImage: `linear-gradient(to right, ${accentColor}, ${accentColor2}, #3b82f6)` }}>
              {heroAcc}
            </span>
          </h1>
          <p className="max-w-3xl mx-auto text-gray-400 text-lg md:text-xl leading-relaxed mb-12">{heroBody}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-10 py-5 rounded-2xl font-bold transition-all shadow-xl flex items-center justify-center gap-2 text-white"
              style={{ background: accentColor, boxShadow: `0 20px 40px ${accentColor}33` }}>
              {ctaLabel} <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {featureCards.map((item, i) => {
            const Icon = ICON_MAP[item.icon] ?? Settings;
            return (
              <div key={i} className="group p-10 rounded-[2.5rem] border border-white/5 transition-all"
                style={{ background: `${accentColor}08` }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = `${accentColor}4d`)}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)')}>
                <div className="mb-6 p-4 rounded-2xl inline-block" style={{ background: `${accentColor}1a` }}>
                  <Icon className="w-8 h-8" style={{ color: accentColor }} />
                </div>
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-gray-500 leading-relaxed text-sm">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── PIPELINE SECTION ─────────────────────────────────────────────── */}
      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <div className="absolute -inset-10 rounded-full blur-[100px] pointer-events-none" style={{ background: `${accentColor}0d` }} />
            <div className="relative bg-[#050101] border border-white/5 rounded-[3rem] p-10 shadow-2xl overflow-hidden font-mono">
              <div className="flex items-center gap-2 mb-8 border-b border-white/10 pb-4" style={{ color: accentColor }}>
                <Terminal className="w-4 h-4" />
                <span className="text-[10px] uppercase tracking-widest" style={{ color: `${accentColor}b3` }}>{panelLabel}</span>
              </div>
              <div className="space-y-6">
                {pipelineSteps.map((step, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className={`w-8 h-8 rounded flex items-center justify-center text-xs ${STEP_COLORS[step.color] ?? 'bg-white/5 text-gray-500'}`}>
                      {String(i + 1).padStart(2, '0')}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between text-[10px] mb-1">
                        <span className={step.color === 'muted' ? 'text-gray-600' : ''}>{step.label}</span>
                        <span className={STEP_STATUS_COLORS[step.color] ?? 'text-gray-600'}>{step.status}</span>
                      </div>
                      <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                        {step.progress > 0 && (
                          <div className={`h-full rounded-full ${STEP_BAR_COLORS[step.color]}`} style={{ width: `${step.progress}%` }} />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-4xl md:text-6xl font-black mb-8 italic tracking-tighter uppercase">
              {pipePl}<br />{pipeAcc}
            </h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">{pipeBody}</p>
            <div className="grid grid-cols-2 gap-4">
              {techCards.map((tc, i) => {
                const Icon = ICON_MAP[tc.icon] ?? Activity;
                return (
                  <div key={i} className="p-5 rounded-2xl bg-white/5 border border-white/5 flex flex-col gap-2">
                    <Icon style={{ color: accentColor }} />
                    <span className="font-bold text-sm">{tc.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <div className="py-12 border-y border-white/5"><ExecutionFlow /></div>
      <FeatureGrid />

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto border rounded-[4rem] p-12 md:p-24 text-center backdrop-blur-3xl relative overflow-hidden"
          style={{ background: `linear-gradient(to bottom right, ${accentColor}66, #000)`, borderColor: `${accentColor}33` }}>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-7xl font-black mb-8 italic tracking-tighter uppercase leading-tight">{ctaHeadline}</h2>
            <p className="text-lg md:text-xl mb-12 max-w-2xl mx-auto" style={{ color: 'rgba(209,250,229,0.7)' }}>{ctaBody}</p>
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