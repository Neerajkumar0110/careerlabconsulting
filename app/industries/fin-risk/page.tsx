// app/industry/finance-risk/page.tsx

'use client';

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import ExecutionFlow from '@/components/sections/ExecutionFlow';
import SuccessStories from '@/components/sections/SuccessStories';
import {
  ShieldAlert,
  Scale,
  BarChart4,
  AlertTriangle,
  SearchCheck,
  FileText,
  ArrowRight,
  Lock,
  Database,
} from 'lucide-react';
import { usePageContent } from '@/hooks/usePageContent';

// ── Icon maps ─────────────────────────────────────────────────────────────────
const FEATURE_ICON_MAP: Record<string, React.ElementType> = { BarChart4, Scale, SearchCheck, ShieldAlert };
const BADGE_ICON_MAP:   Record<string, React.ElementType> = { Lock, FileText, Database, ShieldAlert };

// ── Helpers ───────────────────────────────────────────────────────────────────
function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

// ── Types ─────────────────────────────────────────────────────────────────────
interface FeatureItem { title: string; desc: string; icon: string }
interface BadgeItem   { label: string; icon: string }

// ── Defaults ──────────────────────────────────────────────────────────────────
const DEFAULT_FEATURES = JSON.stringify([
  { title: 'Predictive Stress Testing', desc: 'Simulating millions of black-swan scenarios using generative AI to forecast portfolio impact and capital adequacy.', icon: 'BarChart4'   },
  { title: 'Automated RegTech',         desc: 'Mapping global financial regulations (BASEL IV, Dodd-Frank) to internal data flows for automated reporting and audit trails.', icon: 'Scale'      },
  { title: 'Model Risk Mgmt (MRM)',     desc: 'Ensuring AI governance by continuously auditing other models for bias, drift, and adversarial vulnerability.',                icon: 'SearchCheck' },
]);
const DEFAULT_BADGES = JSON.stringify([
  { label: 'Fraud Firewall',      icon: 'Lock'     },
  { label: 'SEC/FINRA Reporting', icon: 'FileText' },
]);

export default function FinanceRiskIndustryPage() {
  const { get } = usePageContent('industry-finance-risk');

  // ── CMS values ────────────────────────────────────────────────────────────
  const badgeText    = get('hero', 'badge_text',      'Enterprise Risk & RegTech Vertical');
  const heroPl       = get('hero', 'headline_plain',  'SYSTEMIC');
  const heroAcc      = get('hero', 'headline_accent', 'VIGILANCE');
  const heroBody     = get('hero', 'body_text',       'Eliminating the blind spots in global finance. We build AI-driven risk engines that perform real-time stress testing, automated regulatory compliance, and predictive liquidity analysis for Tier-1 institutions.');
  const heroBtnLabel = get('hero', 'btn_label',       'Secure Your Portfolio');
  const accentColor  = get('hero', 'accent_color',    '#f97316');
  const accentDark   = get('hero', 'accent_dark',     '#7c2d12');

  const featureItems = safeParse<FeatureItem[]>(get('features', 'items_json', DEFAULT_FEATURES), []);

  const riskPlain    = get('risk_telemetry', 'headline_plain',    'Quantify The');
  const riskAccent   = get('risk_telemetry', 'headline_accent',   'Unthinkable');
  const riskBody     = get('risk_telemetry', 'body_text',         'Risk isn\'t just about avoiding failure; it\'s about optimizing certainty. Our AI engines bridge the gap between historical data and future volatility.');
  const capitalRatio = get('risk_telemetry', 'capital_ratio',     '14.2% [HEALTHY]');
  const varValue     = get('risk_telemetry', 'var_value',         '$2.4M');
  const compStatus   = get('risk_telemetry', 'compliance_status', 'PASSED');
  const compBadges   = safeParse<BadgeItem[]>(get('risk_telemetry', 'compliance_badges_json', DEFAULT_BADGES), []);

  const ctaPlain     = get('cta', 'headline_plain',  'Fortify Your');
  const ctaAccent    = get('cta', 'headline_accent', 'Operations');
  const ctaBody      = get('cta', 'body_text',       'Our risk-tech engineers at DLF Cyber City are building the systems that prevent the next global crisis.');
  const ctaBtn       = get('cta', 'btn_label',       'Audit My Portfolio');
  const ctaLocation  = get('cta', 'location_label',  'Risk Monitoring Hub: Gurugram, India');

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
            <ShieldAlert className="w-4 h-4" style={{ color: accentColor }} />
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: accentColor }}>{badgeText}</span>
          </div>

          <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-tight uppercase">
            {heroPl} <br />
            <span
              className="italic"
              style={{
                backgroundImage: `linear-gradient(to right, ${accentColor}, #71717a, ${accentDark})`,
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
            const Icon = FEATURE_ICON_MAP[item.icon] ?? ShieldAlert;
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

      {/* ── RISK TELEMETRY ──────────────────────────────────────────────── */}
      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Dashboard */}
          <div className="relative order-2 lg:order-1">
            <div
              className="absolute -inset-10 rounded-full blur-[100px]"
              style={{ background: `${accentColor}08` }}
            />
            <div
              className="relative border border-white/10 rounded-[3rem] p-8 shadow-2xl font-mono"
              style={{ background: '#050201' }}
            >
              <div className="flex items-center gap-2 mb-8 border-b border-white/5 pb-4">
                <AlertTriangle className="w-4 h-4" style={{ color: accentColor }} />
                <span className="text-[10px] uppercase tracking-widest" style={{ color: accentColor }}>Risk_Telemetry_Stream</span>
              </div>
              <div className="space-y-6">
                <div className="flex justify-between items-center p-3 rounded-lg bg-white/5 border border-white/5">
                  <span className="text-[10px] text-gray-500 uppercase tracking-widest italic">Capital_Ratio</span>
                  <span className="text-xs font-bold">{capitalRatio}</span>
                </div>
                <div className="p-4 rounded-xl border" style={{ background: `${accentColor}08`, borderColor: `${accentColor}1a` }}>
                  <p className="text-[10px] text-gray-500 uppercase mb-4">Monte Carlo Simulation Progress</p>
                  <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
                    <div className="w-2/3 h-full rounded-full" style={{ background: accentColor }} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 rounded-lg bg-white/5 border border-white/5">
                    <p className="text-[9px] text-gray-500">VAR (99%)</p>
                    <p className="text-sm font-bold text-red-400">{varValue}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-white/5 border border-white/5">
                    <p className="text-[9px] text-gray-500">Compliance</p>
                    <p className="text-sm font-bold text-emerald-400">{compStatus}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Text */}
          <div className="order-1 lg:order-2">
            <h2 className="text-4xl md:text-6xl font-black mb-8 italic tracking-tighter uppercase leading-tight">
              {riskPlain} <br />{riskAccent}
            </h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">{riskBody}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              {compBadges.map((badge, i) => {
                const Icon = BADGE_ICON_MAP[badge.icon] ?? Lock;
                return (
                  <div
                    key={i}
                    className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/5 transition-all cursor-default"
                    onMouseEnter={e => (e.currentTarget.style.borderColor = `${accentColor}50`)}
                    onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)')}
                  >
                    <Icon className="shrink-0" style={{ color: accentColor }} />
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
          style={{ background: `linear-gradient(to bottom right, ${accentDark}33, #000)`, borderColor: `${accentColor}33` }}
        >
          <div className="relative z-10">
            <h2 className="text-4xl md:text-7xl font-black mb-8 italic tracking-tighter uppercase leading-tight">
              {ctaPlain} <br />{ctaAccent}
            </h2>
            <p className="text-lg md:text-xl mb-12 max-w-2xl mx-auto" style={{ color: 'rgba(254,215,170,0.7)' }}>{ctaBody}</p>
            <div className="flex flex-col items-center gap-6">
              <button
                className="px-16 py-6 rounded-full font-black text-2xl text-white hover:scale-110 transition-all shadow-2xl uppercase"
                style={{ background: accentColor, boxShadow: `0 20px 60px ${accentColor}50` }}
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