'use client';

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import {
  Zap,
  Wallet,
  Briefcase,
  Search,
  ShieldCheck,
  Scale,
  ArrowRight,
  Globe,
  Cpu,
  Star,
} from 'lucide-react';
import { usePageContent } from '@/hooks/usePageContent';

function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

interface FeatureCard  { title: string; desc: string; icon: string }
interface TrustItem    { icon: string; text: string }
interface StatItem     { label: string; val: string; desc: string }

const ICON_MAP: Record<string, React.ElementType> = {
  Search, Wallet, ShieldCheck, Scale, Briefcase, Zap, Globe, Cpu, Star,
};

const DEFAULT_FEATURES = JSON.stringify([
  { title: 'Neural Matchmaking',  desc: 'Deep learning models that analyze codebases and design portfolios to match freelancers with projects where success is statistically certain.', icon: 'Search'  },
  { title: 'Autonomous Escrow',   desc: 'AI agents that verify project milestones and auto-release payments, reducing dispute resolution time by 90%.',                               icon: 'Wallet'  },
  { title: 'Quality Sentinels',   desc: 'Persistent agents that scan deliverables for plagiarism, AI-generated low-effort content, and security vulnerabilities.',                   icon: 'ShieldCheck' },
]);

const DEFAULT_TRUST_ITEMS = JSON.stringify([
  { icon: 'Scale',     text: 'AI-Mediated Dispute Resolution'    },
  { icon: 'Briefcase', text: 'Automated Tax & Compliance Filings' },
  { icon: 'Star',      text: 'Reputation Scoring via Output Analysis' },
]);

const DEFAULT_STATS = JSON.stringify([
  { label: 'Payment Latency',  val: '-98%',   desc: 'Near-instant release'   },
  { label: 'Dispute Rate',     val: '<0.4%',  desc: 'Platform average'       },
  { label: 'Matching Speed',   val: '3.2s',   desc: 'Mean time to match'     },
  { label: 'Global Coverage',  val: '140+',   desc: 'Countries supported'    },
]);

export default function FreelancerPlatformPage() {
  const { get } = usePageContent('home-freelancer-platform');

  // ── Hero ─────────────────────────────────────────────────────────────────
  const accentColor      = get('hero', 'accent_color',      '#84cc16');
  const badgeText        = get('hero', 'badge_text',        'Decentralized Talent Infrastructure');
  const heroPl           = get('hero', 'headline_plain',    'Frictionless');
  const heroAcc          = get('hero', 'headline_accent',   'Capital');
  const heroBody         = get('hero', 'body_text',         'We build the AI plumbing for the modern gig economy. From Smart-Contract Escrows to Neural Project Matching, we turn fragmented marketplaces into autonomous ecosystems of high-value work.');
  const heroBtnPrimary   = get('hero', 'btn_primary_label', 'Scale Your Marketplace');
  const heroBtnSecond    = get('hero', 'btn_secondary_label','Developer API');

  // ── Features ─────────────────────────────────────────────────────────────
  const featuresPl       = get('features', 'headline_plain',  '');
  const featuresAcc      = get('features', 'headline_accent', '');
  const featureItems     = safeParse<FeatureCard[]>(get('features', 'items_json', DEFAULT_FEATURES), []);

  // ── Trust Section ─────────────────────────────────────────────────────────
  const trustHeadPl      = get('trust', 'headline_plain',  'Trust is');
  const trustHeadAcc     = get('trust', 'headline_accent', 'Algorithmic.');
  const trustBody        = get('trust', 'body_text',       'By integrating Proof-of-Work AI Validators, we eliminate the need for manual project management. The platform itself becomes the arbiter of quality.');
  const trustItems       = safeParse<TrustItem[]>(get('trust', 'items_json', DEFAULT_TRUST_ITEMS), []);
  const engineLabel      = get('trust', 'engine_label',    'MARKET_ENGINE_v8');
  const engineTps        = get('trust', 'engine_tps',      'TPS: 1,200+');
  const engineMsg        = get('trust', 'engine_message',  'Found 3 Developers in EU with Expertise in Rust-Lang & Neural-Search. Success Probability: 98.2%.');
  const escrowStatus     = get('trust', 'escrow_status',   'Locked');

  // ── Stats ─────────────────────────────────────────────────────────────────
  const statItems        = safeParse<StatItem[]>(get('stats', 'items_json', DEFAULT_STATS), []);

  // ── CTA ───────────────────────────────────────────────────────────────────
  const ctaHeadline      = get('cta', 'headline',          'The Future is Independent.');
  const ctaBody          = get('cta', 'body_text',         'Build the infrastructure for the next billion digital nomads. Our marketplace architects are ready to deploy.');
  const ctaBtnLabel      = get('cta', 'btn_label',         'Launch Platform Hub');
  const ctaFootnote      = get('cta', 'footnote',          'Marketplace Node // DLF Cyber City');

  return (
    <main className="min-h-screen bg-[#020617] text-slate-100 overflow-x-hidden selection:bg-lime-500/30">
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-16 md:pt-52 md:pb-32 px-6">
        <div className="absolute inset-0 -z-10"
          style={{ background: `radial-gradient(circle at 50% 40%, ${accentColor}1a 0%, transparent 60%)` }} />
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full mb-8 backdrop-blur-xl"
            style={{ background: `${accentColor}1a`, border: `1px solid ${accentColor}33` }}>
            <Globe className="w-3.5 h-3.5" style={{ color: accentColor }} />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]" style={{ color: accentColor }}>{badgeText}</span>
          </div>
          <h1 className="text-6xl md:text-9xl font-black tracking-tighter leading-[0.85] uppercase mb-10">
            {heroPl} <br />
            <span className="text-transparent bg-clip-text italic"
              style={{ backgroundImage: `linear-gradient(to right, ${accentColor}cc, ${accentColor}, #065f46)` }}>
              {heroAcc}
            </span>
          </h1>
          <p className="max-w-3xl text-slate-400 text-base md:text-xl leading-relaxed mb-12 font-light">{heroBody}</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="px-10 py-5 text-black rounded-2xl font-black text-sm uppercase tracking-widest transition-all hover:scale-105 shadow-2xl flex items-center justify-center gap-2"
              style={{ background: accentColor, boxShadow: `0 25px 50px ${accentColor}4d` }}>
              {heroBtnPrimary} <Zap className="w-4 h-4" />
            </button>
            <button className="px-10 py-5 bg-white/5 border border-white/10 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-white/10 transition-all">
              {heroBtnSecond}
            </button>
          </div>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {featureItems.map((item, i) => {
            const Icon = ICON_MAP[item.icon] ?? Zap;
            return (
              <div key={i} className="p-10 rounded-[3rem] bg-slate-900/40 border border-white/5 transition-all group relative overflow-hidden"
                style={{ ['--hover-border' as any]: `${accentColor}66` }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = `${accentColor}66`)}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)')}>
                <div className="mb-8 p-4 rounded-2xl inline-block transition-all group-hover:text-black"
                  style={{ background: `${accentColor}0d` }}
                  onMouseEnter={e => { const p = (e.currentTarget as HTMLElement).parentElement!; p.querySelector<HTMLElement>('.feat-icon-wrap')!.style.background = accentColor; }}>
                  <Icon className="w-8 h-8" style={{ color: accentColor }} />
                </div>
                <h3 className="text-2xl font-bold mb-4 tracking-tight">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── TRUST ────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-4xl md:text-7xl font-black mb-8 italic tracking-tighter uppercase leading-none text-white">
              {trustHeadPl} <br />
              <span className="underline decoration-white/10 underline-offset-8" style={{ color: accentColor }}>{trustHeadAcc}</span>
            </h2>
            <p className="text-slate-400 text-lg mb-8 leading-relaxed font-light">{trustBody}</p>
            <div className="space-y-4 mt-8">
              {trustItems.map((item, idx) => {
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
                  <Cpu className="w-4 h-4" /> {engineLabel}
                </div>
                <div className="text-[10px] text-slate-500">{engineTps}</div>
              </div>
              <div className="space-y-6">
                <div className="p-4 rounded-xl border" style={{ background: `${accentColor}0d`, borderColor: `${accentColor}33` }}>
                  <p className="text-[10px] font-black mb-2 uppercase tracking-tighter italic" style={{ color: accentColor }}>Matching Node Active:</p>
                  <p className="text-[11px] text-white">"{engineMsg}"</p>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex justify-between text-[10px] text-slate-500 mb-2 font-bold uppercase">
                    <span>Escrow Status</span>
                    <span style={{ color: accentColor }}>{escrowStatus}</span>
                  </div>
                  <div className="h-1 w-full bg-slate-800 rounded">
                    <div className="h-full w-[65%] rounded" style={{ background: accentColor, boxShadow: `0 0 10px ${accentColor}80` }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ────────────────────────────────────────────────────── */}
      <section className="py-24 border-y border-white/5" style={{ background: `${accentColor}03` }}>
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {statItems.map((stat, i) => (
            <div key={i}>
              <p className="text-4xl md:text-5xl font-black text-white mb-2">{stat.val}</p>
              <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: accentColor }}>{stat.label}</p>
              <p className="text-[9px] text-slate-500 italic">{stat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto border rounded-[4rem] p-12 md:p-24 text-center backdrop-blur-3xl relative overflow-hidden shadow-3xl"
          style={{ background: `linear-gradient(to bottom right, ${accentColor}14, #000)`, borderColor: `${accentColor}4d`, boxShadow: `0 0 80px ${accentColor}1a` }}>
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