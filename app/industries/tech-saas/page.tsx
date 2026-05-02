// app/industry/tech-saas/page.tsx
'use client';

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import ExecutionFlow from '@/components/sections/ExecutionFlow';
import SuccessStories from '@/components/sections/SuccessStories';
import { Layout, Sparkles, Users, MousePointer2, Layers, ArrowRight, Code2, Settings2 } from 'lucide-react';
import { usePageContent } from '@/hooks/usePageContent';

interface FeatureCard  { title: string; desc: string; icon: string }
interface DetailPoint  { title: string; icon: string }

function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

const ICON_MAP: Record<string, React.ElementType> = { Sparkles, MousePointer2, Users, Layers, Code2, Settings2, Layout };

const DEFAULT_FEATURE_CARDS = JSON.stringify([
  { title: 'Generative Workflows', desc: 'Moving beyond forms—enable users to generate complex outputs via natural language.', icon: 'Sparkles'     },
  { title: 'Semantic Discovery',   desc: 'Replace rigid filters with AI search that understands user intent.',                  icon: 'MousePointer2' },
  { title: 'Predictive Churn AI',  desc: 'Analyze user behavior patterns to predict and prevent churn before it happens.',     icon: 'Users'         },
]);
const DEFAULT_DETAIL_POINTS = JSON.stringify([
  { title: 'Multi-tenant AI Architectures', icon: 'Layers'    },
  { title: 'API-First AI Integration',       icon: 'Code2'     },
  { title: 'Usage-based AI Billing Logic',   icon: 'Settings2' },
]);

export default function TechSaaSIndustryPage() {
  const { get } = usePageContent('industry-tech-saas');

  const badgeText    = get('hero', 'badge_text',      'SaaS Transformation Vertical');
  const heroPl       = get('hero', 'headline_plain',  'INTELLIGENT');
  const heroAcc      = get('hero', 'headline_accent', 'PRODUCT DNA');
  const heroBody     = get('hero', 'body_text',       "Don't just add a chatbot. We help SaaS founders re-architect their products around AI.");
  const ctaLabel     = get('hero', 'cta_label',       'AI-Enable Your SaaS');
  const accentColor  = get('hero', 'accent_color',    '#3b82f6');
  const accentColor2 = get('hero', 'accent_color_2',  '#6366f1');

  const featureCards = safeParse<FeatureCard[]>(get('features', 'items_json', DEFAULT_FEATURE_CARDS), []);

  const dashPl        = get('dashboard', 'headline_plain',     'From SaaS');
  const dashAcc       = get('dashboard', 'headline_accent',    'to AI-as-a-Service');
  const dashBody      = get('dashboard', 'body_text',          'We help you monetize your data.');
  const aiSuggestion  = get('dashboard', 'ai_suggestion',      'Based on user retention trends, we recommend enabling the "Automated Onboarding" agent for users in the EMEA region.');
  const panelFilename = get('dashboard', 'panel_filename',     'nexus_dashboard_v2.ai');
  const detailPoints  = safeParse<DetailPoint[]>(get('dashboard', 'detail_points_json', DEFAULT_DETAIL_POINTS), []);

  const ctaHeadline  = get('cta', 'headline',  'Future-Proof Your Product');
  const ctaBody      = get('cta', 'body_text', 'Our SaaS consultants at DLF Cyber City are ready to build your next competitive advantage.');
  const ctaBtnLabel  = get('cta', 'btn_label', 'Audit My SaaS');
  const ctaLocation  = get('cta', 'location',  '+91 870023 6923');

  return (
    <main className="flex min-h-screen flex-col bg-[#020617] text-white overflow-x-hidden">
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[120px] -z-10"
          style={{ background: `${accentColor}1a` }} />
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-8 backdrop-blur-md"
            style={{ background: `${accentColor}1a`, borderColor: `${accentColor}33` }}>
            <Layout className="w-4 h-4" style={{ color: accentColor }} />
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: accentColor }}>{badgeText}</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-tight">
            {heroPl}<br />
            <span className="text-transparent bg-clip-text italic"
              style={{ backgroundImage: `linear-gradient(to right, ${accentColor}, ${accentColor2}, ${accentColor})` }}>
              {heroAcc}
            </span>
          </h1>
          <p className="max-w-3xl mx-auto text-gray-400 text-lg md:text-xl leading-relaxed mb-12">{heroBody}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-10 py-5 rounded-2xl font-bold transition-all shadow-xl flex items-center justify-center gap-2 text-white"
              style={{ background: accentColor, boxShadow: `0 20px 40px ${accentColor}33` }}>
              {ctaLabel} <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {featureCards.map((item, i) => {
            const Icon = ICON_MAP[item.icon] ?? Sparkles;
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
      </section>

      {/* ── DASHBOARD DEMO ───────────────────────────────────────────────── */}
      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <div className="absolute -inset-10 rounded-full blur-[100px] pointer-events-none" style={{ background: `${accentColor}1a` }} />
            <div className="relative bg-[#03081a] border border-white/10 rounded-3xl p-6 shadow-2xl">
              <div className="flex items-center gap-2 mb-6 border-b border-white/5 pb-4">
                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/50" />
                <span className="ml-4 text-[10px] font-mono text-gray-500">{panelFilename}</span>
              </div>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="h-20 rounded-xl bg-white/5 animate-pulse" />
                <div className="h-20 rounded-xl bg-white/5" />
                <div className="h-20 rounded-xl bg-white/5" />
              </div>
              <div className="p-4 rounded-xl border" style={{ background: `${accentColor}1a`, borderColor: `${accentColor}4d` }}>
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-3 h-3" style={{ color: accentColor }} />
                  <span className="text-[10px] font-bold uppercase" style={{ color: accentColor }}>AI Suggestion</span>
                </div>
                <p className="text-xs text-gray-300">{aiSuggestion}</p>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-4xl md:text-6xl font-black mb-8 italic tracking-tighter uppercase">
              {dashPl}<br />{dashAcc}
            </h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">{dashBody}</p>
            <div className="space-y-4">
              {detailPoints.map((pt, idx) => {
                const Icon = ICON_MAP[pt.icon] ?? Layers;
                return (
                  <div key={idx} className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all cursor-default">
                    <Icon style={{ color: accentColor }} />
                    <span className="font-bold">{pt.title}</span>
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
        <div className="max-w-6xl mx-auto border rounded-[4rem] p-12 md:p-24 text-center backdrop-blur-3xl relative overflow-hidden"
          style={{ background: `linear-gradient(to bottom right, ${accentColor}66, ${accentColor2}66)`, borderColor: `${accentColor}33` }}>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-7xl font-black mb-8 italic tracking-tighter uppercase leading-tight">{ctaHeadline}</h2>
            <p className="text-lg md:text-xl mb-12 max-w-2xl mx-auto" style={{ color: 'rgba(219,234,254,0.7)' }}>{ctaBody}</p>
            <div className="flex flex-col items-center gap-6">
              <button className="bg-white px-16 py-6 rounded-full font-black text-2xl hover:scale-110 transition-all shadow-2xl uppercase"
                style={{ color: accentColor }}>
                {ctaBtnLabel}
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