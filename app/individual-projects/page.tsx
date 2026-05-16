'use client';

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import {
  Zap, Rocket, User, Target, Sparkles, Cpu,
  ArrowRight, Code2, Globe, Star,
} from 'lucide-react';
import { usePageContent } from '@/hooks/usePageContent';

function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

interface ServiceCard { title: string; desc: string; icon: string }
interface ScaleItem   { icon: string; text: string }

const ICON_MAP: Record<string, React.ElementType> = { Code2, Sparkles, Target, Zap, Globe, Star, Rocket, User, Cpu };

const DEFAULT_SERVICES = JSON.stringify([
  { title: 'AI SaaS Launchpad',  desc: 'From concept to deployed app in record time. We handle the LLM integration, subscription logic, and hosting so you can focus on growth.', icon: 'Code2'    },
  { title: 'Content Autonomy',   desc: 'Custom agents that learn your voice and automate your social presence, newsletter, and video scripts across all platforms.',                icon: 'Sparkles' },
  { title: 'Niche Dominance',    desc: 'Using AI to identify market gaps and automate lead generation for your specific consulting or digital product niche.',                      icon: 'Target'   },
]);
const DEFAULT_SCALE_ITEMS = JSON.stringify([
  { icon: 'Zap',   text: 'Automated MVP Development'           },
  { icon: 'Globe', text: 'Global Distribution Infrastructure'  },
  { icon: 'Star',  text: 'Personal AI Brand Twin'              },
]);

export default function IndividualProjectsPage() {
  const { get } = usePageContent('home-individual-projects');

  const accentColor    = get('hero', 'accent_color',       '#ec4899');
  const badgeText      = get('hero', 'badge_text',         'Force Multiplier for Creators');
  const heroPl         = get('hero', 'headline_plain',     'One Person');
  const heroAcc        = get('hero', 'headline_accent',    'Empire');
  const heroBody       = get('hero', 'body_text',          'You have the vision; we provide the neural infrastructure. We help solo founders build AI-powered SaaS, automated content engines, and personal brand OSs that run while you sleep.');
  const heroBtnPrimary = get('hero', 'btn_primary_label',  'Launch Your Idea');
  const heroBtnSecond  = get('hero', 'btn_secondary_label','View Creator Stack');

  const serviceItems   = safeParse<ServiceCard[]>(get('services', 'items_json', DEFAULT_SERVICES), []);

  const scaleHeadPl    = get('scale', 'headline_plain',  'Scale');
  const scaleHeadMid   = get('scale', 'headline_mid',    'Without');
  const scaleHeadAcc   = get('scale', 'headline_accent', 'Employees.');
  const scaleBody      = get('scale', 'body_text',       'We help you build a Human-in-the-Loop system where AI handles 90% of the operational heavy lifting, leaving you with the creative 10%.');
  const scaleItems     = safeParse<ScaleItem[]>(get('scale', 'items_json', DEFAULT_SCALE_ITEMS), []);
  const coreLabel      = get('scale', 'core_label',      'CREATOR_CORE_v1');
  const soloMode       = get('scale', 'solo_mode',       'SOLO_MODE: ENABLED');
  const analysisMsg    = get('scale', 'analysis_message','Analyzing audience sentiment across X and LinkedIn. Generating 7-day content cluster optimized for conversion.');
  const saasLabel      = get('scale', 'saas_label',      'SaaS MRR Engine');

  const ctaHeadline    = get('cta', 'headline',          'Stop Dreaming. Start Building.');
  const ctaBody        = get('cta', 'body_text',         'You don\'t need a team of 50. You need the right agents. Let\'s build your AI-driven future together.');
  const ctaBtnLabel    = get('cta', 'btn_label',         'Get Your Personal Audit');
  const ctaFootnote    = get('cta', 'footnote',          'Individual Lab // Gurugram Hub');

  return (
    <main className="min-h-screen bg-[#020617] text-slate-100 overflow-x-hidden selection:bg-pink-500/30">
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-16 md:pt-52 md:pb-32 px-6">
        <div className="absolute inset-0 -z-10"
          style={{ background: `radial-gradient(circle at 50% 40%, ${accentColor}1a 0%, transparent 60%)` }} />
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full mb-8 backdrop-blur-xl"
            style={{ background: `${accentColor}1a`, border: `1px solid ${accentColor}33` }}>
            <User className="w-3.5 h-3.5" style={{ color: accentColor }} />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]" style={{ color: accentColor }}>{badgeText}</span>
          </div>
          <h1 className="text-6xl md:text-9xl font-black tracking-tighter leading-[0.85] uppercase mb-10">
            {heroPl} <br />
            <span className="text-transparent bg-clip-text italic"
              style={{ backgroundImage: `linear-gradient(to right, ${accentColor}cc, ${accentColor}, #581c87)` }}>
              {heroAcc}
            </span>
          </h1>
          <p className="max-w-3xl text-slate-400 text-base md:text-xl leading-relaxed mb-12 font-light">{heroBody}</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="px-10 py-5 text-white rounded-2xl font-black text-sm uppercase tracking-widest transition-all hover:scale-105 shadow-2xl flex items-center justify-center gap-2"
              style={{ background: accentColor, boxShadow: `0 25px 50px ${accentColor}4d` }}>
              {heroBtnPrimary} <Rocket className="w-4 h-4" />
            </button>
            <button className="px-10 py-5 bg-white/5 border border-white/10 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-white/10 transition-all">
              {heroBtnSecond}
            </button>
          </div>
        </div>
      </section>

      {/* ── SERVICES ─────────────────────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {serviceItems.map((item, i) => {
            const Icon = ICON_MAP[item.icon] ?? Zap;
            return (
              <div key={i} className="p-10 rounded-[3rem] bg-slate-900/40 border border-white/5 transition-all group relative overflow-hidden"
                onMouseEnter={e => (e.currentTarget.style.borderColor = `${accentColor}66`)}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)')}>
                <div className="mb-8 p-4 rounded-2xl inline-block transition-all"
                  style={{ background: `${accentColor}0d` }}>
                  <Icon className="w-8 h-8" style={{ color: accentColor }} />
                </div>
                <h3 className="text-2xl font-bold mb-4 tracking-tight">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── SCALE ────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-4xl md:text-7xl font-black mb-8 italic tracking-tighter uppercase leading-none text-white">
              {scaleHeadPl}<br />{scaleHeadMid}<br />
              <span style={{ color: accentColor }}>{scaleHeadAcc}</span>
            </h2>
            <p className="text-slate-400 text-lg mb-8 leading-relaxed font-light">{scaleBody}</p>
            <div className="space-y-4 mt-8">
              {scaleItems.map((item, idx) => {
                const Icon = ICON_MAP[item.icon] ?? Zap;
                return (
                  <div key={idx} className="flex items-center gap-4 p-5 rounded-2xl bg-slate-900/50 border border-white/5 transition-all"
                    onMouseEnter={e => (e.currentTarget.style.background = `${accentColor}14`)}
                    onMouseLeave={e => (e.currentTarget.style.background = 'rgba(15,23,42,0.5)')}>
                    <Icon className="w-5 h-5" style={{ color: accentColor }} />
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-200">{item.text}</span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="relative group">
            <div className="absolute -inset-10 rounded-full animate-pulse pointer-events-none"
              style={{ background: `${accentColor}0d`, filter: 'blur(120px)' }} />
            <div className="relative border rounded-[3rem] p-8 md:p-12 shadow-2xl font-mono"
              style={{ background: '#020817', borderColor: `${accentColor}33` }}>
              <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4">
                <div className="flex items-center gap-2 font-black italic text-[10px]" style={{ color: accentColor }}>
                  <Cpu className="w-4 h-4" /> {coreLabel}
                </div>
                <div className="text-[10px] text-slate-500">{soloMode}</div>
              </div>
              <div className="space-y-6 text-xs">
                <div className="p-4 rounded-xl border" style={{ background: `${accentColor}0d`, borderColor: `${accentColor}33` }}>
                  <p className="font-black mb-2 uppercase tracking-tighter italic text-[10px]" style={{ color: accentColor }}>Personal Brand Analysis:</p>
                  <p className="text-white text-[11px]">"{analysisMsg}"</p>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex justify-between text-slate-500 mb-2 font-bold uppercase text-[10px]">
                    <span>{saasLabel}</span>
                    <span style={{ color: accentColor }}>Processing</span>
                  </div>
                  <div className="h-1 w-full bg-slate-800 rounded">
                    <div className="h-full w-[78%] rounded" style={{ background: accentColor }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto border rounded-[4rem] p-12 md:p-24 text-center backdrop-blur-3xl relative overflow-hidden shadow-3xl"
          style={{ background: `linear-gradient(to bottom right, #3b0764, #000)`, borderColor: `${accentColor}4d`, boxShadow: `0 0 80px ${accentColor}1a` }}>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-8xl font-black mb-8 italic tracking-tighter uppercase leading-tight">{ctaHeadline}</h2>
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