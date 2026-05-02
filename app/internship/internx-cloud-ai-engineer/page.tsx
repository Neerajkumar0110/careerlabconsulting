'use client';

import React from 'react';
import B2CHeader from '@/components/b2c/B2CHeader';
import Footer from '@/components/b2c/Footer';
import {
  Cloud, Infinity, Terminal, Layers, ShieldCheck, Cpu, ArrowRight,
  Server, Globe, Box, Command,
} from 'lucide-react';
import { usePageContent } from '@/hooks/usePageContent';

// ── Helpers ───────────────────────────────────────────────────────────────────
function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

// ── Types ─────────────────────────────────────────────────────────────────────
interface BentoCard  { icon: string; title: string; desc: string; accent?: boolean }
interface FeatureCard { icon: string; title: string; desc: string }

// ── Icon map ──────────────────────────────────────────────────────────────────
const ICON_MAP: Record<string, React.ElementType> = {
  Cloud, Infinity, Terminal, Layers, ShieldCheck, Cpu, ArrowRight, Server, Globe, Box, Command,
};

// ── Defaults ──────────────────────────────────────────────────────────────────
const DEFAULT_BENTO_CARDS = JSON.stringify([
  { icon: 'Server',   title: 'Scalable Neural Clusters', desc: 'Dynamic resource allocation powered by AI-driven predictive analytics.', accent: false },
  { icon: 'Layers',   title: 'Hybrid Delivery',          desc: 'Global Edge Nodes',                                                       accent: true  },
]);
const DEFAULT_FEATURE_CARDS = JSON.stringify([
  { icon: 'Terminal',   title: 'Infrastructure as Code', desc: 'Automate stacks with Terraform & Ansible for rapid scaling.' },
  { icon: 'ShieldCheck',title: 'DevSecOps',              desc: 'Integrated security scanning at every stage of the CI/CD pipeline.' },
  { icon: 'Infinity',   title: 'Continuous Delivery',    desc: 'Zero-downtime deployment protocols for non-stop availability.' },
]);

export default function InternXCloudDevOps() {
  const { get } = usePageContent('internx-cloud-devops');

  // ── Hero ──────────────────────────────────────────────────────────────────
  const accentColor       = get('hero', 'accent_color',       '#3b82f6');
  const badgeLabel        = get('hero', 'badge_label',         'Cloud Infrastructure v3.0');
  const heroPlain         = get('hero', 'headline_plain',      'Cloud');
  const heroAccent        = get('hero', 'headline_accent',     'Efficiency');
  const heroBody          = get('hero', 'body_text',           'Master the engine of modern business. We provide high-performance automated pipelines and decentralized cloud fabric for the AI era.');
  const primaryBtnLabel   = get('hero', 'primary_btn_label',   'Provision');
  const secondaryBtnLabel = get('hero', 'secondary_btn_label', 'Tech Stack');

  // ── Bento ─────────────────────────────────────────────────────────────────
  const bentoCards        = safeParse<BentoCard[]>(get('bento', 'cards_json', DEFAULT_BENTO_CARDS), []);
  const bentoStatusLabel  = get('bento', 'status_label', 'System.status: Optimized');

  // ── Features ──────────────────────────────────────────────────────────────
  const featureCards      = safeParse<FeatureCard[]>(get('features', 'cards_json', DEFAULT_FEATURE_CARDS), []);

  // ── CTA ───────────────────────────────────────────────────────────────────
  const ctaHeadline       = get('cta', 'headline',         'Ready to build the future?');
  const ctaBody           = get('cta', 'body_text',        'Join the most advanced Cloud & DevOps ecosystem in the world.');
  const ctaBtnLabel       = get('cta', 'btn_label',        'Start Deployment Now');

  const mainCard = bentoCards[0];
  const accentCard = bentoCards[1];

  return (
    <main className="min-h-screen bg-[#000000] text-white selection:bg-blue-600/30 overflow-x-hidden">
      <B2CHeader />

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 md:pt-52 md:pb-32 px-4 md:px-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[500px] rounded-full pointer-events-none"
          style={{ background: `${accentColor}1a`, filter: 'blur(150px)' }} />
        <div className="max-w-7xl mx-auto relative z-10 text-center lg:text-left flex flex-col lg:flex-row items-center justify-between gap-16">
          <div className="w-full lg:w-[60%] space-y-8">
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-2xl">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: accentColor }} />
                <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: accentColor }} />
              </span>
              <span className="text-[10px] font-black uppercase tracking-[0.25em]" style={{ color: accentColor }}>{badgeLabel}</span>
            </div>
            <h1 className="text-5xl md:text-8xl lg:text-9xl font-black leading-[0.85] uppercase">
              {heroPlain} <br />
              <span className="italic" style={{ backgroundImage: `linear-gradient(to right, ${accentColor}, #bfdbfe, #fff)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                {heroAccent}
              </span>
            </h1>
            <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto lg:mx-0 font-medium leading-relaxed">{heroBody}</p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-5 pt-4">
              <button
                className="w-full sm:w-auto px-10 py-5 rounded-2xl font-black uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-3 group"
                style={{ background: '#fff', color: '#000' }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = accentColor; (e.currentTarget as HTMLButtonElement).style.color = '#fff'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = '#fff'; (e.currentTarget as HTMLButtonElement).style.color = '#000'; }}
              >
                {primaryBtnLabel} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="w-full sm:w-auto px-10 py-5 border border-white/10 hover:bg-white/5 text-white rounded-2xl font-black uppercase tracking-widest transition-all">
                {secondaryBtnLabel}
              </button>
            </div>
          </div>
          {/* Abstract Visual */}
          <div className="w-full lg:w-[35%] relative aspect-square hidden md:flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border border-white/5 animate-pulse" style={{ background: `${accentColor}0d` }} />
            <div className="relative p-10 bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[3rem] rotate-3 hover:rotate-0 transition-transform duration-700">
              <Command className="w-32 h-32 opacity-50 mb-4" style={{ color: accentColor }} />
              <div className="h-2 w-20 rounded-full" style={{ background: accentColor }} />
            </div>
            <Box className="absolute bottom-10 left-0 w-16 h-16 text-white/10 animate-bounce" />
          </div>
        </div>
      </section>

      {/* ── BENTO GRID ────────────────────────────────────────────────────── */}
      <section className="py-20 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-8">
            {/* Main Status Card */}
            {mainCard && (() => {
              const Icon = ICON_MAP[mainCard.icon] ?? Server;
              return (
                <div
                  className="md:col-span-8 p-10 md:p-14 bg-gradient-to-br from-[#0a0a0a] to-[#030303] border border-white/5 rounded-[3rem] flex flex-col justify-between group transition-all duration-500 min-h-[400px]"
                  onMouseEnter={e => (e.currentTarget.style.borderColor = `${accentColor}80`)}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)')}
                >
                  <div className="flex justify-between items-start">
                    <div className="p-5 rounded-3xl group-hover:scale-110 transition-transform" style={{ background: `${accentColor}1a` }}>
                      <Icon className="w-10 h-10" style={{ color: accentColor }} />
                    </div>
                    <div className="text-[10px] font-mono px-4 py-2 rounded-full border uppercase tracking-widest" style={{ color: accentColor, background: `${accentColor}1a`, borderColor: `${accentColor}33` }}>
                      {bentoStatusLabel}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-3xl md:text-5xl font-black uppercase italic leading-none">{mainCard.title}</h3>
                    <p className="text-slate-500 max-w-md text-sm md:text-lg">{mainCard.desc}</p>
                  </div>
                </div>
              );
            })()}
            {/* Accent Card */}
            {accentCard && (() => {
              const Icon = ICON_MAP[accentCard.icon] ?? Layers;
              return (
                <div
                  className="md:col-span-4 p-10 rounded-[3rem] flex flex-col justify-between min-h-[400px] hover:scale-[0.98] transition-transform"
                  style={{ background: accentColor, boxShadow: `0 0 50px ${accentColor}33` }}
                >
                  <Icon className="w-12 h-12 text-white" />
                  <div className="space-y-4">
                    <h3 className="text-4xl font-black text-white uppercase italic leading-none">{accentCard.title}</h3>
                    <p className="text-white/70 text-sm font-bold uppercase tracking-widest">{accentCard.desc}</p>
                  </div>
                </div>
              );
            })()}
            {/* Feature triplets */}
            {featureCards.map((item, i) => {
              const Icon = ICON_MAP[item.icon] ?? Terminal;
              return (
                <div key={i} className="md:col-span-4 p-10 bg-[#080808] border border-white/5 rounded-[2.5rem] group transition-all"
                  onMouseEnter={e => (e.currentTarget.style.background = `${accentColor}0d`)}
                  onMouseLeave={e => (e.currentTarget.style.background = '#080808')}
                >
                  <div className="mb-8 p-4 bg-white/5 w-fit rounded-2xl group-hover:text-white transition-all"
                    style={{ color: accentColor }}
                    onMouseEnter={e => (e.currentTarget.style.background = accentColor)}
                    onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.05)')}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-black uppercase mb-4 text-white italic">{item.title}</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto bg-white rounded-[4rem] p-12 md:p-24 text-center text-black relative overflow-hidden">
          <div className="absolute top-0 right-0 p-10 opacity-10">
            <Globe className="w-64 h-64" />
          </div>
          <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter mb-8 leading-none italic">{ctaHeadline}</h2>
          <p className="text-black/60 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-bold">{ctaBody}</p>
          <button
            className="px-14 py-6 text-white rounded-full font-black uppercase tracking-[0.2em] text-xs transition-all active:scale-95 shadow-2xl"
            style={{ background: '#000' }}
            onMouseEnter={e => (e.currentTarget.style.background = accentColor)}
            onMouseLeave={e => (e.currentTarget.style.background = '#000')}
          >
            {ctaBtnLabel}
          </button>
        </div>
      </section>

      <Footer />
    </main>
  );
}