// app/services/digital-transformation/page.tsx
'use client';

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import ExecutionFlow from '@/components/sections/ExecutionFlow';
import FeatureGrid from '@/components/sections/FeatureGrid';
import SuccessStories from '@/components/sections/SuccessStories';
import { RefreshCcw, Cpu, Network, Cloud, ShieldCheck, ArrowRight, Activity } from 'lucide-react';
import { usePageContent } from '@/hooks/usePageContent';

function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

interface PillarItem    { title: string; desc: string; icon: string }
interface MigrationStat { label: string; val: number }
interface FoundationBadge { icon: string; text: string }

const PILLAR_ICON_MAP: Record<string, React.ElementType> = { Cpu, Cloud, Network };
const FOUNDATION_ICON_MAP: Record<string, React.ElementType> = { ShieldCheck, Cpu };

const DEFAULT_PILLARS = JSON.stringify([
  { title: 'Legacy Modernization', desc: 'De-risk your migration by wrapping legacy core systems in AI-ready microservices.', icon: 'Cpu'     },
  { title: 'Cloud-Native Pivot',   desc: 'Shift from server-bound operations to elastic, autonomous cloud architectures.',    icon: 'Cloud'   },
  { title: 'Data Re-Architecting', desc: 'Transform siloed databases into a unified, high-velocity data mesh.',               icon: 'Network' },
], null, 2);

const DEFAULT_MIGRATION_STATS = JSON.stringify([
  { label: 'Architecture Decoupling',   val: 88 },
  { label: 'API Connectivity',          val: 65 },
  { label: 'AI Integration Readiness',  val: 42 },
], null, 2);

const DEFAULT_FOUNDATION_BADGES = JSON.stringify([
  { icon: 'ShieldCheck', text: 'Zero-Downtime Migration' },
  { icon: 'Cpu',         text: 'Legacy Refactoring'      },
], null, 2);

export default function DigitalTransformationPage() {
  const { get } = usePageContent('services-digital-transformation');

  const accentFrom        = get('hero', 'accent_from',        '#3b82f6');
  const accentTo          = get('hero', 'accent_to',          '#6366f1');
  const badgeText         = get('hero', 'badge_text',         'Legacy to AI-Native');
  const heroPl            = get('hero', 'headline_plain',     'DIGITAL');
  const heroAcc           = get('hero', 'headline_accent',    'TRANSFORMATION');
  const heroBody          = get('hero', 'body_text',          "Don't just digitize—evolve. We bridge the gap between legacy infrastructure and autonomous intelligence, turning technical debt into a competitive engine.");
  const heroBtnPrimary    = get('hero', 'btn_primary_label',  'Start Your Migration');
  const heroBtnSecond     = get('hero', 'btn_secondary_label','Modernization Roadmap');

  const pillarsTitle      = get('pillars', 'headline',        'Core Transformation Services');
  const pillars           = safeParse<PillarItem[]>(get('pillars', 'items_json', DEFAULT_PILLARS), []);

  const evolutionTitle    = get('evolution', 'headline',      'The Evolution Framework');
  const evolutionSubhead  = get('evolution', 'subheading',    'How we move your enterprise from 1.0 to 4.0.');
  const migrationTitle    = get('evolution', 'dashboard_label','Migration Dashboard');
  const migrationStats    = safeParse<MigrationStat[]>(get('evolution', 'stats_json', DEFAULT_MIGRATION_STATS), []);
  const foundationTitle   = get('evolution', 'foundation_headline', 'Autonomous Foundation');
  const foundationBody    = get('evolution', 'foundation_body',     "We don't just add a layer of AI; we rebuild your foundation to be self-healing and self-optimizing.");
  const foundationBadges  = safeParse<FoundationBadge[]>(get('evolution', 'badges_json', DEFAULT_FOUNDATION_BADGES), []);

  const ctaHeadline       = get('cta', 'headline',            'Modernize at Scale');
  const ctaBody           = get('cta', 'body_text',           'Our digital architects at DLF Cyber City are ready to map your enterprise evolution.');
  const ctaBtnLabel       = get('cta', 'btn_label',           'BOOK AUDIT');
  const ctaPhone          = get('cta', 'phone_number',        '+91 870023 6923');

  return (
    <main className="flex min-h-screen flex-col bg-[#020617] text-white overflow-x-hidden">
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] rounded-full blur-[120px] -z-10"
          style={{ background: `${accentFrom}1a` }} />
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-8 backdrop-blur-md"
            style={{ background: `${accentFrom}1a`, borderColor: `${accentFrom}33` }}>
            <RefreshCcw className="w-4 h-4 animate-spin-slow" style={{ color: accentFrom }} />
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: accentFrom }}>{badgeText}</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-tight">
            {heroPl}<br />
            <span className="text-transparent bg-clip-text italic"
              style={{ backgroundImage: `linear-gradient(to right, ${accentFrom}, ${accentTo})` }}>
              {heroAcc}
            </span>
          </h1>
          <p className="max-w-3xl mx-auto text-gray-400 text-lg md:text-xl leading-relaxed mb-12">{heroBody}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-10 py-5 font-bold rounded-2xl transition-all flex items-center gap-2 shadow-xl"
              style={{ background: accentFrom, boxShadow: `0 10px 30px ${accentFrom}33` }}>
              {heroBtnPrimary} <ArrowRight className="w-5 h-5" />
            </button>
            <button className="px-10 py-5 bg-white/5 border border-white/10 hover:bg-white/10 rounded-2xl font-bold transition-all">{heroBtnSecond}</button>
          </div>
        </div>
      </section>

      {/* ── PILLARS ──────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold italic mb-12 text-center">{pillarsTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pillars.map((item, i) => {
              const Icon = PILLAR_ICON_MAP[item.icon] ?? Cpu;
              return (
                <div key={i} className="group p-10 rounded-[2.5rem] border border-white/5 hover:border-blue-500/30 transition-all"
                  style={{ background: `${accentFrom}08` }}>
                  <div className="mb-6 p-4 rounded-2xl inline-block group-hover:bg-blue-600 group-hover:text-white transition-all"
                    style={{ background: `${accentFrom}1a` }}>
                    <Icon className="w-8 h-8" style={{ color: accentFrom }} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                  <p className="text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── EVOLUTION ────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold italic mb-4">{evolutionTitle}</h2>
          <p className="text-gray-500">{evolutionSubhead}</p>
        </div>
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center pt-12">
          <div className="relative p-10 border border-white/10 rounded-[3rem]"
            style={{ backgroundImage: `linear-gradient(to bottom right, ${accentFrom}1a, transparent)` }}>
            <div className="flex items-center gap-4 mb-8">
              <Activity className="w-8 h-8" style={{ color: accentFrom }} />
              <h3 className="text-2xl font-black italic">{migrationTitle}</h3>
            </div>
            <div className="space-y-6">
              {migrationStats.map((stat, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between text-xs font-mono uppercase text-gray-400">
                    <span>{stat.label}</span><span>{stat.val}%</span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${stat.val}%`, background: accentFrom }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-3xl font-bold mb-6">{foundationTitle}</h3>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">{foundationBody}</p>
            <div className="grid grid-cols-2 gap-4">
              {foundationBadges.map((badge, i) => {
                const Icon = FOUNDATION_ICON_MAP[badge.icon] ?? ShieldCheck;
                return (
                  <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/5">
                    <Icon className="mb-2 w-5 h-5" style={{ color: accentFrom }} />
                    <p className="text-sm font-bold">{badge.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <div className="py-12 border-y border-white/5"><ExecutionFlow /></div>
      <FeatureGrid />
      <SuccessStories />

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto rounded-[4rem] p-12 md:p-24 text-center border backdrop-blur-3xl"
          style={{ backgroundImage: `linear-gradient(to bottom right, ${accentFrom}66, ${accentTo}66)`, borderColor: `${accentFrom}33` }}>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-7xl font-black mb-8 italic tracking-tighter uppercase">{ctaHeadline}</h2>
            <p className="text-blue-100/70 text-lg md:text-xl mb-12 max-w-2xl mx-auto">{ctaBody}</p>
            <div className="flex flex-col items-center gap-6">
              <button className="bg-white px-16 py-6 rounded-full font-black text-2xl hover:scale-110 transition-all shadow-2xl"
                style={{ color: accentTo }}>{ctaBtnLabel}</button>
              <div className="font-mono text-sm tracking-widest" style={{ color: accentFrom }}>{ctaPhone}</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}