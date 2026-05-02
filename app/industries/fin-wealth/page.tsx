// app/industry/wealth-management/page.tsx

'use client';

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import ExecutionFlow from '@/components/sections/ExecutionFlow';
import SuccessStories from '@/components/sections/SuccessStories';
import {
  Gem,
  TrendingUp,
  Crown,
  Briefcase,
  Search,
  ShieldCheck,
  ArrowRight,
  BarChart3,
  LineChart,
} from 'lucide-react';
import { usePageContent } from '@/hooks/usePageContent';

// ── Icon maps ─────────────────────────────────────────────────────────────────
const FEATURE_ICON_MAP: Record<string, React.ElementType> = { Gem, Briefcase, Search };
const BADGE_ICON_MAP:   Record<string, React.ElementType> = { ShieldCheck, BarChart3, Crown };

// ── Helpers ───────────────────────────────────────────────────────────────────
function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

// ── Types ─────────────────────────────────────────────────────────────────────
interface FeatureItem { title: string; desc: string; icon: string }
interface BadgeItem   { label: string; icon: string }

// ── Defaults ──────────────────────────────────────────────────────────────────
const DEFAULT_FEATURES = JSON.stringify([
  { title: 'Hyper-Personalized Portfolios', desc: 'Moving beyond generic risk profiles—AI that constructs portfolios based on real-time life goals, tax situations, and ethical values.', icon: 'Briefcase' },
  { title: 'Generative Research Agents',    desc: 'Custom LLMs that scan thousands of 10-Ks, earnings calls, and alternative data to find the signal in the noise.',                       icon: 'Search'    },
  { title: 'Predictive Tax Harvest',        desc: 'Autonomous monitoring of portfolio losses and gains to execute tax-loss harvesting with surgical precision.',                            icon: 'Gem'       },
]);
const DEFAULT_BADGES = JSON.stringify([
  { label: 'Family Office Ready', icon: 'ShieldCheck' },
  { label: 'Monte Carlo AI',      icon: 'BarChart3'   },
]);

export default function WealthManagementPage() {
  const { get } = usePageContent('industry-wealth-management');

  // ── CMS values ────────────────────────────────────────────────────────────
  const badgeText    = get('hero', 'badge_text',      'Wealth & Asset Management Vertical');
  const heroPl       = get('hero', 'headline_plain',  'GENERATIVE');
  const heroAcc      = get('hero', 'headline_accent', 'PROSPERITY');
  const heroBody     = get('hero', 'body_text',       'Elevating the standard of private wealth. We build AI-first platforms that deliver institutional-grade market intelligence and hyper-personalized investment strategies.');
  const heroBtnLabel = get('hero', 'btn_label',       'Scale Your AUM');
  const accentColor  = get('hero', 'accent_color',    '#10b981');
  const accentDark   = get('hero', 'accent_dark',     '#065f46');

  const featureItems = safeParse<FeatureItem[]>(get('features', 'items_json', DEFAULT_FEATURES), []);

  const intPlain     = get('intelligence', 'headline_plain',    'Elite');
  const intAccent    = get('intelligence', 'headline_accent',   'Intelligence');
  const intBody      = get('intelligence', 'body_text',         'We empower advisors to spend less time on spreadsheets and more time with clients. Our AI solutions act as a 24/7 quant team.');
  const alphaValue   = get('intelligence', 'alpha_value',       '+18.4%');
  const aiReasoning  = get('intelligence', 'ai_reasoning',      '"Detected shifts in semi-conductor supply chain. Recommending a 4.2% reallocation from Tech to Energy Infrastructure."');
  const trustBadges  = safeParse<BadgeItem[]>(get('intelligence', 'trust_badges_json', DEFAULT_BADGES), []);

  const ctaPlain     = get('cta', 'headline_plain',  'Preserve');
  const ctaAccent    = get('cta', 'headline_accent', 'The Legacy');
  const ctaBody      = get('cta', 'body_text',       'Our wealth-tech strategists at DLF Cyber City are ready to build the next generation of bespoke asset management tools.');
  const ctaBtn       = get('cta', 'btn_label',       'START WEALTH BUILD');
  const ctaLocation  = get('cta', 'location_label',  'Wealth Hub: Gurugram, India');

  return (
    <main className="flex min-h-screen flex-col bg-[#020617] text-white overflow-x-hidden">
      <Navbar />

      {/* ── HERO ────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        <div
          className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[120px] -z-10"
          style={{ background: `${accentColor}0d` }}
        />
        <div className="max-w-7xl mx-auto text-center">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 backdrop-blur-md"
            style={{ background: `${accentColor}1a`, border: `1px solid ${accentColor}33` }}
          >
            <Crown className="w-4 h-4" style={{ color: accentColor }} />
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: accentColor }}>{badgeText}</span>
          </div>

          <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-tight uppercase">
            {heroPl} <br />
            <span
              className="italic"
              style={{ backgroundImage: `linear-gradient(to right, ${accentColor}, ${accentDark})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
            >
              {heroAcc}
            </span>
          </h1>

          <p className="max-w-3xl mx-auto text-gray-400 text-lg md:text-xl leading-relaxed mb-12">{heroBody}</p>

          <button
            className="px-10 py-5 rounded-2xl font-bold transition-all shadow-xl flex items-center justify-center gap-2 text-white mx-auto hover:opacity-90 active:scale-95"
            style={{ background: accentColor, boxShadow: `0 20px 40px ${accentColor}40` }}
          >
            {heroBtnLabel} <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* ── FEATURES ────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {featureItems.map((item, i) => {
            const Icon = FEATURE_ICON_MAP[item.icon] ?? Gem;
            return (
              <div
                key={i}
                className="group p-10 rounded-[2.5rem] border border-white/5 transition-all"
                style={{ background: `${accentColor}05` }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = `${accentColor}50`)}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)')}
              >
                <div
                  className="mb-6 p-4 rounded-2xl inline-block transition-all group-hover:scale-110"
                  style={{ background: `${accentColor}1a` }}
                >
                  <Icon className="w-8 h-8" style={{ color: accentColor }} />
                </div>
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-gray-500 leading-relaxed text-sm">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── INTELLIGENCE ────────────────────────────────────────────────── */}
      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Dashboard widget */}
          <div className="relative">
            <div
              className="absolute -inset-10 rounded-full blur-[100px]"
              style={{ background: `${accentColor}08` }}
            />
            <div
              className="relative border border-white/10 rounded-[3rem] p-10 shadow-2xl overflow-hidden font-mono"
              style={{ background: '#010a05' }}
            >
              <div className="flex justify-between items-center mb-10 pb-6 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" style={{ color: accentColor }} />
                  <span className="text-[10px] text-gray-500 uppercase">WEALTH_GEN_ADVISOR_v8</span>
                </div>
                <div
                  className="px-2 py-1 rounded text-[8px] font-bold"
                  style={{ background: `${accentColor}1a`, color: accentColor }}
                >PREMIUM_ACCESS</div>
              </div>
              <div className="space-y-8">
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase">Alpha Projection</p>
                    <p className="text-3xl font-bold" style={{ color: accentColor }}>{alphaValue}</p>
                  </div>
                  <LineChart className="w-16 h-16" style={{ color: `${accentColor}40` }} />
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                  <p className="text-[10px] text-gray-500 uppercase mb-3 text-center">Portfolio Optimization Status</p>
                  <div className="flex items-center gap-4">
                    <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full w-[92%] rounded-full" style={{ background: `linear-gradient(to right, ${accentDark}, ${accentColor})` }} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-10 p-4 rounded-xl border border-dashed" style={{ background: `${accentColor}08`, borderColor: `${accentColor}33` }}>
                <p className="text-[10px] uppercase" style={{ color: `${accentColor}b3` }}>AI REASONING:</p>
                <p className="text-[11px] text-gray-300 mt-2 italic leading-relaxed">{aiReasoning}</p>
              </div>
            </div>
          </div>

          {/* Text */}
          <div>
            <h2 className="text-4xl md:text-6xl font-black mb-8 italic tracking-tighter uppercase leading-tight">
              {intPlain} <br />{intAccent}
            </h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">{intBody}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              {trustBadges.map((badge, i) => {
                const Icon = BADGE_ICON_MAP[badge.icon] ?? ShieldCheck;
                return (
                  <div
                    key={i}
                    className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/5 transition-all cursor-default"
                    onMouseEnter={e => (e.currentTarget.style.borderColor = `${accentColor}50`)}
                    onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)')}
                  >
                    <Icon style={{ color: accentColor }} />
                    <span className="text-xs font-bold uppercase tracking-widest">{badge.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── EXECUTION FLOW ──────────────────────────────────────────────── */}
      <div className="py-12 border-y border-white/5">
        <ExecutionFlow />
      </div>

      <SuccessStories />

      {/* ── CTA ─────────────────────────────────────────────────────────── */}
      <section className="py-32 px-6">
        <div
          className="max-w-6xl mx-auto border rounded-[4rem] p-12 md:p-24 text-center backdrop-blur-3xl relative overflow-hidden"
          style={{ background: `linear-gradient(to bottom right, ${accentDark}66, #000)`, borderColor: `${accentColor}33` }}
        >
          <div className="relative z-10">
            <h2 className="text-4xl md:text-7xl font-black mb-8 italic tracking-tighter uppercase leading-tight">
              {ctaPlain} <br />{ctaAccent}
            </h2>
            <p className="text-lg md:text-xl mb-12 max-w-2xl mx-auto" style={{ color: 'rgba(209,250,229,0.7)' }}>{ctaBody}</p>
            <div className="flex flex-col items-center gap-6">
              <button
                className="bg-white px-16 py-6 rounded-full font-black text-2xl hover:scale-110 transition-all shadow-2xl"
                style={{ color: accentDark }}
              >
                {ctaBtn}
              </button>
              <div className="font-mono text-sm tracking-widest uppercase" style={{ color: accentColor }}>{ctaLocation}</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}