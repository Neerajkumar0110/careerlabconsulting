'use client';

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import ExecutionFlow from '@/components/sections/ExecutionFlow';
import SuccessStories from '@/components/sections/SuccessStories';
import { usePageContent } from '@/hooks/usePageContent';
import {
  BarChart4, Globe, Search, TrendingUp,
  Zap, Layers, ArrowRight, Radar, Eye,
} from 'lucide-react';

function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

interface FeatureCard { title: string; desc: string; icon: string }
interface StatBadge   { label: string; icon: string }

const FEATURE_ICON_MAP: Record<string, React.ElementType> = {
  Zap, TrendingUp, Search, Globe, Layers, BarChart4, Radar, Eye,
};

export default function RetailMarketIntelligencePage() {
  const { get } = usePageContent('industry-market-intelligence');

  // ── Hero ──────────────────────────────────────────────────────────────────
  const accentColor      = get('hero', 'accent_color',     '#6366f1');
  const accentColorTo    = get('hero', 'accent_color_to',  '#06b6d4');
  const badgeText        = get('hero', 'badge_text',       'Market Intelligence & Pricing Vertical');
  const heroPl           = get('hero', 'headline_plain',   'RETAIL');
  const heroAcc          = get('hero', 'headline_accent',  'OMNISCIENCE');
  const heroBody         = get('hero', 'body_text',        'See the market before it moves. We build AI-driven intelligence layers that monitor competitor pricing, track emerging micro-trends, and automate assortment optimization at a global scale.');
  const heroBtnLabel     = get('hero', 'btn_label',        'Claim Market Share');

  // ── Features ──────────────────────────────────────────────────────────────
  const featuresPl    = get('features', 'headline_plain',  'Intelligence');
  const featuresAcc   = get('features', 'headline_accent', 'Layers');
  const featuresItems = safeParse<FeatureCard[]>(get('features', 'items_json', JSON.stringify([
    { title: 'Dynamic Pricing AI',  desc: 'Algorithms that adjust prices in real-time based on competitor moves, stock levels, and consumer price elasticity.', icon: 'Zap'       },
    { title: 'Trend Forecasting',   desc: 'Using NLP and vision models to scan social media and runways, predicting the next must-have product 6 months early.', icon: 'TrendingUp' },
    { title: 'Competitor Scraping', desc: 'Automated, proxy-protected data pipelines that monitor thousands of global storefronts for assortment changes.',       icon: 'Search'     },
  ])), []);

  // ── Detail ────────────────────────────────────────────────────────────────
  const detailPl    = get('detail', 'headline_plain',  'Signal');
  const detailAcc   = get('detail', 'headline_accent', 'Architecture');
  const detailBody  = get('detail', 'body_text',       'We provide the "Ground Truth" for retail decisions. Our AI models ingest unstructured market signals—from shipping manifests to TikTok sentiment—to give your category managers an unfair advantage in assortment planning.');
  const detailStats = safeParse<StatBadge[]>(get('detail', 'stats_json', JSON.stringify([
    { label: 'Global Heatmaps',         icon: 'Globe'  },
    { label: 'Assortment Gap Analysis', icon: 'Layers' },
  ])), []);

  // ── Metrics panel ─────────────────────────────────────────────────────────
  const metricTitle       = get('metrics', 'panel_title',         'Market_Watch_Core');
  const metricStatus      = get('metrics', 'status_label',        'REAL_TIME');
  const metricElasticity  = get('metrics', 'elasticity_value',    '0.78');
  const metricElasticBar  = get('metrics', 'elasticity_pct',      '78');
  const metricSentiment   = get('metrics', 'sentiment_value',     'BULLISH');
  const metricVelocity    = get('metrics', 'trend_velocity',      '+12.4%');
  const metricAlertText   = get('metrics', 'alert_text',          'ALERT: Competitor B has dropped prices on "Category_X" by 15%. AI recommends price matching for VIP segments only to preserve margins.');

  // ── CTA ───────────────────────────────────────────────────────────────────
  const ctaHeadline  = get('cta', 'headline',       'Outsmart The Competition');
  const ctaBody      = get('cta', 'body_text',      'Our market intelligence engineers at DLF Cyber City are building the radar for the retail world.');
  const ctaBtnLabel  = get('cta', 'btn_label',      'START MARKET AUDIT');
  const ctaLocation  = get('cta', 'location_label', 'Intelligence Hub: Gurugram, India');

  return (
    <main className="flex min-h-screen flex-col bg-[#020617] text-white overflow-x-hidden">
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[120px] -z-10"
          style={{ background: `${accentColor}1a` }} />
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 backdrop-blur-md"
            style={{ background: `${accentColor}1a`, border: `1px solid ${accentColor}33` }}>
            <Radar className="w-4 h-4" style={{ color: accentColor }} />
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: accentColor }}>{badgeText}</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-tight uppercase">
            {heroPl}<br />
            <span className="italic" style={{
              backgroundImage: `linear-gradient(to right, ${accentColor}, ${accentColorTo})`,
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>{heroAcc}</span>
          </h1>
          <p className="max-w-3xl mx-auto text-gray-400 text-lg md:text-xl leading-relaxed mb-12">{heroBody}</p>
          <button className="px-10 py-5 rounded-2xl font-bold transition-all shadow-xl flex items-center justify-center gap-2 text-white mx-auto"
            style={{ background: accentColor, boxShadow: `0 20px 40px ${accentColor}33` }}>
            {heroBtnLabel} <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-black uppercase tracking-tight text-center mb-12">
            {featuresPl} <span className="italic" style={{ color: accentColor }}>{featuresAcc}</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuresItems.map((item, i) => {
              const Icon = FEATURE_ICON_MAP[item.icon] ?? Zap;
              return (
                <div key={i} className="group p-10 rounded-[2.5rem] border border-white/5 transition-all"
                  style={{ background: `${accentColor}08` }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = `${accentColor}4d`)}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)')}>
                  <div className="mb-6 p-4 rounded-2xl inline-block" style={{ background: `${accentColor}1a` }}>
                    <Icon className="w-8 h-8" style={{ color: accentColor }} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                  <p className="text-gray-500 leading-relaxed text-sm">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── DETAIL ───────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-4xl md:text-6xl font-black mb-8 italic tracking-tighter uppercase leading-tight">
              {detailPl}<br />{detailAcc}
            </h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">{detailBody}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              {detailStats.map((stat, i) => {
                const Icon = FEATURE_ICON_MAP[stat.icon] ?? Globe;
                return (
                  <div key={i} className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/5 transition-all"
                    onMouseEnter={e => (e.currentTarget.style.borderColor = `${accentColor}4d`)}
                    onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)')}>
                    <Icon className="shrink-0" style={{ color: accentColor }} />
                    <span className="text-xs font-bold uppercase tracking-widest">{stat.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
          {/* Metrics panel */}
          <div className="relative">
            <div className="absolute -inset-10 rounded-full pointer-events-none"
              style={{ background: `${accentColorTo}0d`, filter: 'blur(100px)' }} />
            <div className="relative border border-white/10 rounded-[3rem] p-10 shadow-2xl overflow-hidden font-mono"
              style={{ background: '#020410' }}>
              <div className="flex justify-between items-center mb-10 pb-6 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4" style={{ color: accentColor }} />
                  <span className="text-[10px] text-gray-500 uppercase tracking-widest">{metricTitle}</span>
                </div>
                <div className="text-[10px] font-bold text-emerald-400">{metricStatus}</div>
              </div>
              <div className="space-y-6">
                <div className="p-5 rounded-2xl bg-white/5 border border-white/5">
                  <p className="text-[10px] text-gray-500 uppercase mb-3">Price Elasticity Index</p>
                  <div className="flex items-center gap-4">
                    <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ background: accentColor, width: `${metricElasticBar}%` }} />
                    </div>
                    <span className="text-xs font-bold" style={{ color: accentColor }}>{metricElasticity}</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl border" style={{ background: `${accentColor}0d`, borderColor: `${accentColor}1a` }}>
                    <p className="text-[8px] text-gray-500 uppercase mb-1">Market Sentiment</p>
                    <p className="text-xl font-bold text-emerald-400">{metricSentiment}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                    <p className="text-[8px] text-gray-500 uppercase mb-1">Trend Velocity</p>
                    <p className="text-xl font-bold">{metricVelocity}</p>
                  </div>
                </div>
              </div>
              <div className="mt-8 p-4 rounded-xl border border-dashed text-[10px]"
                style={{ background: `${accentColor}1a`, borderColor: `${accentColor}33`, color: `${accentColor}cc` }}>
                <p>{metricAlertText}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="py-12 border-y border-white/5"><ExecutionFlow /></div>
      <SuccessStories />

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto border rounded-[4rem] p-12 md:p-24 text-center backdrop-blur-3xl relative overflow-hidden"
          style={{ backgroundImage: `linear-gradient(to bottom right, ${accentColor}66, #000)`, borderColor: `${accentColor}33` }}>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-7xl font-black mb-8 italic tracking-tighter uppercase leading-tight">{ctaHeadline}</h2>
            <p className="text-lg md:text-xl mb-12 max-w-2xl mx-auto" style={{ color: `${accentColor}b3` }}>{ctaBody}</p>
            <div className="flex flex-col items-center gap-6">
              <button className="bg-white px-16 py-6 rounded-full font-black text-2xl hover:scale-110 transition-all shadow-2xl"
                style={{ color: accentColor }}>{ctaBtnLabel}</button>
              <div className="font-mono text-sm tracking-widest uppercase" style={{ color: accentColor }}>{ctaLocation}</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}