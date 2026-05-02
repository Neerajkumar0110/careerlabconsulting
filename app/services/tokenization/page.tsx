// app/services/tokenization/page.tsx
'use client';

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import { usePageContent } from '@/hooks/usePageContent';
import {
  Coins, Landmark, ShieldCheck, BarChart3, PieChart,
  RefreshCcw, ArrowRight, GanttChartSquare, Scale, Gem,
} from 'lucide-react';

const ICON_MAP: Record<string, React.ElementType> = {
  Scale, GanttChartSquare, Coins, RefreshCcw, Landmark, ShieldCheck, PieChart, BarChart3,
};

interface WhyItem  { t: string; d: string; i: string }
interface FlowStep { title: string; desc: string; icon: string }

function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

const DEFAULT_WHY: WhyItem[] = [
  { t: 'Global Capital Access',  d: 'Reach investors worldwide without geographic boundaries.',             i: 'Landmark'    },
  { t: 'Automated Compliance',   d: 'KYC/AML checks baked directly into the smart contract.',              i: 'ShieldCheck' },
  { t: 'Lower Entry Barriers',   d: 'Fractionalize a $100M building into $100 investment units.',           i: 'PieChart'    },
];
const DEFAULT_FLOW: FlowStep[] = [
  { title: 'Asset Valuation',        desc: 'Legal and financial audit of the underlying physical or digital asset.',         icon: 'Scale'            },
  { title: 'Smart Contract Creation',desc: 'Coding the logic for fractional ownership and automated dividends.',             icon: 'GanttChartSquare' },
  { title: 'Token Issuance',         desc: 'Minting security tokens on compliant protocols (ERC-3643 / ERC-1400).',         icon: 'Coins'            },
  { title: 'Secondary Liquidity',    desc: 'Integration with decentralized exchanges for 24/7 trading.',                    icon: 'RefreshCcw'       },
];

export default function TokenizationPage() {
  const { get } = usePageContent('services-tokenization');

  const badgeText    = get('hero', 'badge_text',     'Asset Liquidity Protocol');
  const heroPl       = get('hero', 'headline_plain', 'Fractional');
  const heroAcc      = get('hero', 'headline_accent','Tokenization.');
  const heroBody     = get('hero', 'body_text',      'Unlock the value of illiquid assets. We convert Real Estate, IP, and Private Equity into compliant, tradeable digital tokens.');
  const heroBtnPrim  = get('hero', 'btn_primary',    'Launch Asset Node');
  const heroBtnSec   = get('hero', 'btn_secondary',  'Download Framework');
  const accentColor  = get('hero', 'accent_color',   '#3b82f6');
  const accentSec    = get('hero', 'accent_secondary','#6366f1');

  const whyHeadline  = get('why', 'headline',        'Why Tokenize?');
  const sideImageUrl = get('why', 'hero_image_url',  'https://images.pexels.com/photos/7567443/pexels-photo-7567443.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2');
  const whyItems     = safeParse<WhyItem[]>(get('why', 'items_json', '[]'), DEFAULT_WHY);
  const trackerLabel = get('why', 'tracker_label',   'Live_Mint_Tracker');
  const trackerAsset = get('why', 'tracker_asset_id','AssetID: RWA-7729 | 67% Fractionalized');

  const flowHeadline = get('workflow', 'headline',   'The Tokenization Workflow');
  const flowSteps    = safeParse<FlowStep[]>(get('workflow', 'flow_json', '[]'), DEFAULT_FLOW);

  const ctaHeadline  = get('cta', 'headline',   'Turn Equity Into Liquidity.');
  const ctaBody      = get('cta', 'body_text',  'Ready to tokenize your portfolio? Our legal and technical team is ready to deploy your asset node.');
  const ctaBtnLbl    = get('cta', 'btn_label',  'Start Valuation');

  return (
    <main className="min-h-screen bg-[#020617] text-slate-100 selection:bg-blue-600/30 font-sans">
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 md:pt-52 md:pb-32 px-6 overflow-hidden">
        <div className="absolute inset-0 -z-10"
          style={{ background: `radial-gradient(circle at 50% 30%, ${accentColor}1a 0%, transparent 70%)` }} />
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border mb-8 backdrop-blur-xl"
            style={{ background: `${accentColor}1a`, borderColor: `${accentColor}33` }}>
            <Gem size={14} style={{ color: accentColor }} />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]" style={{ color: `${accentColor}cc` }}>{badgeText}</span>
          </div>
          <h1 className="text-6xl md:text-9xl font-black tracking-tighter leading-[0.8] uppercase mb-10">
            {heroPl} <br />
            <span className="italic" style={{
              backgroundImage: `linear-gradient(to right, ${accentColor}, ${accentSec})`,
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>{heroAcc}</span>
          </h1>
          <p className="max-w-2xl text-slate-400 text-lg md:text-xl font-light leading-relaxed mb-12">{heroBody}</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center gap-3 transition-all"
              style={{ background: accentColor, color: '#fff', boxShadow: `0 20px 40px ${accentColor}33` }}>
              {heroBtnPrim} <ArrowRight size={16} />
            </button>
            <button className="bg-white/5 border border-white/10 hover:bg-white/10 px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all">
              {heroBtnSec}
            </button>
          </div>
        </div>
      </section>

      {/* ── WHY TOKENIZE ─────────────────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="p-8 md:p-16 rounded-[3rem] border"
            style={{ background: `linear-gradient(to bottom right, ${accentColor}33, transparent)`, borderColor: `${accentColor}33` }}>
            <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter mb-8">{whyHeadline}</h2>
            <ul className="space-y-8">
              {whyItems.map((item, idx) => {
                const Icon = ICON_MAP[item.i] ?? BarChart3;
                return (
                  <li key={idx} className="flex gap-6 group">
                    <div className="group-hover:scale-110 transition-transform" style={{ color: accentColor }}>
                      <Icon size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg uppercase italic">{item.t}</h4>
                      <p className="text-slate-500 text-sm leading-relaxed">{item.d}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Image with tracker overlay */}
          <div className="relative aspect-square rounded-[3rem] overflow-hidden border border-white/5 grayscale hover:grayscale-0 transition-all duration-1000">
            <img src={sideImageUrl} alt="Digital Finance" className="w-full h-full object-cover opacity-50" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#020617] to-transparent" />
            <div className="absolute bottom-12 left-12 right-12">
              <div className="p-6 rounded-3xl bg-black/60 backdrop-blur-xl border border-white/10">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: accentColor }}>{trackerLabel}</span>
                  <span className="text-[10px] font-mono" style={{ color: '#10b981' }}>● Active</span>
                </div>
                <div className="space-y-2">
                  <div className="h-1.5 w-full rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
                    <div className="h-full w-2/3 animate-pulse rounded-full" style={{ background: accentColor }} />
                  </div>
                  <p className="text-[10px] text-slate-500 font-mono italic">{trackerAsset}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WORKFLOW ─────────────────────────────────────────────────── */}
      <section className="py-32 px-6 bg-white/[0.01] border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center text-[10px] font-black uppercase tracking-[0.5em] text-slate-500 mb-20 italic">{flowHeadline}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {flowSteps.map((step, i) => {
              const Icon = ICON_MAP[step.icon] ?? Coins;
              return (
                <div key={i} className="relative p-8 rounded-3xl bg-slate-900/40 border border-white/5 transition-all"
                  onMouseEnter={e => (e.currentTarget.style.borderColor = `${accentColor}4d`)}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)')}>
                  <div className="font-mono text-3xl mb-6" style={{ color: accentColor }}>0{i + 1}</div>
                  <div className="mb-6 p-3 rounded-xl w-fit" style={{ background: `${accentColor}1a`, color: accentColor }}>
                    <Icon size={20} />
                  </div>
                  <h3 className="text-xl font-bold uppercase italic mb-3">{step.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────── */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <BarChart3 className="mx-auto mb-8" size={48} style={{ color: accentColor }} />
          <h2 className="text-4xl md:text-7xl font-black uppercase italic tracking-tighter mb-10 leading-none">
            {ctaHeadline.split(' ').slice(0, -1).join(' ')} <span style={{ color: accentColor }}>{ctaHeadline.split(' ').slice(-1)[0]}</span>
          </h2>
          <p className="text-slate-400 mb-12 max-w-lg mx-auto">{ctaBody}</p>
          <button onClick={() => window.location.href = '/contact'}
            className="bg-white text-black px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:scale-105 transition-all"
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = accentColor; (e.currentTarget as HTMLButtonElement).style.color = '#fff'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = '#fff'; (e.currentTarget as HTMLButtonElement).style.color = '#000'; }}>
            {ctaBtnLbl}
          </button>
        </div>
      </section>

      <Footer />
    </main>
  );
}