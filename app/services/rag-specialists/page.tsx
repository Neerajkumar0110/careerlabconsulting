'use client';

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import { usePageContent } from '@/hooks/usePageContent';
import {
  Database, Search, FileSearch, Layers, Cpu,
  ArrowRight, ShieldCheck, Zap, Network, Share2,
} from 'lucide-react';

// ── Icon maps ─────────────────────────────────────────────────────────────────
const ICON_MAP: Record<string, React.ElementType> = {
  Database, Search, FileSearch, Layers, Cpu, Zap, Network, ShieldCheck, Share2,
};

// ── Types ─────────────────────────────────────────────────────────────────────
interface StatItem       { label: string; icon: string; val: string }
interface WorkflowCard   { title: string; desc: string; icon: string; img: string }
interface PipelineStep   { label: string; icon: string; color: string; highlight?: boolean }

function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

const DEFAULT_STATS: StatItem[] = [
  { label: 'Latency',       icon: 'Zap',         val: '< 200ms'    },
  { label: 'Data Security', icon: 'ShieldCheck',  val: 'SOC2 Ready' },
  { label: 'Scalability',   icon: 'Layers',       val: '1B+ Chunks' },
  { label: 'Architecture',  icon: 'Network',      val: 'Multi-Index'},
];
const DEFAULT_WORKFLOWS: WorkflowCard[] = [
  { title: 'Vector Database Architecture', desc: 'Pinecone, Weaviate, aur Milvus ke sath high-performance retrieval systems jo millions of documents ko milliseconds mein search karte hain.', icon: 'Network', img: 'https://images.pexels.com/photos/1148820/pexels-photo-1148820.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
  { title: 'Hybrid Search Systems',        desc: 'Combining Semantic search with Keyword search (BM25) for 100% accuracy in document retrieval and citation.',                               icon: 'Search',  img: 'https://images.pexels.com/photos/5473337/pexels-photo-5473337.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
];
const DEFAULT_PIPELINE: PipelineStep[] = [
  { label: 'Embedding',      icon: 'FileSearch', color: '#84cc16' },
  { label: 'Vector Storage', icon: 'Database',   color: '#10b981' },
  { label: 'LLM Synthesis',  icon: 'Cpu',        color: '#ffffff', highlight: true },
];

export default function RAGSpecialistsPage() {
  const { get } = usePageContent('services-rag-specialists');

  // ── Hero ──────────────────────────────────────────────────────────────────
  const badgeText    = get('hero', 'badge_text',          'Retrieval Augmented Intelligence');
  const heroPl       = get('hero', 'headline_plain',      'Chat With');
  const heroAcc      = get('hero', 'headline_accent',     'Your Data.');
  const heroBody     = get('hero', 'body_text',           'Generic AI halls ko khatam kijiye. Hamare RAG specialists aapke private data ko LLMs se connect karte hain, jisse milti hai accurate, cited, aur secure intelligence.');
  const btnLabel     = get('hero', 'btn_label',           'Build My RAG Pipeline');
  const btnHref      = get('hero', 'btn_href',            '/contact');
  const accent       = get('hero', 'accent_color',        '#84cc16');
  const accentTo     = get('hero', 'accent_color_to',     '#10b981');
  const heroLabel    = get('hero', 'hero_label',          'Knowledge_Sync_v1');
  const pipelineSteps = safeParse<PipelineStep[]>(get('hero', 'pipeline_steps_json', JSON.stringify(DEFAULT_PIPELINE)), DEFAULT_PIPELINE);

  // ── Stats ─────────────────────────────────────────────────────────────────
  const stats        = safeParse<StatItem[]>(get('stats', 'items_json', JSON.stringify(DEFAULT_STATS)), DEFAULT_STATS);

  // ── Workflows ─────────────────────────────────────────────────────────────
  const workflows    = safeParse<WorkflowCard[]>(get('workflows', 'items_json', JSON.stringify(DEFAULT_WORKFLOWS)), DEFAULT_WORKFLOWS);

  // ── CTA ───────────────────────────────────────────────────────────────────
  const ctaPl        = get('cta', 'headline_plain',  'Intelligence Meets');
  const ctaAcc       = get('cta', 'headline_accent', 'Context.');
  const ctaBody      = get('cta', 'body_text',       'Unlock the trapped knowledge within your enterprise. Our RAG systems make your technical manuals, legal docs, and internal wikis conversational.');
  const ctaBtn       = get('cta', 'btn_label',       'Start Your Data Sync');
  const ctaHref      = get('cta', 'btn_href',        '/contact');

  return (
    <main className="min-h-screen bg-[#020617] text-slate-100 selection:bg-lime-500/30 font-sans">
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 md:pt-52 md:pb-32 px-6 overflow-hidden">
        <div className="absolute inset-0 -z-10" style={{ background: `radial-gradient(circle at 50% 30%, ${accent}1a 0%, transparent 70%)` }} />
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-8 backdrop-blur-xl"
              style={{ background: `${accent}1a`, border: `1px solid ${accent}33` }}>
              <Database size={14} style={{ color: accent }} />
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
              className="text-black px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center gap-3 transition-all hover:opacity-90"
              style={{ background: accent, boxShadow: `0 20px 40px ${accent}33` }}>
              {btnLabel} <ArrowRight size={16} />
            </button>
          </div>

          <div className="lg:w-1/2 relative group w-full">
            <div className="absolute -inset-4 rounded-full blur-3xl animate-pulse" style={{ background: `${accent}1a` }} />
            <div className="relative p-8 bg-slate-950 border border-white/10 rounded-[3rem] backdrop-blur-3xl overflow-hidden">
              <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-6">
                <div className="flex gap-2 items-center">
                  <Share2 size={18} style={{ color: accent }} />
                  <span className="text-[10px] font-mono font-bold text-slate-400 tracking-tighter uppercase">{heroLabel}</span>
                </div>
                <div className="h-2 w-2 rounded-full animate-ping" style={{ background: accent }} />
              </div>
              <div className="space-y-6">
                {pipelineSteps.map((step, i) => {
                  const Icon = ICON_MAP[step.icon] ?? Database;
                  return (
                    <div key={i} className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center border"
                        style={step.highlight
                          ? { background: accent, boxShadow: `0 10px 20px ${accent}33`, borderColor: 'transparent' }
                          : { background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)' }}>
                        <Icon size={20} style={{ color: step.highlight ? '#000' : step.color }} />
                      </div>
                      <div className="flex-1 h-px" style={{ background: `linear-gradient(to right, ${step.color}80, transparent)` }} />
                      <div className="text-[10px] font-mono text-slate-500 uppercase">{step.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ────────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((item, i) => {
              const Icon = ICON_MAP[item.icon] ?? Zap;
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

      {/* ── WORKFLOWS ────────────────────────────────────────────────────── */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {workflows.map((wf, i) => {
            const Icon = ICON_MAP[wf.icon] ?? Network;
            return (
              <div key={i} className="group relative rounded-[3rem] overflow-hidden border border-white/5 bg-slate-900/40 transition-all duration-500"
                onMouseEnter={e => (e.currentTarget.style.borderColor = `${accent}4d`)}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)')}>
                <img src={wf.img} className="absolute inset-0 w-full h-full object-cover opacity-10 grayscale group-hover:scale-110 transition-transform duration-1000" alt={wf.title} />
                <div className="relative p-12 bg-gradient-to-t from-[#020617] via-[#020617]/95 to-transparent">
                  <div className="mb-6 p-4 rounded-2xl w-fit transition-all" style={{ background: `${accent}1a`, color: accent }}
                    onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = accent; (e.currentTarget as HTMLDivElement).style.color = '#000'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = `${accent}1a`; (e.currentTarget as HTMLDivElement).style.color = accent; }}>
                    <Icon size={30} />
                  </div>
                  <h3 className="text-2xl font-black uppercase italic mb-4 tracking-tighter">{wf.title}</h3>
                  <p className="text-slate-400 font-light leading-relaxed mb-8">{wf.desc}</p>
                  <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest" style={{ color: accent }}>
                    <Database size={14} /> Knowledge Retrieval Optimization
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
          style={{ background: `linear-gradient(to bottom right, ${accent}14, #020617)`, borderColor: `${accent}33` }}>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-7xl font-black italic uppercase tracking-tighter mb-8 leading-none">
              {ctaPl}<br /><span style={{ color: accent }}>{ctaAcc}</span>
            </h2>
            <p className="text-slate-400 text-lg mb-12 max-w-xl mx-auto font-light leading-relaxed">{ctaBody}</p>
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