// app/services/blockchain-consulting/page.tsx
'use client';

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import { usePageContent } from '@/hooks/usePageContent';
import {
  ShieldCheck, Zap, Layers, Database,
  ArrowRight, Blocks, Link as LinkIcon, Share2,
} from 'lucide-react';

const ICON_MAP: Record<string, React.ElementType> = {
  ShieldCheck, Zap, Layers, Database, Blocks,
};

interface ServiceItem { title: string; desc: string; icon: string }

function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

const DEFAULT_SERVICES: ServiceItem[] = [
  { title: 'Smart Contract Auditing',    desc: 'Formal verification of Solidity and Rust-based contracts to eliminate reentrancy attacks and logic flaws.',  icon: 'ShieldCheck' },
  { title: 'DeFi Ecosystem Design',      desc: 'Architecting liquidity protocols, automated market makers (AMMs), and yield-optimization engines.',          icon: 'Zap'         },
  { title: 'Enterprise DLT Integration', desc: 'Deploying Hyperledger and Corda for private, permissioned supply chain and financial settlement layers.',    icon: 'Layers'      },
  { title: 'Tokenomics Engineering',     desc: 'Mathematical modeling of token velocity, inflation schedules, and incentive structures for long-term TVL.',  icon: 'Database'    },
];

export default function BlockchainConsultingPage() {
  const { get } = usePageContent('services-blockchain-consulting');

  const badgeText    = get('hero', 'badge_text',      'Web3 Infrastructure Node');
  const heroPl       = get('hero', 'headline_plain',  'Blockchain');
  const heroAcc      = get('hero', 'headline_accent', 'Consulting.');
  const heroBody     = get('hero', 'body_text',       'We bridge the gap between legacy enterprise systems and decentralized protocols. From Layer-2 scaling to zero-knowledge proofs, we architect the trustless future.');
  const heroBtnLbl   = get('hero', 'btn_label',       'Inquire Technical Audit');
  const heroImageUrl = get('hero', 'hero_image_url',  'https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2');
  const accentColor  = get('hero', 'accent_color',     '#3b82f6');
  const accentSec    = get('hero', 'accent_secondary', '#6366f1');

  const protocols    = safeParse<string[]>(get('protocols', 'protocols_json', '[]'), ['ETHEREUM','SOLANA','POLYGON','AVALANCHE','HYPERLEDGER']);
  const services     = safeParse<ServiceItem[]>(get('services', 'items_json', '[]'), DEFAULT_SERVICES);

  const ctaHeadline  = get('cta', 'headline',     'Ready to Decentralize?');
  const ctaBody      = get('cta', 'body_text',    'Schedule a technical discovery session to analyze your chain requirements.');
  const ctaBtnPrim   = get('cta', 'btn_primary',  'Book Audit');
  const ctaBtnSec    = get('cta', 'btn_secondary','Download PDF Portfolio');

  return (
    <main className="min-h-screen bg-[#020617] text-slate-100 selection:bg-blue-600/30 font-sans">
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 md:pt-52 md:pb-32 px-6">
        <div className="absolute inset-0 opacity-10 -z-10"
          style={{ backgroundImage: 'url(https://www.transparenttextures.com/patterns/carbon-fibre.png)' }} />
        <div className="absolute inset-0 -z-10"
          style={{ background: `radial-gradient(circle at 50% 30%, ${accentColor}1a 0%, transparent 70%)` }} />
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border mb-8"
              style={{ background: `${accentColor}1a`, borderColor: `${accentColor}33` }}>
              <Blocks size={14} style={{ color: accentColor }} />
              <span className="text-[10px] font-black uppercase tracking-[0.3em]" style={{ color: `${accentColor}cc` }}>{badgeText}</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85] mb-8">
              {heroPl} <br />
              <span className="italic" style={{
                backgroundImage: `linear-gradient(to right, ${accentColor}, ${accentSec})`,
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>{heroAcc}</span>
            </h1>
            <p className="max-w-xl text-slate-400 text-lg font-light leading-relaxed mb-10">{heroBody}</p>
            <button className="px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center gap-3 transition-all shadow-xl"
              style={{ background: accentColor, boxShadow: `0 20px 40px ${accentColor}33`, color: '#fff' }}>
              {heroBtnLbl} <ArrowRight size={16} />
            </button>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 rounded-full animate-pulse" style={{ background: `${accentColor}1a`, filter: 'blur(40px)' }} />
            <img src={heroImageUrl}
              className="relative rounded-[3rem] border border-white/10 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-1000 shadow-2xl"
              alt="Blockchain Network" />
          </div>
        </div>
      </section>

      {/* ── PROTOCOLS ────────────────────────────────────────────────── */}
      <section className="py-24 px-6 border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center text-[10px] font-black uppercase tracking-[0.5em] text-slate-500 mb-16 italic">Core Protocol Expertise</h2>
          <div className="flex flex-wrap justify-center gap-12 md:gap-24 opacity-40 grayscale contrast-125">
            {protocols.map((p, i) => (
              <span key={i} className="text-2xl font-black tracking-tighter italic">{p}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ─────────────────────────────────────────────────── */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service, i) => {
              const Icon = ICON_MAP[service.icon] ?? Zap;
              return (
                <div key={i} className="group p-10 rounded-[2.5rem] bg-slate-900/40 border border-white/5 transition-all relative overflow-hidden"
                  onMouseEnter={e => (e.currentTarget.style.borderColor = `${accentColor}4d`)}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)')}>
                  <div className="p-4 bg-white/5 rounded-2xl w-fit mb-8 transition-all"
                    style={{ color: accentColor }}>
                    <Icon size={32} />
                  </div>
                  <h3 className="text-2xl font-black uppercase italic mb-4 tracking-tight">{service.title}</h3>
                  <p className="text-slate-500 leading-relaxed font-light group-hover:text-slate-300 transition-colors">{service.desc}</p>
                  <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                    <LinkIcon size={120} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────── */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto p-12 md:p-20 rounded-[4rem] border relative overflow-hidden"
          style={{ background: `linear-gradient(to bottom right, ${accentColor}33, transparent)`, borderColor: `${accentColor}33` }}>
          <div className="relative z-10">
            <h3 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter mb-8">{ctaHeadline}</h3>
            <p className="text-slate-400 mb-10 max-w-md">{ctaBody}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-white text-black px-8 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-all">{ctaBtnPrim}</button>
              <button className="bg-white/5 border border-white/10 text-white px-8 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-white hover:text-black transition-all">{ctaBtnSec}</button>
            </div>
          </div>
          <div className="absolute -bottom-20 -right-20 opacity-10">
            <Share2 size={300} style={{ color: accentColor }} />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}