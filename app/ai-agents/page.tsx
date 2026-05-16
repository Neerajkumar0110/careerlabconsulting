'use client';

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import { usePageContent } from '@/hooks/usePageContent';
import {
  Bot, Cpu, Activity, ShieldCheck, Zap, Terminal,
  Network, Search, ArrowRight, Database, Eye,
} from 'lucide-react';

// ── Helpers ───────────────────────────────────────────────────────────────────
function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

// ── Types ─────────────────────────────────────────────────────────────────────
interface AgentCard   { title: string; desc: string; icon: string }
interface FeatureItem { icon: string; title: string; text: string }
interface AgentTag    { label: string }

// ── Icon maps ─────────────────────────────────────────────────────────────────
const ICON_MAP: Record<string, React.ElementType> = {
  Search, Zap, ShieldCheck, Database, Network, Eye, Terminal, Bot, Cpu, Activity,
};

// ── Defaults ──────────────────────────────────────────────────────────────────
const DEFAULT_AGENT_CARDS = JSON.stringify([
  { title: 'Cognitive Analyst',    desc: 'Deep-research agents that perform massive-scale data synthesis, sentiment tracking, and predictive forecasting.',                             icon: 'Search'      },
  { title: 'Execution Sentinel',   desc: 'Transaction-layer agents that handle API calls, smart contract executions, and database management without human intervention.',             icon: 'Zap'         },
  { title: 'Security Warden',      desc: 'Persistent guardians that monitor network health, detect anomalies, and auto-patch vulnerabilities in real-time.',                          icon: 'ShieldCheck' },
]);
const DEFAULT_FEATURES = JSON.stringify([
  { icon: 'Database', title: 'Long-term Memory',  text: 'Persistent vector-storage for agent recall.'          },
  { icon: 'Network',  title: 'Agent Swarms',       text: 'Multi-agent coordination for massive tasks.'          },
  { icon: 'Eye',      title: 'Observability',      text: 'Full human-in-the-loop audit trails.'                },
  { icon: 'Terminal', title: 'Tool Integration',   text: 'Native 100+ API & DB integrations.'                  },
]);
const DEFAULT_AGENT_TAGS = JSON.stringify([
  { label: 'Inventory_Bot'       },
  { label: 'Legal_Draft_Bot'     },
  { label: 'Fraud_Sentinel'      },
  { label: 'Customer_Joy_Agent'  },
  { label: 'Billing_Oracle'      },
]);

export default function AIAgentsPage() {
  const { get } = usePageContent('home-ai-agents');

  // ── Hero ──────────────────────────────────────────────────────────────────
  const accentColor      = get('hero', 'accent_color',       '#4f46e5');
  const badgeText        = get('hero', 'badge_text',         'Autonomous Agentic Layer v4.0');
  const heroPl           = get('hero', 'headline_plain',     'Digital');
  const heroAcc          = get('hero', 'headline_accent',    'Workforce');
  const heroBody         = get('hero', 'body_text',          "Deploy autonomous agents that don't just \"chat\"—they execute. From real-time supply chain healing to autonomous legal research, our agents operate with 99.9% reliability in high-stakes environments.");
  const heroBtnPrimary   = get('hero', 'btn_primary_label',  'Initialize New Agent');
  const heroBtnSecondary = get('hero', 'btn_secondary_label','View Agent Logs');

  // ── Agent Cards ───────────────────────────────────────────────────────────
  const agentCardsPl     = get('agent_cards', 'section_label', '');
  const agentCards       = safeParse<AgentCard[]>(get('agent_cards', 'cards_json', DEFAULT_AGENT_CARDS), []);

  // ── Logic Section ─────────────────────────────────────────────────────────
  const logicHeadline    = get('logic', 'headline',          'Logic Above Code.');
  const logicBody        = get('logic', 'body_text',         'Our agents utilize a Recursive Planning Engine. They decompose complex high-level goals into tactical sub-tasks, choosing their own tools and verifying their own results through multi-step reasoning.');
  const terminalLabel    = get('logic', 'terminal_label',    'AGENT_PROTOCOL_STACK.json');
  const terminalCmd      = get('logic', 'terminal_command',  'exec agent_rethink --goal "Optimize Logistics"');
  const terminalThinking = get('logic', 'terminal_thinking', 'Thinking: Analyzing current traffic latency...');
  const terminalSuccess  = get('logic', 'terminal_success',  'Success: Rerouted 400 shipments. Estimated savings: $4.2k');
  const features         = safeParse<FeatureItem[]>(get('logic', 'features_json', DEFAULT_FEATURES), []);

  // ── Swarm Section ─────────────────────────────────────────────────────────
  const swarmHeadline    = get('swarm', 'headline',          'Scale Your Intelligence');
  const swarmQuote       = get('swarm', 'quote',             '"One agent is an assistant. A swarm is a department."');
  const agentTags        = safeParse<AgentTag[]>(get('swarm', 'tags_json', DEFAULT_AGENT_TAGS), []);

  // ── CTA ───────────────────────────────────────────────────────────────────
  const ctaHeadline      = get('cta', 'headline',            'Hire Your Last Employee');
  const ctaBody          = get('cta', 'body_text',           'Our agent architects are building the workforce of 2030 today. Secure your node on the autonomous network.');
  const ctaBtnLabel      = get('cta', 'btn_label',           'Initialize Swarm');
  const ctaFooterNote    = get('cta', 'footer_note',         'Autonomous Cluster // Gurugram Node');

  return (
    <main className="min-h-screen bg-[#020617] text-slate-100 overflow-x-hidden selection:bg-indigo-500/30 font-sans">
      <Navbar />

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-16 md:pt-52 md:pb-32 px-6">
        <div className="absolute inset-0 -z-10"
          style={{ background: `radial-gradient(circle at 50% 30%, ${accentColor}26 0%, transparent 70%)` }} />
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full mb-6 backdrop-blur-xl"
            style={{ background: `${accentColor}1a`, border: `1px solid ${accentColor}33` }}>
            <Activity className="w-3.5 h-3.5 animate-pulse" style={{ color: accentColor }} />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]" style={{ color: `${accentColor}cc` }}>
              {badgeText}
            </span>
          </div>
          <h1 className="text-5xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.85] uppercase mb-10">
            {heroPl} <br />
            <span className="italic" style={{
              backgroundImage: `linear-gradient(to right, ${accentColor}99, ${accentColor}, ${accentColor}cc)`,
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>{heroAcc}</span>
          </h1>
          <p className="max-w-2xl text-slate-400 text-base md:text-xl leading-relaxed mb-12 font-light">{heroBody}</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 shadow-2xl text-white"
              style={{ background: accentColor, boxShadow: `0 25px 50px ${accentColor}4d` }}>
              {heroBtnPrimary} <Bot className="w-4 h-4" />
            </button>
            <button className="px-10 py-5 bg-white/5 border border-white/10 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-white/10 transition-all backdrop-blur-md">
              {heroBtnSecondary}
            </button>
          </div>
        </div>
      </section>

      {/* ── AGENT CARDS ───────────────────────────────────────────────────── */}
      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {agentCards.map((agent, i) => {
            const Icon = ICON_MAP[agent.icon] ?? Zap;
            return (
              <div key={i} className="group p-10 rounded-[3rem] bg-slate-900/40 border border-white/5 transition-all relative overflow-hidden"
                style={{ '--hover-border': `${accentColor}66` } as React.CSSProperties}
                onMouseEnter={e => (e.currentTarget.style.borderColor = `${accentColor}66`)}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)')}>
                <div className="mb-8 p-4 rounded-2xl inline-block transition-all"
                  style={{ background: `${accentColor}0d` }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = accentColor; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = `${accentColor}0d`; }}>
                  <Icon className="w-8 h-8" style={{ color: accentColor }} />
                </div>
                <h3 className="text-2xl font-bold mb-4">{agent.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">{agent.desc}</p>
                <div className="flex items-center gap-2 font-bold text-[10px] uppercase tracking-widest" style={{ color: accentColor }}>
                  Deploying to Node Alpha-9 <ArrowRight className="w-3 h-3" />
                </div>
                <div className="absolute top-0 right-0 w-32 h-32 -mr-16 -mt-16 rounded-full blur-3xl transition-colors"
                  style={{ background: `${accentColor}0d` }} />
              </div>
            );
          })}
        </div>
      </section>

      {/* ── LOGIC ─────────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-[#030816]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Terminal Card */}
          <div className="order-2 lg:order-1 relative">
            <div className="absolute -inset-10 rounded-full blur-[100px]" style={{ background: `${accentColor}0d` }} />
            <div className="relative bg-black/40 border border-white/10 rounded-[3rem] p-8 md:p-12 shadow-2xl overflow-hidden">
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/30" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/30" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/30" />
                </div>
                <span className="text-[10px] font-mono text-slate-500">{terminalLabel}</span>
              </div>
              <div className="mt-8 space-y-4 font-mono text-xs">
                <div className="p-4 rounded-xl border" style={{ background: `${accentColor}0d`, borderColor: `${accentColor}33`, color: `${accentColor}cc` }}>
                  <span className="mr-2" style={{ color: accentColor }}>$</span> {terminalCmd}
                </div>
                <div className="p-4 rounded-xl bg-slate-900/80 border border-white/5 text-slate-400">
                  <p className="animate-pulse">{terminalThinking}</p>
                  <p className="text-emerald-400 mt-2 font-bold">{terminalSuccess}</p>
                </div>
              </div>
            </div>
          </div>
          {/* Text */}
          <div className="order-1 lg:order-2">
            <h2 className="text-4xl md:text-7xl font-black mb-8 italic tracking-tighter uppercase leading-none text-white">
              {logicHeadline.split(' ').slice(0, -1).join(' ')} <br />
              <span style={{ color: accentColor }}
                className="underline decoration-[currentColor]/30 underline-offset-8">
                {logicHeadline.split(' ').slice(-1)[0]}
              </span>
            </h2>
            <p className="text-slate-400 text-lg mb-8 leading-relaxed font-light">{logicBody}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((feat, idx) => {
                const Icon = ICON_MAP[feat.icon] ?? Zap;
                return (
                  <div key={idx} className="flex flex-col gap-3 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all">
                    <Icon style={{ color: accentColor, width: 20, height: 20 }} />
                    <h4 className="text-[10px] font-black uppercase tracking-widest" style={{ color: `${accentColor}cc` }}>{feat.title}</h4>
                    <p className="text-slate-500 text-[11px] leading-relaxed">{feat.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── SWARM ─────────────────────────────────────────────────────────── */}
      <section className="py-24 border-y border-white/5" style={{ background: `${accentColor}03` }}>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Cpu className="w-12 h-12 text-slate-500/50 mx-auto mb-8 animate-spin-slow" />
          <h2 className="text-3xl font-black uppercase tracking-[0.3em] text-white mb-6">{swarmHeadline}</h2>
          <p className="text-slate-500 text-sm mb-12 italic">{swarmQuote}</p>
          <div className="flex flex-wrap justify-center gap-3">
            {agentTags.map((tag, i) => (
              <div key={i} className="px-4 py-2 rounded-full font-mono font-bold text-[10px] transition-colors cursor-default hover:text-white"
                style={{ border: `1px solid ${accentColor}33`, background: `${accentColor}0d`, color: accentColor }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = accentColor; (e.currentTarget as HTMLElement).style.color = '#fff'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = `${accentColor}0d`; (e.currentTarget as HTMLElement).style.color = accentColor; }}>
                {tag.label} :: ACTIVE
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto border rounded-[4rem] p-12 md:p-24 text-center backdrop-blur-3xl relative overflow-hidden"
          style={{ background: `linear-gradient(to bottom right, ${accentColor}1a, #000)`, borderColor: `${accentColor}4d`, boxShadow: `0 0 80px ${accentColor}1a` }}>
          <div className="relative z-10">
            <h2 className="text-5xl md:text-8xl font-black mb-8 italic tracking-tighter uppercase leading-tight">{ctaHeadline}</h2>
            <p className="text-lg md:text-xl mb-12 max-w-2xl mx-auto" style={{ color: `${accentColor}b3` }}>{ctaBody}</p>
            <div className="flex flex-col items-center gap-6">
              <button className="bg-white px-16 py-6 rounded-2xl font-black text-2xl hover:scale-105 transition-all shadow-2xl uppercase italic"
                style={{ color: accentColor }}>
                {ctaBtnLabel}
              </button>
              <div className="font-mono text-[10px] tracking-[0.4em] uppercase" style={{ color: `${accentColor}80` }}>
                {ctaFooterNote}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}