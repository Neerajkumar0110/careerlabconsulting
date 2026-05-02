"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import { Link2, Cpu, Settings, Zap, ShieldCheck, Network, ArrowRight, Database, Share2, Box } from 'lucide-react';
import { usePageContent } from '@/hooks/usePageContent';

function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

const DEFAULT_TOPOLOGY = JSON.stringify([
  { icon: 'Zap',        title: 'Real-time Sync',  desc: 'Bi-directional data flow between SQL/NoSQL and On-chain states.' },
  { icon: 'ShieldCheck',title: 'Secure Auth',      desc: 'OAuth2 and JWT integration for wallet-based enterprise access.' },
  { icon: 'Settings',   title: 'Custom SDKs',      desc: 'Bespoke libraries built in Python, Go, or Node.js for your dev team.' },
]);

const DEFAULT_INTEGRATION_POINTS = JSON.stringify([
  { title: 'Legacy ERP Migration',  desc: 'Connecting SAP, Oracle, and Microsoft Dynamics to private ledgers for real-time supply chain transparency.', icon: 'Database', img: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
  { title: 'Oracle & Data Feeds',   desc: 'Integrating Chainlink and Pyth network nodes to bring off-chain real-world data into your smart contracts.', icon: 'Network',  img: 'https://images.pexels.com/photos/5980860/pexels-photo-5980860.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
]);

const ICON_MAP: Record<string, React.ElementType> = { Zap, ShieldCheck, Settings, Database, Network, Link2, Cpu, Box };

export default function BlockchainIntegrationPage() {
  const { get } = usePageContent('services-blockchain-integration');

  const accentColor      = get('hero', 'accent_color',       '#3b82f6');
  const badgeText        = get('hero', 'badge_text',         'Middleware Architecture');
  const heroPl           = get('hero', 'headline_plain',     'Seamless');
  const heroAcc          = get('hero', 'headline_accent',    'Integration.');
  const heroBody         = get('hero', 'body_text',          'Hum aapke existing business infrastructure ko blockchain protocols se connect karte hain. No data silos, only unified decentralization.');
  const heroBtnLabel     = get('hero', 'btn_label',          'Bridge Your Systems');
  const heroImageUrl     = get('hero', 'hero_image_url',     '');
  const statusText       = get('hero', 'status_text',        'Status: Syncing_Mainnet_Nodes...');

  const topologyLabel    = get('topology', 'section_label',  'Integration Topology');
  const topologyItems    = safeParse<{ icon: string; title: string; desc: string }[]>(get('topology', 'items_json', DEFAULT_TOPOLOGY), []);

  const integPl          = get('integration_points', 'headline_plain',  'Use');
  const integAcc         = get('integration_points', 'headline_accent', 'Cases.');
  const integItems       = safeParse<{ title: string; desc: string; icon: string; img: string }[]>(get('integration_points', 'items_json', DEFAULT_INTEGRATION_POINTS), []);

  const ctaHeadline      = get('cta', 'headline',            'Bridge the Technology Gap.');
  const ctaBody          = get('cta', 'body_text',           'Ready to integrate decentralized power into your existing business logic?');
  const ctaBtnLabel      = get('cta', 'btn_label',           'Get Architecture Brief');

  return (
    <main className="min-h-screen bg-[#020617] text-slate-100 selection:bg-blue-600/30 font-sans">
      <Navbar />

      {/* HERO */}
      <section className="relative pt-32 pb-20 md:pt-52 md:pb-32 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,_rgba(37,99,235,0.1)_0%,_transparent_50%)] -z-10"></div>
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border mb-8 backdrop-blur-xl"
              style={{ background: `${accentColor}1a`, borderColor: `${accentColor}33` }}>
              <Share2 size={14} style={{ color: accentColor }} />
              <span className="text-[10px] font-black uppercase tracking-[0.3em]" style={{ color: accentColor }}>{badgeText}</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85] mb-8">
              {heroPl} <br />
              <span className="italic" style={{ backgroundImage: `linear-gradient(to right, ${accentColor}, #06b6d4)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{heroAcc}</span>
            </h1>
            <p className="max-w-xl text-slate-400 text-lg font-light leading-relaxed mb-10">{heroBody}</p>
            <button onClick={() => window.location.href = '/contact'}
              className="text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center gap-3 transition-all shadow-xl"
              style={{ background: accentColor }}>
              {heroBtnLabel} <ArrowRight size={16} />
            </button>
          </div>

          <div className="lg:w-1/2 relative group">
            <div className="absolute inset-0 blur-[80px] rounded-full" style={{ background: `${accentColor}1a` }}></div>
            <div className="relative p-12 bg-slate-900/40 border border-white/10 rounded-[4rem] backdrop-blur-3xl overflow-hidden">
              <div className="flex justify-between items-center mb-12">
                <div className="p-4 rounded-2xl" style={{ background: accentColor }}><Box className="text-white" /></div>
                <div className="flex-1 h-px mx-4" style={{ background: `linear-gradient(to right, ${accentColor}, transparent)` }}></div>
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10"><Cpu className="text-slate-400" /></div>
              </div>
              <div className="space-y-4">
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full w-1/3 animate-pulse rounded-full" style={{ background: accentColor }}></div>
                </div>
                <div className="h-2 w-2/3 bg-white/5 rounded-full"></div>
                <p className="text-[10px] font-mono text-slate-500 mt-4 uppercase tracking-widest">{statusText}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TOPOLOGY */}
      <section className="py-24 px-6 border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center text-[10px] font-black uppercase tracking-[0.5em] text-slate-500 mb-16 italic">{topologyLabel}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            {topologyItems.map((item, i) => {
              const Icon = ICON_MAP[item.icon] ?? Zap;
              return (
                <div key={i} className="p-8 rounded-3xl bg-slate-900/40 border border-white/5">
                  <Icon className="mx-auto mb-4" style={{ color: accentColor }} />
                  <h4 className="text-xl font-bold uppercase italic">{item.title}</h4>
                  <p className="text-slate-500 text-sm mt-2">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* INTEGRATION POINTS */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-12">
            {integPl} <span className="italic" style={{ color: accentColor }}>{integAcc}</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {integItems.map((point, i) => {
              const Icon = ICON_MAP[point.icon] ?? Database;
              return (
                <div key={i} className="group relative rounded-[3rem] overflow-hidden border border-white/5 hover:border-blue-500/30 transition-all">
                  <img src={point.img} className="absolute inset-0 w-full h-full object-cover opacity-20 grayscale group-hover:scale-110 transition-transform duration-1000" alt={point.title} />
                  <div className="relative p-12 md:p-16 bg-gradient-to-t from-[#020617] via-[#020617]/80 to-transparent">
                    <div className="mb-6" style={{ color: accentColor }}><Icon size={28} /></div>
                    <h3 className="text-2xl font-black uppercase italic mb-4">{point.title}</h3>
                    <p className="text-slate-400 font-light leading-relaxed mb-8">{point.desc}</p>
                    <button className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-colors"
                      style={{ color: accentColor }}>
                      View Implementation <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto p-12 md:p-24 rounded-[4rem] text-center relative overflow-hidden shadow-2xl"
          style={{ background: accentColor }}>
          <div className="absolute top-0 right-0 p-12 opacity-10"><Link2 size={300} /></div>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-7xl font-black italic uppercase tracking-tighter mb-8 leading-none">{ctaHeadline}</h2>
            <p className="text-blue-100 text-lg mb-12 max-w-xl mx-auto font-medium">{ctaBody}</p>
            <button onClick={() => window.location.href = '/contact'}
              className="bg-white text-black px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:scale-105 transition-all">
              {ctaBtnLabel}
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}