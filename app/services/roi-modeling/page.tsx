// app/services/roi-modeling/page.tsx
'use client';

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import ExecutionFlow from '@/components/sections/ExecutionFlow';
import SuccessStories from '@/components/sections/SuccessStories';
import { TrendingUp, Coins, BarChart3, PieChart, Calculator, ArrowRight, Zap, Clock, DollarSign } from 'lucide-react';
import { usePageContent } from '@/hooks/usePageContent';

function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

interface PillarItem    { title: string; desc: string; icon: string }
interface ValuePoint    { title: string; desc: string; icon: string }

const PILLAR_ICON_MAP: Record<string, React.ElementType> = { Coins, TrendingUp, PieChart };
const VALUE_ICON_MAP:  Record<string, React.ElementType> = { BarChart3, Zap, Clock };

const DEFAULT_PILLARS = JSON.stringify([
  { title: 'OPEX Reduction',    desc: 'Identify labor-intensive processes where autonomous agents can reduce operating costs by up to 60%.', icon: 'Coins'      },
  { title: 'Yield Optimization',desc: 'Model revenue growth through AI-enhanced lead scoring, pricing, and personalized commerce.',          icon: 'TrendingUp' },
  { title: 'TCO Analysis',      desc: 'Complete Total Cost of Ownership breakdown including compute, talent, and maintenance overheads.',    icon: 'PieChart'   },
], null, 2);

const DEFAULT_VALUE_POINTS = JSON.stringify([
  { title: 'Predictive P&L Impact',  desc: 'Simulate how AI deployment ripples through your financial statements.',                    icon: 'BarChart3' },
  { title: 'Scalability Economics',  desc: 'Calculate marginal costs of scaling autonomous workforce vs human hiring.',                icon: 'Zap'       },
  { title: 'Risk-Adjusted Yield',    desc: 'Conservative modeling that accounts for market volatility and tech drift.',               icon: 'Clock'     },
], null, 2);

export default function ROIModelingPage() {
  const { get } = usePageContent('services-roi-modeling');

  const accentFrom        = get('hero', 'accent_from',        '#10b981');
  const accentTo          = get('hero', 'accent_to',          '#3b82f6');
  const accentAlt         = get('hero', 'accent_alt',         '#6366f1');
  const badgeText         = get('hero', 'badge_text',         'Financial Intelligence');
  const heroPl            = get('hero', 'headline_plain',     'ROI & ECONOMIC');
  const heroAcc           = get('hero', 'headline_accent',    'MODELING');
  const heroBody          = get('hero', 'body_text',          "AI is an investment, not an expense. We build data-driven economic models to forecast your cost reduction, revenue lift, and payback periods with mathematical precision.");
  const heroBtnPrimary    = get('hero', 'btn_primary_label',  'Calculate Potential ROI');
  const heroBtnSecond     = get('hero', 'btn_secondary_label','Sample Case Study');

  const pillars           = safeParse<PillarItem[]>(get('pillars', 'items_json', DEFAULT_PILLARS), []);

  const simulatorLabel    = get('simulator', 'system_label',  'ECONOMIC_SIMULATOR_V.2');
  const projectedSavings  = get('simulator', 'projected_savings', '$2.4M');
  const efficiencyGain    = get('simulator', 'efficiency_gain',   '420%');
  const paybackPeriod     = get('simulator', 'payback_period',    '4.2 Months');
  const paybackBar        = get('simulator', 'payback_bar_pct',   '85');

  const valueTitle        = get('value', 'headline',          'Quantifiable Value Engineering');
  const valuePoints       = safeParse<ValuePoint[]>(get('value', 'points_json', DEFAULT_VALUE_POINTS), []);

  const ctaHeadline       = get('cta', 'headline',            'VALIDATE THE VALUE');
  const ctaBody           = get('cta', 'body_text',           'Our economic architects in Gurugram are ready to build your custom AI financial roadmap.');
  const ctaBtnLabel       = get('cta', 'btn_label',           'GET THE MODEL');
  const ctaPhone          = get('cta', 'phone_number',        '+91 870023 6923');

  return (
    <main className="flex min-h-screen flex-col bg-[#020617] text-white overflow-x-hidden">
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[120px] -z-10"
          style={{ background: `${accentFrom}0d` }} />
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-8 backdrop-blur-md"
            style={{ background: `${accentFrom}1a`, borderColor: `${accentFrom}33` }}>
            <Calculator className="w-4 h-4" style={{ color: accentFrom }} />
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: accentFrom }}>{badgeText}</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-tight">
            {heroPl}<br />
            <span className="text-transparent bg-clip-text italic"
              style={{ backgroundImage: `linear-gradient(to right, ${accentFrom}, ${accentTo}, ${accentAlt})` }}>
              {heroAcc}
            </span>
          </h1>
          <p className="max-w-3xl mx-auto text-gray-400 text-lg md:text-xl leading-relaxed mb-12">{heroBody}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-10 py-5 font-bold rounded-2xl transition-all flex items-center justify-center gap-2 shadow-xl"
              style={{ background: accentFrom, boxShadow: `0 10px 30px ${accentFrom}33` }}>
              {heroBtnPrimary} <ArrowRight className="w-5 h-5" />
            </button>
            <button className="px-10 py-5 bg-white/5 border border-white/10 hover:bg-white/10 rounded-2xl font-bold transition-all">{heroBtnSecond}</button>
          </div>
        </div>
      </section>

      {/* ── PILLARS ──────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((item, i) => {
            const Icon = PILLAR_ICON_MAP[item.icon] ?? Coins;
            return (
              <div key={i} className="group p-10 rounded-[2.5rem] border border-white/5 hover:border-emerald-500/30 transition-all"
                style={{ background: `${accentFrom}08` }}>
                <div className="mb-6 p-4 rounded-2xl inline-block group-hover:bg-emerald-600 group-hover:text-white transition-all"
                  style={{ background: `${accentFrom}1a` }}>
                  <Icon className="w-8 h-8" style={{ color: accentFrom }} />
                </div>
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── SIMULATOR + VALUE ────────────────────────────────────────────── */}
      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <div className="absolute -inset-10 rounded-full blur-[100px]" style={{ background: `${accentFrom}0d` }} />
            <div className="relative bg-[#03081a] border border-white/10 rounded-[3rem] p-8 md:p-12 shadow-2xl">
              <div className="flex justify-between items-center mb-10">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full" style={{ background: accentFrom }} />
                  <span className="font-mono text-sm text-gray-400">{simulatorLabel}</span>
                </div>
                <BarChart3 className="w-6 h-6 opacity-50" style={{ color: accentFrom }} />
              </div>
              <div className="grid grid-cols-2 gap-6 mb-10">
                <div className="p-6 rounded-2xl border" style={{ background: `${accentFrom}0d`, borderColor: `${accentFrom}33` }}>
                  <p className="text-xs uppercase font-bold mb-2" style={{ color: accentFrom }}>Projected Savings</p>
                  <p className="text-3xl font-black italic">{projectedSavings}<span className="text-sm font-normal text-gray-500">/yr</span></p>
                </div>
                <div className="p-6 rounded-2xl border" style={{ background: `${accentTo}0d`, borderColor: `${accentTo}33` }}>
                  <p className="text-xs uppercase font-bold mb-2" style={{ color: accentTo }}>Efficiency Gain</p>
                  <p className="text-3xl font-black italic">{efficiencyGain}</p>
                </div>
              </div>
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono uppercase text-gray-500">
                    <span>Payback Period</span>
                    <span style={{ color: accentFrom }}>{paybackPeriod}</span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ background: accentFrom, width: `${paybackBar}%` }} />
                  </div>
                </div>
                <div className="flex justify-around items-center pt-6 opacity-40">
                  <DollarSign className="w-8 h-8" />
                  <ArrowRight className="w-4 h-4" />
                  <Zap className="w-8 h-8" />
                  <ArrowRight className="w-4 h-4" />
                  <TrendingUp className="w-8 h-8" />
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-4xl md:text-6xl font-black mb-8 italic tracking-tighter leading-tight">{valueTitle}</h2>
            <div className="space-y-8">
              {valuePoints.map((point, idx) => {
                const Icon = VALUE_ICON_MAP[point.icon] ?? BarChart3;
                return (
                  <div key={idx} className="flex gap-5 group">
                    <div className="mt-1 p-3 rounded-xl bg-white/5 group-hover:bg-emerald-500 group-hover:text-black transition-all">
                      <Icon style={{ color: accentFrom }} />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-1">{point.title}</h4>
                      <p className="text-gray-400 leading-relaxed">{point.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <div className="py-12 border-y border-white/5"><ExecutionFlow /></div>
      <SuccessStories />

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto rounded-[4rem] p-12 md:p-24 text-center backdrop-blur-3xl relative overflow-hidden"
          style={{ backgroundImage: `linear-gradient(to bottom right, ${accentFrom}66, ${accentAlt}66)`, border: `1px solid ${accentFrom}33` }}>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-7xl font-black mb-8 italic tracking-tighter">{ctaHeadline}</h2>
            <p className="text-blue-100/70 text-lg md:text-xl mb-12 max-w-2xl mx-auto">{ctaBody}</p>
            <div className="flex flex-col items-center gap-6">
              <button className="bg-white px-16 py-6 rounded-full font-black text-2xl hover:scale-110 transition-all shadow-2xl"
                style={{ color: accentAlt }}>
                {ctaBtnLabel}
              </button>
              <div className="font-mono text-sm tracking-widest" style={{ color: accentFrom }}>{ctaPhone}</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}