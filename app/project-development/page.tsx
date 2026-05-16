'use client';

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import {
  GitBranch, Layers, Code2, Terminal, Cpu,
  Zap, ArrowRight, Boxes, TestTube2,
} from 'lucide-react';
import { usePageContent } from '@/hooks/usePageContent';

function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

interface PhaseItem  { phase: string; title: string; desc: string }
interface FeatureFeat { icon: string; title: string; text: string }
interface TechItem   { name: string }

const ICON_MAP: Record<string, React.ElementType> = { Code2, Layers, TestTube2, Zap, GitBranch, Terminal, Boxes, Cpu };

const DEFAULT_PHASES = JSON.stringify([
  { phase: '01', title: 'Discovery',   desc: 'Feasibility audits & neural architecture design.'           },
  { phase: '02', title: 'Rapid PoC',   desc: 'MVP development with core AI logic integration.'            },
  { phase: '03', title: 'Hardening',   desc: 'Security audits, latency tuning, and UX polish.'            },
  { phase: '04', title: 'Deployment',  desc: 'Auto-scaling CI/CD pipelines & model monitoring.'           },
]);
const DEFAULT_FEATURES = JSON.stringify([
  { icon: 'Code2',     title: 'Type-Safe AI Integration', text: 'Enterprise-grade TypeScript & Rust implementations for model stability.'                  },
  { icon: 'Layers',    title: 'RAG & Vector Stacks',       text: 'High-speed retrieval architectures using Pinecone, Milvus, or pgvector.'                  },
  { icon: 'TestTube2', title: 'Automated Evaluation',      text: 'Strict testing for hallucinations, latency, and token efficiency.'                        },
]);
const DEFAULT_TECH_STACK = JSON.stringify([
  { name: 'Next.js' }, { name: 'Python' }, { name: 'PyTorch' },
  { name: 'Rust' }, { name: 'Kubernetes' }, { name: 'AWS' },
  { name: 'Supabase' }, { name: 'LangChain' }, { name: 'OpenAI' },
]);

export default function ProjectDevelopmentPage() {
  const { get } = usePageContent('home-project-development');

  const accentColor     = get('hero', 'accent_color',       '#f97316');
  const badgeText       = get('hero', 'badge_text',         'Production-Ready AI Systems');
  const heroPl          = get('hero', 'headline_plain',     'Build');
  const heroAcc         = get('hero', 'headline_accent',    'The Engine');
  const heroBody        = get('hero', 'body_text',          'We move beyond the sandbox. Our development squad builds scalable, resilient, and AI-native applications using a DevOps-first approach to neural integration.');
  const heroBtnPrimary  = get('hero', 'btn_primary_label',  'Start Your Sprint');
  const heroBtnSecond   = get('hero', 'btn_secondary_label','Technical Stack');

  const phaseItems      = safeParse<PhaseItem[]>(get('phases', 'items_json', DEFAULT_PHASES), []);

  const codeHeadPl      = get('code', 'headline_plain',  'Code');
  const codeHeadMid     = get('code', 'headline_mid',    'That');
  const codeHeadAcc     = get('code', 'headline_accent', 'Thinks.');
  const codeBody        = get('code', 'body_text',       'We specialize in Full-Stack AI Engineering. We don\'t just call an API; we architect the vector databases, the prompt-caching layers, and the custom middleware that makes AI feel instantaneous.');
  const codeFeatures    = safeParse<FeatureFeat[]>(get('code', 'features_json', DEFAULT_FEATURES), []);
  const sysLabel        = get('code', 'system_label',    'SYSTEM_ARCH_v2.0');
  const buildingLabel   = get('code', 'building_label',  'Building: Autonomous_Agent_Cluster');

  const techLabel       = get('tech', 'section_label',   'Our Production Arsenal');
  const techItems       = safeParse<TechItem[]>(get('tech', 'items_json', DEFAULT_TECH_STACK), []);

  const ctaHeadPl       = get('cta', 'headline_plain',   'From Idea');
  const ctaHeadAcc      = get('cta', 'headline_accent',  'To Deployment.');
  const ctaBody         = get('cta', 'body_text',        'Stop waiting on technical debt. Build the future with a development partner that understands the neural frontier.');
  const ctaBtnLabel     = get('cta', 'btn_label',        'Initialize Your Project');
  const ctaFootnote     = get('cta', 'footnote',         'Development Node // Gurugram Hub');

  return (
    <main className="min-h-screen bg-[#020617] text-slate-100 overflow-x-hidden selection:bg-orange-500/30">
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-16 md:pt-52 md:pb-32 px-6">
        <div className="absolute inset-0 -z-10"
          style={{ background: 'linear-gradient(to right, #1e293b 1px, transparent 1px), linear-gradient(to bottom, #1e293b 1px, transparent 1px)', backgroundSize: '3rem 3rem', WebkitMaskImage: 'radial-gradient(ellipse 60% 50% at 50% 0%, #000 70%, transparent 100%)', opacity: 0.1 }} />
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full mb-8 backdrop-blur-xl"
            style={{ background: `${accentColor}1a`, border: `1px solid ${accentColor}33` }}>
            <Terminal className="w-3.5 h-3.5" style={{ color: accentColor }} />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]" style={{ color: accentColor }}>{badgeText}</span>
          </div>
          <h1 className="text-6xl md:text-9xl font-black tracking-tighter leading-[0.85] uppercase mb-10">
            {heroPl} <br />
            <span className="text-transparent bg-clip-text italic"
              style={{ backgroundImage: `linear-gradient(to right, ${accentColor}cc, ${accentColor}, #7f1d1d)` }}>
              {heroAcc}
            </span>
          </h1>
          <p className="max-w-3xl text-slate-400 text-base md:text-xl leading-relaxed mb-12 font-light">{heroBody}</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="px-10 py-5 text-white rounded-2xl font-black text-sm uppercase tracking-widest transition-all hover:scale-105 shadow-2xl flex items-center justify-center gap-2"
              style={{ background: accentColor, boxShadow: `0 25px 50px ${accentColor}4d` }}>
              {heroBtnPrimary} <GitBranch className="w-4 h-4" />
            </button>
            <button className="px-10 py-5 bg-white/5 border border-white/10 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-white/10 transition-all">
              {heroBtnSecond}
            </button>
          </div>
        </div>
      </section>

      {/* ── PHASES ───────────────────────────────────────────────────── */}
      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
          {phaseItems.map((item, i) => (
            <div key={i} className="p-8 rounded-[2.5rem] bg-slate-900/40 border border-white/5 relative group hover:bg-slate-900 transition-colors">
              <span className="text-4xl font-black mb-4 block transition-colors"
                style={{ color: `${accentColor}33` }}
                onMouseEnter={e => (e.currentTarget.style.color = `${accentColor}66`)}
                onMouseLeave={e => (e.currentTarget.style.color = `${accentColor}33`)}>
                {item.phase}
              </span>
              <h3 className="text-xl font-bold mb-2 uppercase italic">{item.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CODE SECTION ─────────────────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="order-2 lg:order-1 relative group">
            <div className="absolute -inset-10 rounded-full transition-colors pointer-events-none"
              style={{ background: `${accentColor}0d`, filter: 'blur(120px)' }} />
            <div className="relative bg-black/60 border border-white/10 rounded-[3rem] p-8 md:p-12 shadow-2xl font-mono">
              <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4">
                <div className="flex items-center gap-2 font-black italic text-[10px]" style={{ color: accentColor }}>
                  <Boxes className="w-4 h-4" /> {sysLabel}
                </div>
                <div className="flex gap-2">
                  <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: accentColor }} />
                  <div className="w-2 h-2 rounded-full" style={{ background: `${accentColor}33` }} />
                </div>
              </div>
              <div className="mt-8 grid grid-cols-3 gap-2">
                {[1,2,3,4,5,6].map(i => (
                  <div key={i} className="h-1 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ background: accentColor, width: i < 5 ? '100%' : '50%', animation: i >= 5 ? 'pulse 2s infinite' : undefined }} />
                  </div>
                ))}
              </div>
              <p className="mt-4 text-[9px] text-slate-500 uppercase tracking-widest">{buildingLabel}</p>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="text-4xl md:text-7xl font-black mb-8 italic tracking-tighter uppercase leading-none text-white">
              {codeHeadPl}<br />{codeHeadMid}<br />
              <span style={{ color: accentColor }}>{codeHeadAcc}</span>
            </h2>
            <p className="text-slate-400 text-lg mb-8 leading-relaxed font-light">{codeBody}</p>
            <div className="space-y-6 mt-10">
              {codeFeatures.map((feat, idx) => {
                const Icon = ICON_MAP[feat.icon] ?? Zap;
                return (
                  <div key={idx} className="flex gap-5 group">
                    <div className="mt-1 p-2 bg-white/5 rounded-xl transition-all group-hover:text-black"
                      style={{} as any}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = accentColor; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)'; }}>
                      <Icon className="w-5 h-5" style={{ color: accentColor }} />
                    </div>
                    <div>
                      <h4 className="text-sm font-black uppercase tracking-widest text-white mb-1">{feat.title}</h4>
                      <p className="text-slate-500 text-sm leading-relaxed">{feat.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── TECH STACK ───────────────────────────────────────────────── */}
      <section className="py-24 border-y border-white/5" style={{ background: `${accentColor}03` }}>
        <div className="max-w-7xl mx-auto px-6 overflow-hidden">
          <p className="text-center text-[10px] font-bold text-slate-500 uppercase tracking-[0.5em] mb-12 italic">{techLabel}</p>
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-8 opacity-40 hover:opacity-100 transition-opacity">
            {techItems.map((tech, i) => (
              <span key={i} className="text-2xl font-black text-white tracking-tighter cursor-default transition-colors"
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = accentColor)}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = '#fff')}>
                {tech.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto border rounded-[4rem] p-12 md:p-24 text-center backdrop-blur-3xl relative overflow-hidden"
          style={{ background: `linear-gradient(to bottom right, ${accentColor}14, #000)`, borderColor: `${accentColor}33` }}>
          <div className="relative z-10">
            <h2 className="text-5xl md:text-8xl font-black mb-8 italic tracking-tighter uppercase leading-tight">
              {ctaHeadPl}<br />{ctaHeadAcc}
            </h2>
            <p className="mb-12 max-w-2xl mx-auto font-light text-lg md:text-xl" style={{ color: `${accentColor}b3` }}>{ctaBody}</p>
            <div className="flex flex-col items-center gap-6">
              <button className="bg-white text-black px-16 py-7 rounded-2xl font-black text-2xl hover:scale-105 transition-all shadow-2xl uppercase italic">
                {ctaBtnLabel}
              </button>
              <div className="font-mono text-[10px] tracking-[0.4em] uppercase" style={{ color: `${accentColor}80` }}>{ctaFootnote}</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}