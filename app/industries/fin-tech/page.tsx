// app/industry/fintech/page.tsx

'use client';

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import ExecutionFlow from '@/components/sections/ExecutionFlow';
import SuccessStories from '@/components/sections/SuccessStories';
import {
  Zap,
  CreditCard,
  Smartphone,
  ShieldCheck,
  ArrowRight,
  Code2,
  PieChart,
  MessageSquare,
  Activity,
} from 'lucide-react';
import { usePageContent } from '@/hooks/usePageContent';

// ── Icon maps ─────────────────────────────────────────────────────────────────
const FEATURE_ICON_MAP: Record<string, React.ElementType> = { CreditCard, MessageSquare, Activity, Zap };
const BADGE_ICON_MAP:   Record<string, React.ElementType> = { Code2, Smartphone, ShieldCheck };

// ── Helpers ───────────────────────────────────────────────────────────────────
function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

// ── Types ─────────────────────────────────────────────────────────────────────
interface FeatureItem { title: string; desc: string; icon: string }
interface BadgeItem   { label: string; icon: string }

// ── Defaults ──────────────────────────────────────────────────────────────────
const DEFAULT_FEATURES = JSON.stringify([
  { title: 'Embedded AI Lending',      desc: 'Deploying BNPL and micro-lending models that use behavioral telemetry to approve credit in under 200ms.',                                 icon: 'CreditCard'    },
  { title: 'Agentic Support',          desc: 'Replacing simple bots with AI agents that can resolve disputes, process refunds, and modify subscriptions autonomously.',                  icon: 'MessageSquare' },
  { title: 'Transaction Enrichment',   desc: 'Using LLMs to clean messy merchant data into clear, categorized insights for a superior user experience.',                                icon: 'Activity'      },
]);
const DEFAULT_BADGES = JSON.stringify([
  { label: 'Developer-Centric SDKs', icon: 'Code2'      },
  { label: 'Mobile-Native AI',       icon: 'Smartphone' },
]);

export default function FinTechIndustryPage() {
  const { get } = usePageContent('industry-fintech');

  // ── CMS values ────────────────────────────────────────────────────────────
  const badgeText    = get('hero', 'badge_text',      'Next-Gen Fintech Vertical');
  const heroPl       = get('hero', 'headline_plain',  'VELOCITY');
  const heroAcc      = get('hero', 'headline_accent', 'BANKING');
  const heroBody     = get('hero', 'body_text',       'Building the intelligence layer for the next unicorn. We help fintechs integrate AI-driven lending, autonomous customer support, and high-velocity fraud detection into their existing API stacks.');
  const heroBtnLabel = get('hero', 'btn_label',       'Scale Your Feature Set');
  const accentColor  = get('hero', 'accent_color',    '#3b82f6');
  const accentSecond = get('hero', 'accent_secondary','#06b6d4');
  const accentDark   = get('hero', 'accent_dark',     '#1e3a5f');

  const featureItems = safeParse<FeatureItem[]>(get('features', 'items_json', DEFAULT_FEATURES), []);

  const apiPlain     = get('api_intelligence', 'headline_plain',    'API-First');
  const apiAccent    = get('api_intelligence', 'headline_accent',   'Intelligence');
  const apiBody      = get('api_intelligence', 'body_text',         'We specialize in "Invisible AI." Our solutions don\'t disrupt your user journey; they enhance it through seamless API integrations and real-time event processing.');
  const churnRisk    = get('api_intelligence', 'churn_risk_value',  'LOW');
  const churnPct     = get('api_intelligence', 'churn_pct',         '3.2%');
  const crossSell    = get('api_intelligence', 'crosssell_label',   'Premium Card Upgrade');
  const enrichSample = get('api_intelligence', 'enrichment_sample', 'T_88291: STARBUCKS_CYBER_CITY → Category: Food & Drink → Recurring: True');
  const techBadges   = safeParse<BadgeItem[]>(get('api_intelligence', 'tech_badges_json', DEFAULT_BADGES), []);

  const ctaPlain     = get('cta', 'headline_plain',  'Scale Your');
  const ctaAccent    = get('cta', 'headline_accent', 'Vision');
  const ctaBody      = get('cta', 'body_text',       'Our fintech engineers at DLF Cyber City are ready to build the next breakthrough in digital finance.');
  const ctaBtn       = get('cta', 'btn_label',       'START FINTECH BUILD');
  const ctaLocation  = get('cta', 'location_label',  'DLF Cyber City, Gurugram');

  return (
    <main className="flex min-h-screen flex-col bg-[#020617] text-white overflow-x-hidden">
      <Navbar />

      {/* ── HERO ────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        <div
          className="absolute top-0 right-1/4 w-[600px] h-[600px] rounded-full blur-[120px] -z-10"
          style={{ background: `${accentColor}1a` }}
        />
        <div className="max-w-7xl mx-auto text-center">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 backdrop-blur-md"
            style={{ background: `${accentColor}1a`, border: `1px solid ${accentColor}33` }}
          >
            <Zap className="w-4 h-4" style={{ color: accentColor }} />
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: accentColor }}>{badgeText}</span>
          </div>

          <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-tight uppercase">
            {heroPl} <br />
            <span
              className="italic"
              style={{
                backgroundImage: `linear-gradient(to right, ${accentColor}, ${accentSecond}, #6366f1)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
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
            const Icon = FEATURE_ICON_MAP[item.icon] ?? Zap;
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

      {/* ── API INTELLIGENCE ────────────────────────────────────────────── */}
      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Text */}
          <div>
            <h2 className="text-4xl md:text-6xl font-black mb-8 italic tracking-tighter uppercase leading-tight">
              {apiPlain} <br />{apiAccent}
            </h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">{apiBody}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              {techBadges.map((badge, i) => {
                const Icon = BADGE_ICON_MAP[badge.icon] ?? Code2;
                return (
                  <div
                    key={i}
                    className="p-6 rounded-2xl bg-white/5 border border-white/5 flex flex-col gap-4 transition-all cursor-default"
                    onMouseEnter={e => (e.currentTarget.style.borderColor = `${accentColor}50`)}
                    onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)')}
                  >
                    <Icon className="w-6 h-6" style={{ color: accentColor }} />
                    <span className="font-bold text-sm tracking-widest uppercase">{badge.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Dashboard widget */}
          <div className="relative">
            <div
              className="absolute -inset-10 rounded-full blur-[100px]"
              style={{ background: `${accentSecond}08` }}
            />
            <div
              className="relative border border-white/10 rounded-[3rem] p-10 shadow-2xl overflow-hidden font-mono"
              style={{ background: '#03081a' }}
            >
              <div className="flex justify-between items-center mb-10 pb-6 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <PieChart className="w-4 h-4" style={{ color: accentSecond }} />
                  <span className="text-[10px] text-gray-500 uppercase">USER_INSIGHTS_ENGINE</span>
                </div>
                <div className="w-3 h-3 rounded-full animate-pulse" style={{ background: accentColor }} />
              </div>
              <div className="space-y-6">
                <div className="p-4 rounded-xl border" style={{ background: `${accentColor}08`, borderColor: `${accentColor}1a` }}>
                  <p className="text-[10px] text-gray-500 uppercase mb-2">Predicted Churn Risk</p>
                  <div className="flex justify-between items-end">
                    <span className="text-2xl font-bold">{churnRisk}</span>
                    <span className="text-xs font-mono pb-1" style={{ color: accentColor }}>{churnPct}</span>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                  <p className="text-[10px] text-gray-500 uppercase mb-2">Cross-Sell Opportunity</p>
                  <p className="text-xs font-bold uppercase tracking-widest text-emerald-400">{crossSell}</p>
                </div>
              </div>
              <div className="mt-8 p-4 bg-black/60 rounded-xl border border-white/5">
                <p className="text-[10px] text-gray-500 uppercase mb-2">Real-time enrichment:</p>
                <p className="text-[11px] text-gray-400 italic">{enrichSample}</p>
              </div>
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
          style={{ background: `linear-gradient(to bottom right, ${accentDark}66, #1e1b4b66)`, borderColor: `${accentColor}33` }}
        >
          <div className="relative z-10">
            <h2 className="text-4xl md:text-7xl font-black mb-8 italic tracking-tighter uppercase leading-tight">
              {ctaPlain} <br />{ctaAccent}
            </h2>
            <p className="text-lg md:text-xl mb-12 max-w-2xl mx-auto" style={{ color: 'rgba(219,234,254,0.7)' }}>{ctaBody}</p>
            <div className="flex flex-col items-center gap-6">
              <button
                className="px-16 py-6 rounded-full font-black text-2xl hover:scale-110 transition-all shadow-2xl"
                style={{ background: '#fff', color: accentDark }}
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