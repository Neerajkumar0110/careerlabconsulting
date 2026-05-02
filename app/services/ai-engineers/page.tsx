'use client';

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import { usePageContent } from '@/hooks/usePageContent';
import {
  BrainCircuit, Cpu, Code2, Network, Bot,
  ArrowRight, Database, SearchCode, Sparkles, Zap,
} from 'lucide-react';

// ── Icon maps ─────────────────────────────────────────────────────────────────
const ICON_MAP: Record<string, React.ElementType> = {
  Bot, SearchCode, Cpu, Sparkles, Database, Zap, Network, Code2,
};

// ── Types ─────────────────────────────────────────────────────────────────────
interface CompetencyItem  { label: string; icon: string; val: string }
interface SpecCard         { title: string; desc: string; icon: string; img: string }
interface HeroStat         { label: string; val: string }

function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

// ── Defaults ──────────────────────────────────────────────────────────────────
const DEFAULT_COMPETENCIES: CompetencyItem[] = [
  { label: 'TensorFlow/PyTorch', icon: 'Cpu',      val: 'Deep Learning' },
  { label: 'OpenAI/Anthropic',   icon: 'Sparkles', val: 'LLM Expert'    },
  { label: 'Pinecone/Milvus',    icon: 'Database', val: 'Vector DBs'    },
  { label: 'LangChain/AutoGPT',  icon: 'Zap',      val: 'AI Agents'     },
];
const DEFAULT_SPECS: SpecCard[] = [
  { title: 'LLM Customization', desc: 'Fine-tuning models like GPT-4, Llama 3, and Claude for your specific business context and private data.',                              icon: 'Bot',        img: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
  { title: 'Computer Vision',   desc: 'Deploying production-ready models for object detection, facial recognition, and medical imaging analysis.', icon: 'SearchCode',  img: 'https://images.pexels.com/photos/5473337/pexels-photo-5473337.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
];
const DEFAULT_HERO_STATS: HeroStat[] = [
  { label: 'Latency',  val: '24ms'  },
  { label: 'Accuracy', val: '99.2%' },
];

export default function AIEngineersPage() {
  const { get } = usePageContent('services-ai-engineers');

  // ── Hero ──────────────────────────────────────────────────────────────────
  const badgeText   = get('hero', 'badge_text',      'Elite Neural Engineering');
  const heroPl      = get('hero', 'headline_plain',  'Hire AI');
  const heroAcc     = get('hero', 'headline_accent', 'Architects.');
  const heroBody    = get('hero', 'body_text',        "Build the future with engineers who don't just use AI—they build it. From RAG pipelines to autonomous agents, hire the top 1% of ML talent.");
  const btnLabel    = get('hero', 'btn_label',       'Assemble Your AI Team');
  const btnHref     = get('hero', 'btn_href',        '/contact');
  const accent      = get('hero', 'accent_color',    '#22d3ee');
  const accentTo    = get('hero', 'accent_color_to', '#8b5cf6');
  const heroStats   = safeParse<HeroStat[]>(get('hero', 'hero_stats_json', JSON.stringify(DEFAULT_HERO_STATS)), DEFAULT_HERO_STATS);

  // ── Competencies ──────────────────────────────────────────────────────────
  const sectionLabel  = get('competencies', 'section_label', 'Core AI Competencies');
  const competencies  = safeParse<CompetencyItem[]>(get('competencies', 'items_json', JSON.stringify(DEFAULT_COMPETENCIES)), DEFAULT_COMPETENCIES);

  // ── Specializations ───────────────────────────────────────────────────────
  const specs = safeParse<SpecCard[]>(get('specializations', 'items_json', JSON.stringify(DEFAULT_SPECS)), DEFAULT_SPECS);

  // ── CTA ───────────────────────────────────────────────────────────────────
  const ctaPl    = get('cta', 'headline_plain',  'The Code Of');
  const ctaAcc   = get('cta', 'headline_accent', 'Intelligence.');
  const ctaBody  = get('cta', 'body_text',        '"AI implement karna mushkil nahi hai, use scale aur optimize karna asli challenge hai. Hire the best."');
  const ctaBtn   = get('cta', 'btn_label',        'Consult with AI Experts');
  const ctaHref  = get('cta', 'btn_href',         '/contact');

  return (
    <main className="min-h-screen bg-[#020617] text-slate-100 selection:bg-cyan-500/30 font-sans">
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 md:pt-52 md:pb-32 px-6 overflow-hidden">
        <div className="absolute inset-0 -z-10" style={{ background: `radial-gradient(circle at 50% 30%, ${accent}1a 0%, transparent 70%)` }} />
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-8 backdrop-blur-xl"
              style={{ background: `${accent}1a`, border: `1px solid ${accent}33` }}>
              <BrainCircuit size={14} style={{ color: accent }} />
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
              className="text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center gap-3 transition-all shadow-xl hover:opacity-90"
              style={{ background: accent, boxShadow: `0 20px 40px ${accent}33` }}>
              {btnLabel} <ArrowRight size={16} />
            </button>
          </div>

          <div className="lg:w-1/2 relative group w-full">
            <div className="absolute -inset-4 rounded-full blur-3xl" style={{ background: `${accentTo}1a` }} />
            <div className="relative p-10 bg-slate-950/80 border border-white/10 rounded-[3rem] backdrop-blur-3xl">
              <div className="flex justify-between items-center mb-10">
                <span className="text-[10px] font-mono italic uppercase tracking-widest" style={{ color: accent }}>Model_Inference_Stream</span>
                <div className="flex gap-2">
                  <div className="h-1.5 w-1.5 rounded-full animate-ping" style={{ background: accent }} />
                  <div className="h-1.5 w-1.5 rounded-full" style={{ background: accentTo }} />
                </div>
              </div>
              <div className="space-y-4 mb-8">
                {[65, 80, 50].map((w, i) => (
                  <div key={i} className="h-3 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${w}%`, backgroundImage: `linear-gradient(to right, ${accent}, ${accentTo})` }} />
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-4">
                {heroStats.map((stat, i) => (
                  <div key={i} className="p-4 rounded-2xl border" style={{ background: `${i === 0 ? accent : accentTo}0d`, borderColor: `${i === 0 ? accent : accentTo}1a` }}>
                    <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">{stat.label}</p>
                    <p className="text-xl font-black font-mono" style={{ color: i === 0 ? accent : accentTo }}>{stat.val}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── COMPETENCIES ─────────────────────────────────────────────────── */}
      <section className="py-24 px-6 border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center text-[10px] font-black uppercase tracking-[0.5em] text-slate-500 mb-16 italic">{sectionLabel}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {competencies.map((item, i) => {
              const Icon = ICON_MAP[item.icon] ?? Zap;
              return (
                <div key={i} className="text-center group p-6 hover:bg-white/[0.02] rounded-3xl transition-all">
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

      {/* ── SPECIALIZATIONS ──────────────────────────────────────────────── */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {specs.map((spec, i) => {
            const Icon = ICON_MAP[spec.icon] ?? Bot;
            return (
              <div key={i} className="group relative rounded-[3rem] overflow-hidden border border-white/5 bg-slate-900/40 transition-all duration-500 hover:border-opacity-30"
                style={{ '--hover-color': accent } as React.CSSProperties}
                onMouseEnter={e => (e.currentTarget.style.borderColor = `${accent}4d`)}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)')}>
                <img src={spec.img} className="absolute inset-0 w-full h-full object-cover opacity-10 grayscale group-hover:scale-110 transition-transform duration-1000" alt={spec.title} />
                <div className="relative p-12 bg-gradient-to-t from-[#020617] via-[#020617]/95 to-transparent">
                  <div className="mb-6 p-4 rounded-2xl w-fit transition-all"
                    style={{ background: `${accent}1a`, color: accent }}
                    onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = accent; (e.currentTarget as HTMLDivElement).style.color = '#fff'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = `${accent}1a`; (e.currentTarget as HTMLDivElement).style.color = accent; }}>
                    <Icon size={30} />
                  </div>
                  <h3 className="text-2xl font-black uppercase italic mb-4 tracking-tighter">{spec.title}</h3>
                  <p className="text-slate-400 font-light leading-relaxed mb-8">{spec.desc}</p>
                  <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest" style={{ color: accent }}>
                    <Network size={14} /> Neural-Architecture Ready
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
          style={{ background: `linear-gradient(to bottom right, ${accent}1a, #020617)`, borderColor: `${accent}33` }}>
          <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full blur-[100px]" style={{ background: `${accent}1a` }} />
          <div className="relative z-10">
            <Code2 className="mx-auto mb-8" size={48} style={{ color: accent }} />
            <h2 className="text-4xl md:text-7xl font-black italic uppercase tracking-tighter mb-10 leading-none">
              {ctaPl}<br /><span style={{ color: accent }}>{ctaAcc}</span>
            </h2>
            <p className="text-slate-400 mb-12 max-w-lg mx-auto font-light italic">{ctaBody}</p>
            <button onClick={() => window.location.href = ctaHref}
              className="bg-white text-black px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:scale-105 transition-all shadow-2xl">
              {ctaBtn}
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}