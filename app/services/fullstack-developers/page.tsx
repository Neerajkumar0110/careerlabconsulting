'use client';

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import { usePageContent } from '@/hooks/usePageContent';
import {
  Code2, Layers, Database, Globe, Zap, ArrowRight,
  Monitor, Server, Infinity, Puzzle,
} from 'lucide-react';

// ── Icon maps ─────────────────────────────────────────────────────────────────
const ICON_MAP: Record<string, React.ElementType> = {
  Globe, Layers, Database, Zap, Monitor, Server, Code2, Infinity, Puzzle,
};

// ── Types ─────────────────────────────────────────────────────────────────────
interface CapabilityItem { label: string; icon: string; val: string }
interface StackCard      { title: string; desc: string; icon: string; img: string }
interface StackLayer     { label: string; icon: string; color: string }

function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

const DEFAULT_CAPS: CapabilityItem[] = [
  { label: 'Modern Frontend', icon: 'Globe',    val: 'UX-Focused'   },
  { label: 'API Design',      icon: 'Layers',   val: 'REST/GraphQL' },
  { label: 'Database',        icon: 'Database', val: 'Architecture' },
  { label: 'Deployment',      icon: 'Zap',      val: 'CI/CD Ready'  },
];
const DEFAULT_STACKS: StackCard[] = [
  { title: 'Modern JS Ecosystem',  desc: 'Next.js, React, aur Node.js ke saath high-performance applications jo SEO aur speed ke liye optimized hain.',  icon: 'Monitor', img: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
  { title: 'Scalable Backend & DBs', desc: 'Robust API development using Python, Go, or Rust paired with PostgreSQL, MongoDB, or Redis architecture.',       icon: 'Server',  img: 'https://images.pexels.com/photos/1181359/pexels-photo-1181359.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
];
const DEFAULT_LAYERS: StackLayer[] = [
  { label: 'Client Layer (React/Next)',   icon: 'Monitor',  color: '#e879f9' },
  { label: 'Logic Layer (Node/Go)',       icon: 'Zap',      color: '#a78bfa' },
  { label: 'Data Layer (Postgres/Redis)', icon: 'Database', color: '#60a5fa' },
];

export default function FullstackDevelopersPage() {
  const { get } = usePageContent('services-fullstack-developers');

  // ── Hero ──────────────────────────────────────────────────────────────────
  const badgeText   = get('hero', 'badge_text',        'Full-Cycle Engineering');
  const heroPl      = get('hero', 'headline_plain',    'Code');
  const heroAcc     = get('hero', 'headline_accent',   'Without Limits.');
  const heroBody    = get('hero', 'body_text',         'Frontend ki aesthetics se lekar Backend ki scalability tak—hamare Fullstack developers single-handedly poora product build karne ki shamta rakhte hain.');
  const btnLabel    = get('hero', 'btn_label',         'Hire Fullstack Talent');
  const btnHref     = get('hero', 'btn_href',          '/contact');
  const accent      = get('hero', 'accent_color',      '#8b5cf6');
  const accentTo    = get('hero', 'accent_color_to',   '#d946ef');
  const heroLabel   = get('hero', 'hero_label',        'Architecture_Vertical_Stack');
  const stackLayers = safeParse<StackLayer[]>(get('hero', 'stack_layers_json', JSON.stringify(DEFAULT_LAYERS)), DEFAULT_LAYERS);

  // ── Capabilities ──────────────────────────────────────────────────────────
  const capabilities = safeParse<CapabilityItem[]>(get('capabilities', 'items_json', JSON.stringify(DEFAULT_CAPS)), DEFAULT_CAPS);

  // ── Stacks ────────────────────────────────────────────────────────────────
  const stacks       = safeParse<StackCard[]>(get('stacks', 'items_json', JSON.stringify(DEFAULT_STACKS)), DEFAULT_STACKS);

  // ── CTA ───────────────────────────────────────────────────────────────────
  const ctaPl        = get('cta', 'headline_plain',  'Bridge The');
  const ctaAcc       = get('cta', 'headline_accent', 'Gap.');
  const ctaBody      = get('cta', 'body_text',       "Don't hire two people for one job. Hire experts who understand the entire technical journey.");
  const ctaBtn       = get('cta', 'btn_label',       'Consult with a Lead Dev');
  const ctaHref      = get('cta', 'btn_href',        '/contact');

  return (
    <main className="min-h-screen bg-[#020617] text-slate-100 selection:bg-violet-600/30 font-sans">
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 md:pt-52 md:pb-32 px-6 overflow-hidden">
        <div className="absolute inset-0 -z-10" style={{ background: `radial-gradient(circle at 50% 30%, ${accent}1a 0%, transparent 70%)` }} />
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-8 backdrop-blur-xl"
              style={{ background: `${accent}1a`, border: `1px solid ${accent}33` }}>
              <Infinity size={14} style={{ color: accent }} />
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
            <div className="relative p-10 bg-slate-950 border border-white/10 rounded-[3rem] overflow-hidden">
              <div className="flex justify-between items-center mb-12">
                <span className="text-[10px] font-mono italic uppercase tracking-widest font-bold" style={{ color: accent }}>{heroLabel}</span>
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: accent }} />
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: accentTo }} />
                </div>
              </div>
              <div className="space-y-8">
                {stackLayers.map((layer, i) => {
                  const Icon = ICON_MAP[layer.icon] ?? Monitor;
                  return (
                    <div key={i} className="p-4 bg-white/5 rounded-2xl border-l-4 hover:rotate-0 transition-transform cursor-default"
                      style={{ borderLeftColor: layer.color, transform: `rotate(${i % 2 === 0 ? '-1deg' : '1deg'})` }}>
                      <div className="flex items-center gap-3">
                        <Icon size={18} style={{ color: layer.color }} />
                        <span className="text-xs font-black uppercase italic">{layer.label}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CAPABILITIES ─────────────────────────────────────────────────── */}
      <section className="py-24 px-6 border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {capabilities.map((item, i) => {
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

      {/* ── STACKS ───────────────────────────────────────────────────────── */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {stacks.map((stack, i) => {
            const Icon = ICON_MAP[stack.icon] ?? Monitor;
            return (
              <div key={i} className="group relative rounded-[3rem] overflow-hidden border border-white/5 bg-slate-900/40 transition-all duration-500"
                onMouseEnter={e => (e.currentTarget.style.borderColor = `${accent}4d`)}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)')}>
                <img src={stack.img} className="absolute inset-0 w-full h-full object-cover opacity-10 grayscale group-hover:scale-110 transition-transform duration-1000" alt={stack.title} />
                <div className="relative p-12 bg-gradient-to-t from-[#020617] via-[#020617]/95 to-transparent">
                  <div className="mb-6 p-4 rounded-2xl w-fit transition-all" style={{ background: `${accent}1a`, color: accent }}
                    onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = accent; (e.currentTarget as HTMLDivElement).style.color = '#fff'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = `${accent}1a`; (e.currentTarget as HTMLDivElement).style.color = accent; }}>
                    <Icon size={30} />
                  </div>
                  <h3 className="text-2xl font-black uppercase italic mb-4 tracking-tighter">{stack.title}</h3>
                  <p className="text-slate-400 font-light leading-relaxed mb-8">{stack.desc}</p>
                  <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest" style={{ color: accent }}>
                    <Puzzle size={14} /> Full System Ownership
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto p-12 md:p-24 rounded-[4rem] text-center relative overflow-hidden shadow-2xl"
          style={{ backgroundImage: `linear-gradient(to bottom right, ${accent}, ${accentTo}99)` }}>
          <div className="absolute top-0 right-0 p-12 opacity-10"><Code2 size={300} /></div>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-7xl font-black italic uppercase tracking-tighter mb-8 leading-none">
              {ctaPl}<br /><span style={{ color: `${accent}66` }}>{ctaAcc}</span>
            </h2>
            <p className="text-violet-100 text-lg mb-12 max-w-xl mx-auto font-light leading-relaxed">{ctaBody}</p>
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