// app/internx/blockchain/page.tsx
'use client';

import React from 'react';
import { Box, ArrowRight, Layers, Lock, Globe, Database, Zap } from 'lucide-react';
import B2CHeader from '@/components/b2c/B2CHeader';
import Footer from '@/components/b2c/Footer';
import { usePageContent } from '@/hooks/usePageContent';

// ── Icon map ──────────────────────────────────────────────────────────────────
const ICON_MAP: Record<string, React.ElementType> = { Layers, Lock, Globe, Database, Zap, Box };

// ── Helpers ───────────────────────────────────────────────────────────────────
function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

// ── Types ─────────────────────────────────────────────────────────────────────
interface LargeCard { id: number; icon: string; title_plain: string; title_accent: string; description: string; number: string; col_span: number; accent?: boolean }
interface MiniCard  { id: number; icon: string; title: string; description: string }

// ── Defaults ──────────────────────────────────────────────────────────────────
const DEFAULT_LARGE_CARDS = JSON.stringify([
  { id: 1, icon: 'Layers', title_plain: 'Smart Ledger',  title_accent: 'Architecture', description: 'Optimized for high-throughput and low-latency global transactions.', number: '01', col_span: 2 },
  { id: 2, icon: 'Zap',    title_plain: 'Real-time',     title_accent: 'Consensus',    description: '', number: '02', col_span: 1, accent: true },
]);
const DEFAULT_MINI_CARDS = JSON.stringify([
  { id: 1, icon: 'Lock',     title: 'Immutable', description: 'Cryptographic security that guarantees data remains unchanged forever.' },
  { id: 2, icon: 'Database', title: 'Nodes',     description: 'Distributed network nodes ensuring 100% uptime and global reach.' },
  { id: 3, icon: 'Globe',    title: 'Protocol',  description: 'Open-source protocols built for cross-chain interoperability.' },
]);

export default function InternXBlockchainPage() {
  const { get } = usePageContent('internx-blockchain');

  // ── CMS values ──────────────────────────────────────────────────────────
  const accentColor    = get('hero', 'accent_color',        '#2563eb');
  const badgeText      = get('hero', 'badge_text',          'Mainnet v4.0 Active');
  const badgeDotColor  = get('hero', 'badge_dot_color',     '#3b82f6');
  const headlinePlain  = get('hero', 'headline_plain',      'DECENTRALIZED');
  const headlineAccent = get('hero', 'headline_accent',     'FUTURE');
  const bodyText       = get('hero', 'body_text',           'Building the infrastructure for the next generation of the web. Secure, scalable, and fully transparent blockchain solutions.');
  const btnPrimary     = get('hero', 'btn_primary_label',   'Explore Network');
  const btnSecondary   = get('hero', 'btn_secondary_label', 'Documentation');

  const largeCards = safeParse<LargeCard[]>(get('features', 'large_cards_json', DEFAULT_LARGE_CARDS), []);
  const miniCards  = safeParse<MiniCard[]>(get('features', 'mini_cards_json',  DEFAULT_MINI_CARDS),  []);

  const ctaHeadline = get('cta', 'headline',  'Ready to build?');
  const ctaBody     = get('cta', 'body_text', 'Join thousands of developers building the next generation of dApps on InternX-Blockchain.');
  const ctaBtn      = get('cta', 'btn_label', 'Start Development');

  return (
    <main className="min-h-screen bg-[#000000] text-white selection:bg-blue-500/30">
      <B2CHeader />

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative pt-40 pb-24 px-6 overflow-hidden">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none"
          style={{ background: `radial-gradient(circle at center, ${accentColor}33, transparent 70%)` }}
        />
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 mb-8 rounded-full backdrop-blur-md"
            style={{ border: `1px solid ${accentColor}33`, background: `${accentColor}0d` }}
          >
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: badgeDotColor }} />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: badgeDotColor }}>{badgeText}</span>
          </div>

          <h1 className="text-4xl md:text-9xl font-black tracking-tighter leading-none mb-8">
            {headlinePlain}<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 italic">{headlineAccent}</span>
          </h1>

          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-medium">{bodyText}</p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              className="px-12 py-5 text-white rounded-2xl font-black uppercase tracking-widest transition-all flex items-center justify-center gap-3"
              style={{ background: accentColor }}
            >
              {btnPrimary} <ArrowRight className="w-5 h-5" />
            </button>
            <button className="px-12 py-5 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-2xl font-black uppercase tracking-widest transition-all">
              {btnSecondary}
            </button>
          </div>
        </div>
      </section>

      {/* ── FEATURES ──────────────────────────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Large cards */}
            {largeCards.map(card => {
              const Icon = ICON_MAP[card.icon] ?? Box;
              return card.accent ? (
                <div
                  key={card.id}
                  className="p-12 rounded-[3rem] flex flex-col justify-between h-[400px]"
                  style={{ background: accentColor, boxShadow: `0 20px 50px ${accentColor}33` }}
                >
                  <Icon className="w-12 h-12 text-white fill-current" />
                  <div>
                    <h3 className="text-3xl font-black text-white uppercase italic leading-none mb-4">
                      {card.title_plain}<br />{card.title_accent}
                    </h3>
                    <div className="h-1.5 w-16 bg-white/40 rounded-full" />
                  </div>
                </div>
              ) : (
                <div
                  key={card.id}
                  className={`md:col-span-${card.col_span} p-12 bg-gradient-to-br from-[#0a0a0a] to-[#050505] border border-white/5 rounded-[3rem] flex flex-col justify-between h-[400px] group transition-all`}
                  style={{ ['--hover-border' as string]: `${accentColor}4d` }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = `${accentColor}4d`)}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)')}
                >
                  <div className="flex justify-between items-start">
                    <div className="p-4 rounded-2xl" style={{ background: `${accentColor}1a` }}>
                      <Icon className="w-8 h-8" style={{ color: accentColor }} />
                    </div>
                    <span className="text-4xl font-black text-white/10 uppercase">{card.number}</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-black mb-4 uppercase italic leading-none">
                      {card.title_plain}<br />{card.title_accent}
                    </h3>
                    <p className="text-slate-500 max-w-sm">{card.description}</p>
                  </div>
                </div>
              );
            })}

            {/* Mini cards */}
            {miniCards.map(card => {
              const Icon = ICON_MAP[card.icon] ?? Box;
              return (
                <div
                  key={card.id}
                  className="p-10 bg-[#080808] border border-white/5 rounded-[3rem] transition-colors cursor-default"
                  onMouseEnter={e => (e.currentTarget.style.background = `${accentColor}1a`)}
                  onMouseLeave={e => (e.currentTarget.style.background = '#080808')}
                >
                  <Icon className="w-10 h-10 mb-6" style={{ color: accentColor }} />
                  <h4 className="text-xl font-black uppercase mb-3">{card.title}</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">{card.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-[#030303]">
        <div className="max-w-5xl mx-auto border border-white/10 rounded-[4rem] p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" style={{ background: `${accentColor}0d` }} />
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8 italic">{ctaHeadline}</h2>
          <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto">{ctaBody}</p>
          <button
            className="px-12 py-5 text-white rounded-full font-black uppercase tracking-widest hover:scale-105 transition-transform"
            style={{ background: accentColor }}
          >
            {ctaBtn}
          </button>
        </div>
      </section>

      <Footer />
    </main>
  );
}