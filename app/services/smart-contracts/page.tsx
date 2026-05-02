"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import { Code2, Cpu, ShieldCheck, Zap, ArrowRight, Activity, Trophy, Layers, Terminal } from 'lucide-react';
import { usePageContent } from '@/hooks/usePageContent';

function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

const DEFAULT_STATS = JSON.stringify([
  { label: 'Lines of Code Audited',  value: '2.5M+' },
  { label: 'Protocol TVL Secured',   value: '$450M+' },
  { label: 'Mainnet Deployments',    value: '120+' },
  { label: 'Gas Efficiency Gain',    value: '35%' },
]);

const DEFAULT_CAPABILITIES = JSON.stringify([
  { title: 'Solidity & Rust Engineering',  desc: 'High-performance contract development for EVM-based chains and Solana\'s high-throughput architecture.', icon: 'Code2',    img: 'https://images.pexels.com/photos/1089438/pexels-photo-1089438.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
  { title: 'Automated Liquidity Logic',    desc: 'Architecting AMMs, flash loan execution, and sophisticated yield-farming strategies.',                     icon: 'Activity', img: 'https://images.pexels.com/photos/6770610/pexels-photo-6770610.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
]);

const DEFAULT_STACK = JSON.stringify(['ETH', 'SOL', 'Polygon', 'AVAX', 'FOUNDRY', 'HARDHAT']);

const ICON_MAP: Record<string, React.ElementType> = { Code2, Activity, ShieldCheck, Zap, Terminal, Trophy, Layers, Cpu };

export default function SmartContractsPage() {
  const { get } = usePageContent('services-smart-contracts');

  const accentColor    = get('hero', 'accent_color',       '#3b82f6');
  const badgeText      = get('hero', 'badge_text',         'Execution Layer v2.0');
  const heroPl         = get('hero', 'headline_plain',     'Code is Law.');
  const heroAcc        = get('hero', 'headline_accent',    'Smart Contracts.');
  const heroBody       = get('hero', 'body_text',          'Industrial-grade smart contract architecture for the decentralized economy. We build immutable, gas-optimized, and secure logic that powers global DeFi and RWA protocols.');
  const heroBtnLabel   = get('hero', 'btn_label',          'Start Deployment');
  const heroBtn2Label  = get('hero', 'btn2_label',         'View GitHub');
  const heroImageUrl   = get('hero', 'hero_image_url',     'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2');
  const securityBadge  = get('hero', 'security_badge',     'MIL-SPEC');

  const stats          = safeParse<{ label: string; value: string }[]>(get('stats', 'items_json', DEFAULT_STATS), []);

  const expPl          = get('expertise', 'headline_plain',  'Engineered for');
  const expAcc         = get('expertise', 'headline_accent', 'Unstoppable Logic.');
  const capabilities   = safeParse<{ title: string; desc: string; icon: string; img: string }[]>(get('expertise', 'items_json', DEFAULT_CAPABILITIES), []);

  const stackLabel     = get('stack', 'section_label',   'Production Stack');
  const stackItems     = safeParse<string[]>(get('stack', 'items_json', DEFAULT_STACK), []);

  const ctaHeadline    = get('cta', 'headline',           'Ready to Build the Future?');
  const ctaBody        = get('cta', 'body_text',          'Our architects are ready to transform your whitepaper into immutable production-grade code.');
  const ctaBtnLabel    = get('cta', 'btn_label',          'Book Architecture Call');

  return (
    <main className="min-h-screen bg-[#020617] text-slate-100 selection:bg-blue-600/30 font-sans">
      <Navbar />

      {/* HERO */}
      <section className="relative pt-32 pb-16 md:pt-52 md:pb-32 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(37,99,235,0.12)_0%,_transparent_70%)] -z-10"></div>
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div className="w-full lg:w-3/5 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-8 backdrop-blur-md"
              style={{ background: `${accentColor}1a`, borderColor: `${accentColor}33` }}>
              <Terminal size={14} style={{ color: accentColor }} />
              <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: accentColor }}>{badgeText}</span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter uppercase leading-[0.9] mb-8">
              {heroPl} <br />
              <span className="italic" style={{ backgroundImage: `linear-gradient(to right, ${accentColor}, #818cf8, ${accentColor})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{heroAcc}</span>
            </h1>
            <p className="max-w-2xl mx-auto lg:mx-0 text-slate-400 text-lg md:text-xl font-light leading-relaxed mb-10">{heroBody}</p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button onClick={() => window.location.href = '/contact'}
                className="w-full sm:w-auto text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all hover:scale-105"
                style={{ background: accentColor }}>
                {heroBtnLabel} <ArrowRight size={16} />
              </button>
              <button className="w-full sm:w-auto bg-white/5 border border-white/10 hover:bg-white/10 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all">
                {heroBtn2Label}
              </button>
            </div>
          </div>
          <div className="w-full lg:w-2/5 relative">
            <div className="relative z-10 rounded-[3rem] border border-white/10 bg-slate-900/50 backdrop-blur-2xl p-2 shadow-2xl">
              <img src={heroImageUrl} alt="Smart Contracts" className="rounded-[2.5rem] grayscale hover:grayscale-0 transition-all duration-700 object-cover h-[400px] w-full" />
              <div className="absolute -bottom-6 -right-6 md:-right-12 p-6 md:p-8 rounded-[2rem] shadow-xl" style={{ background: accentColor }}>
                <ShieldCheck size={40} className="text-white mb-2" />
                <p className="text-[10px] font-black uppercase tracking-widest opacity-80">Security Grade</p>
                <p className="text-2xl font-black italic">{securityBadge}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto bg-white/[0.02] border border-white/5 rounded-[2.5rem] md:rounded-full p-8 md:px-16 md:py-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-4 text-center">
            {stats.map((stat, i) => (
              <div key={i} className="space-y-1">
                <h4 className="text-3xl md:text-4xl font-black tracking-tighter italic" style={{ color: accentColor }}>{stat.value}</h4>
                <p className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-slate-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERTISE */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
            <div className="max-w-xl">
              <h2 className="text-xs font-black uppercase tracking-[0.4em] mb-4" style={{ color: accentColor }}>Our Expertise</h2>
              <h3 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter">
                {expPl} <br /> <span className="text-slate-500">{expAcc}</span>
              </h3>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {capabilities.map((cap, i) => {
              const Icon = ICON_MAP[cap.icon] ?? Code2;
              return (
                <div key={i} className="group relative overflow-hidden rounded-[3rem] border border-white/5 bg-slate-900/40 hover:border-blue-500/30 transition-all duration-500">
                  <div className="aspect-video overflow-hidden">
                    <img src={cap.img} alt={cap.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 opacity-50" />
                  </div>
                  <div className="p-8 md:p-12">
                    <div className="mb-6" style={{ color: accentColor }}><Icon size={24} /></div>
                    <h4 className="text-2xl font-black uppercase italic mb-4">{cap.title}</h4>
                    <p className="text-slate-400 font-light leading-relaxed mb-6">{cap.desc}</p>
                    <div className="h-px w-full mb-6" style={{ background: `linear-gradient(to right, ${accentColor}80, transparent)` }}></div>
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Available for Mainnet</span>
                      <ArrowRight style={{ color: accentColor }} className="group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* STACK */}
      <section className="py-24 px-6 bg-blue-600/5 border-y border-white/5">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-xs font-black text-slate-500 uppercase tracking-[0.5em] mb-12">{stackLabel}</h2>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 items-center opacity-40">
            {stackItems.map((item, i) => (
              <span key={i} className="text-xl font-black italic tracking-tighter text-slate-300">{item}</span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto border rounded-[4rem] p-12 md:p-24 text-center relative overflow-hidden"
          style={{ background: `linear-gradient(to bottom right, ${accentColor}33, rgba(15,23,42,0.5), #020617)`, borderColor: `${accentColor}33` }}>
          <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full blur-[100px]" style={{ background: `${accentColor}33` }}></div>
          <div className="relative z-10">
            <Trophy size={48} className="mx-auto mb-8" style={{ color: accentColor }} />
            <h2 className="text-4xl md:text-7xl font-black italic uppercase tracking-tighter mb-8 leading-none">{ctaHeadline}</h2>
            <p className="max-w-lg mx-auto text-slate-400 text-lg mb-12">{ctaBody}</p>
            <button onClick={() => window.location.href = '/contact'}
              className="bg-white text-black px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:scale-105 transition-all shadow-2xl">
              {ctaBtnLabel}
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}