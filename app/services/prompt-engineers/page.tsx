'use client';

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import { usePageContent } from '@/hooks/usePageContent';
import {
  MessageSquareCode, Terminal, Sparkles, Settings2,
  Repeat, ArrowRight, ShieldCheck, Brain, Quote, Command,
} from 'lucide-react';

// ── Icon maps ─────────────────────────────────────────────────────────────────
const ICON_MAP: Record<string, React.ElementType> = {
  Terminal, MessageSquareCode, Settings2, ShieldCheck, Brain, Repeat, Sparkles, Quote, Command,
};

// ── Types ─────────────────────────────────────────────────────────────────────
interface LoopItem   { label: string; icon: string; val: string }
interface SpecCard   { title: string; desc: string; icon: string; img: string }

function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

const DEFAULT_LOOP: LoopItem[] = [
  { label: 'Instruction Design', icon: 'Terminal',          val: 'Linguistic'     },
  { label: 'Few-Shot Learning',  icon: 'MessageSquareCode', val: 'Example-Driven' },
  { label: 'Parameter Tuning',   icon: 'Settings2',         val: 'Temp/Top-P'     },
  { label: 'Safety Alignment',   icon: 'ShieldCheck',       val: 'Bias-Free'      },
];
const DEFAULT_SPECS: SpecCard[] = [
  { title: 'RAG & Context Optimization', desc: 'Engineering complex prompts that utilize Retrieval-Augmented Generation to ground AI responses in your private data.', icon: 'Brain',  img: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
  { title: 'Chain-of-Thought Logic',     desc: 'Designing multi-step reasoning prompts that reduce hallucination and solve complex logical problems with 99% accuracy.', icon: 'Repeat', img: 'https://images.pexels.com/photos/5473337/pexels-photo-5473337.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
];
const DEFAULT_CODE_LINES = [
  'SET ROLE = "Expert_FinOps_Analyst"',
  'ENFORCE Chain_of_Thought = True',
  'RESTRICT Hallucination_Threshold < 0.01',
];

export default function PromptEngineeringPage() {
  const { get } = usePageContent('services-prompt-engineering');

  // ── Hero ──────────────────────────────────────────────────────────────────
  const badgeText     = get('hero', 'badge_text',       'System Instruction Experts');
  const heroPl        = get('hero', 'headline_plain',   'Speak To');
  const heroAcc       = get('hero', 'headline_accent',  'The Machine.');
  const heroBody      = get('hero', 'body_text',        'AI outputs are only as good as their inputs. Our Prompt Engineers master the syntax and psychology required to extract maximum performance from LLMs.');
  const btnLabel      = get('hero', 'btn_label',        'Hire Prompt Experts');
  const btnHref       = get('hero', 'btn_href',         '/contact');
  const accent        = get('hero', 'accent_color',     '#10b981');
  const accentTo      = get('hero', 'accent_color_to',  '#22d3ee');
  const codeLabel     = get('hero', 'code_label',       'Compiler_Active');
  const statusText    = get('hero', 'hero_status_text', 'Optimizing token density and output structure...');
  const codeLines     = safeParse<string[]>(get('hero', 'code_lines_json', JSON.stringify(DEFAULT_CODE_LINES)), DEFAULT_CODE_LINES);

  // ── Refinement Loop ───────────────────────────────────────────────────────
  const loopLabel     = get('refinement_loop', 'section_label', 'The Refinement Loop');
  const loopItems     = safeParse<LoopItem[]>(get('refinement_loop', 'items_json', JSON.stringify(DEFAULT_LOOP)), DEFAULT_LOOP);

  // ── Specialties ───────────────────────────────────────────────────────────
  const specs         = safeParse<SpecCard[]>(get('specialties', 'items_json', JSON.stringify(DEFAULT_SPECS)), DEFAULT_SPECS);

  // ── CTA ───────────────────────────────────────────────────────────────────
  const ctaPl         = get('cta', 'headline_plain',  'Control the');
  const ctaAcc        = get('cta', 'headline_accent', 'Conversation.');
  const ctaBody       = get('cta', 'body_text',       'Stop wasting tokens on generic responses. Unlock the true potential of your LLM with surgical prompt engineering.');
  const ctaBtn        = get('cta', 'btn_label',       'Get a Prompt Audit');
  const ctaHref       = get('cta', 'btn_href',        '/contact');

  return (
    <main className="min-h-screen bg-[#020617] text-slate-100 selection:bg-emerald-500/30 font-sans">
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 md:pt-52 md:pb-32 px-6 overflow-hidden">
        <div className="absolute inset-0 -z-10" style={{ background: `radial-gradient(circle at 50% 30%, ${accent}1a 0%, transparent 70%)` }} />
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-8 backdrop-blur-xl"
              style={{ background: `${accent}1a`, border: `1px solid ${accent}33` }}>
              <Command size={14} style={{ color: accent }} />
              <span className="text-[10px] font-black uppercase tracking-[0.3em]" style={{ color: accent }}>{badgeText}</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85] mb-8">
              {heroPl}<br />
              <span className="italic font-black" style={{
                backgroundImage: `linear-gradient(to right, ${accent}, ${accentTo})`,
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>{heroAcc}</span>
            </h1>
            <p className="max-w-xl text-slate-400 text-lg font-light leading-relaxed mb-10">{heroBody}</p>
            <button onClick={() => window.location.href = btnHref}
              className="text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center gap-3 transition-all hover:opacity-90"
              style={{ background: accent, boxShadow: `0 20px 40px ${accent}33` }}>
              {btnLabel} <ArrowRight size={16} />
            </button>
          </div>

          <div className="lg:w-1/2 relative group w-full">
            <div className="absolute -inset-4 rounded-full blur-3xl" style={{ background: `${accent}1a` }} />
            <div className="relative bg-[#0a0f1e] border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
              <div className="bg-white/5 px-6 py-3 border-b border-white/5 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500" />
                <div className="w-2 h-2 rounded-full bg-amber-500" />
                <div className="w-2 h-2 rounded-full" style={{ background: accent }} />
                <span className="ml-4 text-[10px] font-mono text-slate-500 uppercase tracking-widest">{codeLabel}</span>
              </div>
              <div className="p-8 font-mono text-sm space-y-4">
                <p className="italic" style={{ color: accent }}># System Prompt v4.2</p>
                <div className="text-slate-300 space-y-1">
                  {codeLines.map((line, i) => (
                    <p key={i}><span style={{ color: accent }}>{line.split(' ')[0]}</span> {line.split(' ').slice(1).join(' ')}</p>
                  ))}
                </div>
                <div className="h-px bg-white/5 my-4" />
                <div className="flex gap-3">
                  <Sparkles size={16} style={{ color: accent }} className="shrink-0" />
                  <p className="text-slate-500 italic">{statusText}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── REFINEMENT LOOP ──────────────────────────────────────────────── */}
      <section className="py-24 px-6 border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center text-[10px] font-black uppercase tracking-[0.5em] text-slate-500 mb-16 italic">{loopLabel}</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {loopItems.map((item, i) => {
              const Icon = ICON_MAP[item.icon] ?? Terminal;
              return (
                <div key={i} className="text-center group p-6 rounded-3xl hover:bg-white/[0.02] transition-all">
                  <div className="mb-4 flex justify-center group-hover:scale-110 transition-transform" style={{ color: accent }}>
                    <Icon size={24} />
                  </div>
                  <h4 className="text-lg font-black italic mb-1 uppercase tracking-tight">{item.val}</h4>
                  <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">{item.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SPECIALTIES ──────────────────────────────────────────────────── */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {specs.map((spec, i) => {
            const Icon = ICON_MAP[spec.icon] ?? Brain;
            return (
              <div key={i} className="group relative rounded-[3rem] overflow-hidden border border-white/5 bg-slate-900/40 transition-all duration-500"
                onMouseEnter={e => (e.currentTarget.style.borderColor = `${accent}4d`)}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)')}>
                <img src={spec.img} className="absolute inset-0 w-full h-full object-cover opacity-10 grayscale group-hover:scale-110 transition-transform duration-1000" alt={spec.title} />
                <div className="relative p-12 bg-gradient-to-t from-[#020617] via-[#020617]/95 to-transparent">
                  <div className="mb-6 p-4 rounded-2xl w-fit transition-all" style={{ background: `${accent}1a`, color: accent }}
                    onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = accent; (e.currentTarget as HTMLDivElement).style.color = '#fff'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = `${accent}1a`; (e.currentTarget as HTMLDivElement).style.color = accent; }}>
                    <Icon size={30} />
                  </div>
                  <h3 className="text-2xl font-black uppercase italic mb-4 tracking-tighter">{spec.title}</h3>
                  <p className="text-slate-400 font-light leading-relaxed mb-8">{spec.desc}</p>
                  <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest" style={{ color: accent }}>
                    <Quote size={14} /> Token Efficiency Guaranteed
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto p-12 md:p-24 rounded-[4rem] border text-center relative overflow-hidden shadow-2xl"
          style={{ background: `linear-gradient(to bottom right, ${accent}0d, #020617)`, borderColor: `${accent}33` }}>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-7xl font-black italic uppercase tracking-tighter mb-10 leading-none">
              {ctaPl}<br /><span style={{ color: accent }}>{ctaAcc}</span>
            </h2>
            <p className="text-slate-400 mb-12 max-w-lg mx-auto font-light leading-relaxed">{ctaBody}</p>
            <button onClick={() => window.location.href = ctaHref}
              className="text-white px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:scale-105 transition-all shadow-2xl"
              style={{ background: accent, boxShadow: `0 20px 40px ${accent}4d` }}>
              {ctaBtn}
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}