'use client';

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import ExecutionFlow from '@/components/sections/ExecutionFlow';
import SuccessStories from '@/components/sections/SuccessStories';
import { usePageContent } from '@/hooks/usePageContent';
import {
  ShoppingBag, Sparkles, Search, BarChart3,
  Users, ArrowRight, MousePointer2, Camera,
} from 'lucide-react';

function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

interface FeatureCard { title: string; desc: string; icon: string }
interface StatCard    { label: string; value: string }

const FEATURE_ICON_MAP: Record<string, React.ElementType> = {
  Sparkles, Camera, BarChart3, Search, Users, MousePointer2,
};

export default function RetailD2CPage() {
  const { get } = usePageContent('industry-d2c');

  // ── Hero ──────────────────────────────────────────────────────────────────
  const accentColor      = get('hero', 'accent_color',      '#ec4899');
  const accentColorTo    = get('hero', 'accent_color_to',   '#6366f1');
  const badgeText        = get('hero', 'badge_text',        'Digital Commerce & D2C Vertical');
  const heroPl           = get('hero', 'headline_plain',    'CONVERSION');
  const heroAcc          = get('hero', 'headline_accent',   'ENGINEERING');
  const heroBody         = get('hero', 'body_text',         'Stop guessing what your customers want. We build AI-native storefronts that predict purchase intent, automate visual discovery, and scale personalized shopping experiences for millions.');
  const heroBtnLabel     = get('hero', 'btn_label',         'Optimize My Storefront');

  // ── Features ──────────────────────────────────────────────────────────────
  const featuresPl       = get('features', 'headline_plain',  'Core');
  const featuresAcc      = get('features', 'headline_accent', 'Capabilities');
  const featuresItems    = safeParse<FeatureCard[]>(get('features', 'items_json', JSON.stringify([
    { title: 'Hyper-Personalization', desc: 'Dynamic pricing and product recommendation engines that adapt in real-time based on clickstream data and historical intent.', icon: 'Sparkles' },
    { title: 'AI Visual Discovery',   desc: "Building 'Shop the Look' features using computer vision that allows users to find products via image uploads or social screenshots.", icon: 'Camera' },
    { title: 'Demand Forecasting',    desc: 'Predictive inventory models that analyze social trends and seasonality to prevent stockouts and reduce warehouse waste.', icon: 'BarChart3' },
  ])), []);

  // ── Detail ────────────────────────────────────────────────────────────────
  const detailPl         = get('detail', 'headline_plain',  'Predictive');
  const detailAcc        = get('detail', 'headline_accent', 'Shopping');
  const detailBody       = get('detail', 'body_text',       'Modern D2C is about more than just a cart. We implement Agentic Commerce—where AI agents manage loyalty, handle complex returns, and provide concierge-level support through every touchpoint.');
  const detailStats      = safeParse<StatCard[]>(get('detail', 'stats_json', JSON.stringify([
    { label: 'Abandonment Recovery AI', value: 'MousePointer2' },
    { label: 'LTV Prediction Models',   value: 'Users'         },
  ])), []);

  // ── Metrics panel ─────────────────────────────────────────────────────────
  const metricTitle      = get('metrics', 'panel_title',    'Intent_Analyzer_v2');
  const metricStatus     = get('metrics', 'status_label',   'LIVE_TRAFFIC');
  const metricScore      = get('metrics', 'score_value',    '88.4%');
  const metricScoreLabel = get('metrics', 'score_label',    'Propensity to Purchase');
  const metricAov        = get('metrics', 'aov_value',      '+$42.20');
  const metricAbStatus   = get('metrics', 'ab_status',      'WINNING');
  const metricActionText = get('metrics', 'action_text',    'Applied "Welcome-Back" 15% discount code to Session_8812. Target: Cart size > $100.');

  // ── CTA ───────────────────────────────────────────────────────────────────
  const ctaHeadline      = get('cta', 'headline',       'Dominate The Marketplace');
  const ctaBody          = get('cta', 'body_text',      'Our growth engineers at DLF Cyber City are ready to build the storefront of the future.');
  const ctaBtnLabel      = get('cta', 'btn_label',      'UPGRADE MY COMMERCE');
  const ctaLocation      = get('cta', 'location_label', 'E-Commerce Lab: Gurugram, India');

  return (
    <main className="flex min-h-screen flex-col bg-[#020617] text-white overflow-x-hidden">
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[120px] -z-10"
          style={{ background: `${accentColor}1a` }} />
        <div className="absolute top-1/2 left-0 w-[300px] h-[300px] rounded-full blur-[100px] -z-10"
          style={{ background: `${accentColorTo}0d` }} />
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 backdrop-blur-md"
            style={{ background: `${accentColor}1a`, border: `1px solid ${accentColor}33` }}>
            <ShoppingBag className="w-4 h-4" style={{ color: accentColor }} />
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: accentColor }}>{badgeText}</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-tight uppercase">
            {heroPl} <br />
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
          {(featuresPl || featuresAcc) && (
            <h2 className="text-3xl font-black uppercase tracking-tight text-center mb-12">
              {featuresPl} <span className="italic" style={{ color: accentColor }}>{featuresAcc}</span>
            </h2>
          )}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuresItems.map((item, i) => {
              const Icon = FEATURE_ICON_MAP[item.icon] ?? Sparkles;
              return (
                <div key={i} className="group p-10 rounded-[2.5rem] border border-white/5 transition-all"
                  style={{ background: `${accentColor}08` }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = `${accentColor}4d`)}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)')}>
                  <div className="mb-6 p-4 rounded-2xl inline-block transition-all"
                    style={{ background: `${accentColor}1a` }}>
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
            <div className="space-y-4 mt-8">
              {detailStats.map((stat, i) => {
                const Icon = FEATURE_ICON_MAP[stat.value] ?? MousePointer2;
                return (
                  <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                    <Icon className="w-5 h-5" style={{ color: accentColor }} />
                    <span className="text-xs font-bold uppercase tracking-widest">{stat.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
          {/* Metrics panel */}
          <div className="relative">
            <div className="absolute -inset-10 rounded-full pointer-events-none"
              style={{ background: `${accentColor}0d`, filter: 'blur(100px)' }} />
            <div className="relative bg-[#080205] border border-white/10 rounded-[3rem] p-10 shadow-2xl overflow-hidden font-mono">
              <div className="flex justify-between items-center mb-10 pb-6 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <Search className="w-4 h-4" style={{ color: accentColor }} />
                  <span className="text-[10px] text-gray-500 uppercase tracking-widest">{metricTitle}</span>
                </div>
                <div className="text-[10px] animate-pulse" style={{ color: accentColor }}>{metricStatus}</div>
              </div>
              <div className="space-y-6">
                <div className="p-4 rounded-xl border"
                  style={{ background: `${accentColor}0d`, borderColor: `${accentColor}1a` }}>
                  <p className="text-[10px] text-gray-500 uppercase mb-2 italic text-center">{metricScoreLabel}</p>
                  <div className="text-3xl font-black text-center" style={{ color: accentColor }}>{metricScore}</div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                    <p className="text-[9px] text-gray-500 uppercase">Avg Order Val</p>
                    <p className="text-lg font-bold">{metricAov}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                    <p className="text-[9px] text-gray-500 uppercase">A/B Status</p>
                    <p className="text-lg font-bold text-emerald-400">{metricAbStatus}</p>
                  </div>
                </div>
              </div>
              <div className="mt-8 p-4 bg-white/5 rounded-xl text-[10px] text-gray-400">
                <p className="mb-1" style={{ color: accentColor }}>AUTO_ACTION:</p>
                <p>{metricActionText}</p>
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
          style={{ backgroundImage: `linear-gradient(to bottom right, ${accentColor}66, ${accentColorTo}66)`, borderColor: `${accentColor}33` }}>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-7xl font-black mb-8 italic tracking-tighter uppercase leading-tight">{ctaHeadline}</h2>
            <p className="text-lg md:text-xl mb-12 max-w-2xl mx-auto" style={{ color: 'rgba(255,220,230,0.7)' }}>{ctaBody}</p>
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