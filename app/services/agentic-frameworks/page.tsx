// app/services/agentic/page.tsx
'use client';

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import ExecutionFlow from '@/components/sections/ExecutionFlow';
import FeatureGrid from '@/components/sections/FeatureGrid';
import {
  Bot, Workflow, Cpu, Share2, Zap,
  ShieldAlert, Settings, ArrowRight, GitMerge,
} from 'lucide-react';
import { usePageContent } from '@/hooks/usePageContent';

// ── Icon maps ─────────────────────────────────────────────────────────────────
const AGENT_ICON_MAP: Record<string, React.ElementType> = { Share2, Cpu, Zap };
const SWARM_ICON_MAP: Record<string, React.ElementType> = { GitMerge, Settings, ShieldAlert, Bot, Workflow, Zap };

// ── Types ─────────────────────────────────────────────────────────────────────
interface AgentCard { name: string; task: string; icon: string }
interface SwarmCard  { title: string; desc: string; icon: string }

function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

// ── Defaults ──────────────────────────────────────────────────────────────────
const DEFAULT_AGENT_CARDS = JSON.stringify([
  { name: 'Researcher_Agent', task: 'Web Search & Data Synthesis', icon: 'Share2' },
  { name: 'Analyst_Agent',    task: 'Numerical Validation & Logic', icon: 'Cpu'   },
  { name: 'Executor_Agent',   task: 'API Call & Implementation',    icon: 'Zap'   },
]);
const DEFAULT_SWARM_CARDS = JSON.stringify([
  { title: 'Task Decomposition',         desc: "Agents that can break down a complex 'Goal' into actionable sub-tasks autonomously.",                    icon: 'GitMerge'   },
  { title: 'Tool Use (Function Calling)', desc: 'AI entities capable of interacting with your existing software stack, databases, and APIs.',            icon: 'Settings'   },
  { title: 'Self-Correction',            desc: "Autonomous feedback loops where 'Reviewer' agents validate and correct the work of 'Worker' agents.",    icon: 'ShieldAlert'},
  { title: 'Memory Systems',             desc: 'Implementing long-term vector memory so agents remember past context and preferences.',                   icon: 'Bot'        },
  { title: 'Swarm Orchestration',        desc: 'Managing hundreds of specialized agents working toward a single unified objective.',                      icon: 'Workflow'   },
  { title: 'Zero-Latency Routing',       desc: 'Dynamic intent routing to the most qualified agent for a specific query or action.',                      icon: 'Zap'        },
]);

export default function AgenticFrameworksPage() {
  const { get } = usePageContent('services-agentic');

  // ── CMS values ────────────────────────────────────────────────────────────
  const accentColor      = get('hero', 'accent_color',         '#3b82f6');
  const accentColorTo    = get('hero', 'accent_color_to',      '#6366f1');
  const badgeText        = get('hero', 'badge_text',           'Autonomous Orchestration');
  const headlineLine1    = get('hero', 'headline_line1',       'AGENTIC');
  const headlineAccent   = get('hero', 'headline_accent',      'FRAMEWORKS');
  const heroBody         = get('hero', 'body_text',            "Move beyond static prompts. We build multi-agent ecosystems where autonomous AI entities collaborate to solve complex, multi-step business workflows without human oversight.");
  const btnPrimaryLabel  = get('hero', 'btn_primary_label',    'Deploy Agent Swarm');
  const systemLabel      = get('hero', 'system_label',         'SYSTEM_SWARM_ACTIVE');
  const agentCards       = safeParse<AgentCard[]>(get('hero', 'agents_json', DEFAULT_AGENT_CARDS), []);

  const swarmHeadline    = get('swarm', 'headline',            'Swarm Intelligence');
  const swarmSub         = get('swarm', 'subheading',          'Orchestrating autonomous logic at enterprise scale.');
  const swarmCards       = safeParse<SwarmCard[]>(get('swarm', 'cards_json', DEFAULT_SWARM_CARDS), []);

  const protocolHeadline = get('protocol', 'headline',         'Agent Interaction Protocol');

  const ctaHeadline      = get('cta', 'headline',              "Automate the\nUn-Automatable");
  const ctaBody          = get('cta', 'body_text',             'Our swarm architects at DLF Cyber City are ready to design your autonomous agent workforce.');
  const ctaBtnLabel      = get('cta', 'btn_label',             'START DEPLOYMENT');
  const ctaContact       = get('cta', 'contact_number',        '+91 870023 6923');

  return (
    <main className="flex min-h-screen flex-col bg-[#020617] text-white overflow-x-hidden">
      <Navbar />

      {/* ── HERO ────────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        <div className="absolute top-0 left-0 w-full h-full -z-10 opacity-20"
          style={{ background: `radial-gradient(circle at 20% 30%, ${accentColorTo} 0%, transparent 50%)` }} />
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 backdrop-blur-md"
              style={{ background: `${accentColor}1a`, border: `1px solid ${accentColor}33` }}>
              <Workflow className="w-4 h-4" style={{ color: accentColor }} />
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

          {/* Hero agent swarm widget */}
          <div className="relative">
            <div className="absolute -inset-10 rounded-full blur-[120px]"
              style={{ background: `${accentColor}1a` }} />
            <div className="relative border border-white/10 rounded-[3rem] p-10 backdrop-blur-xl overflow-hidden"
              style={{ background: '#03081acc' }}>
              <div className="flex justify-between items-center mb-12">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-mono text-[10px] text-gray-500">{systemLabel}</span>
                </div>
                <Settings className="w-4 h-4 text-gray-600" />
              </div>
              <div className="space-y-8">
                {agentCards.map((agent, i) => {
                  const Icon = AGENT_ICON_MAP[agent.icon] ?? Zap;
                  return (
                    <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 relative z-10">
                      <div className="p-3 rounded-xl" style={{ background: `${accentColor}33`, color: accentColor }}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold">{agent.name}</h4>
                        <p className="text-[10px] text-gray-500">{agent.task}</p>
                      </div>
                      <div className="ml-auto flex gap-1">
                        <div className="w-1 h-4 rounded-full" style={{ background: `${accentColor}66` }} />
                        <div className="w-1 h-4 rounded-full" style={{ background: `${accentColor}33` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SWARM INTELLIGENCE ──────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold italic">{swarmHeadline}</h2>
            <p className="text-gray-500 mt-4 text-lg">{swarmSub}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {swarmCards.map((card, i) => {
              const Icon = SWARM_ICON_MAP[card.icon] ?? Zap;
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

      {/* ── PROTOCOL ────────────────────────────────────────────────────────── */}
      <div className="py-20 border-y border-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold italic">{protocolHeadline}</h2>
        </div>
        <div className="mt-20">
          <ExecutionFlow />
        </div>
      </div>

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