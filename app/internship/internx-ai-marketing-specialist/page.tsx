// app/internx/ai-marketing-specialist/page.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { Megaphone, Brain, BarChart3, Target, Users, ArrowRight, TrendingUp } from 'lucide-react';
import B2CHeader from '@/components/b2c/B2CHeader';
import Footer from '@/components/b2c/Footer';
import { usePageContent } from '@/hooks/usePageContent';

// ── Icon map ──────────────────────────────────────────────────────────────────
const ICON_MAP: Record<string, React.ElementType> = { Megaphone, Brain, BarChart3, Target, Users, ArrowRight, TrendingUp };

// ── Helpers ───────────────────────────────────────────────────────────────────
function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

// ── Types ─────────────────────────────────────────────────────────────────────
interface StatItem { label: string; value: string }
interface CardItem { id: number; icon: string; title: string; description: string }

// ── Defaults ──────────────────────────────────────────────────────────────────
const DEFAULT_STATS = JSON.stringify([
  { label: 'Weeks', value: '12+' }, { label: 'Campaigns', value: '10+' },
  { label: 'AI Tools', value: '15+' }, { label: 'Career Support', value: '100%' },
]);
const DEFAULT_WHY_CARDS = JSON.stringify([
  { id: 1, icon: 'Brain',  title: 'AI-First Growth',          description: 'AI transforms how brands acquire, retain, and engage customers.' },
  { id: 2, icon: 'Target', title: 'Precision Targeting',      description: 'Use data and AI to reach the right audience at the right time.' },
  { id: 3, icon: 'Users',  title: 'Customer-Centric Strategy',description: 'Design personalized, high-impact customer journeys.' },
]);
const DEFAULT_LEARN_ITEMS = JSON.stringify([
  'AI-driven digital marketing strategies', 'Performance & growth analytics',
  'Marketing automation & workflows', 'SEO, paid ads & campaign optimization',
  'Customer segmentation & personalization', 'A/B testing & experimentation',
  'AI tools for content & creatives', 'Go-to-market planning',
  'Brand & product positioning', 'Marketing dashboards & reporting',
]);
const DEFAULT_EXP_CARDS = JSON.stringify([
  { id: 1, icon: 'Megaphone', title: 'Real Campaigns',   description: 'Work on live AI-powered marketing campaigns and funnels.' },
  { id: 2, icon: 'BarChart3', title: 'Growth Metrics',   description: 'Measure ROI, CAC, LTV, and performance metrics.' },
  { id: 3, icon: 'ArrowRight',title: 'Career Readiness', description: 'Portfolio projects, interview prep, and placement guidance.' },
]);

// ── Subcomponents ─────────────────────────────────────────────────────────────
function Feature({ icon: Icon, title, desc, accent }: { icon: React.ElementType; title: string; desc: string; accent: string }) {
  return (
    <div
      className="p-8 rounded-2xl border border-white/10 bg-white/5 transition cursor-default"
      onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = `${accent}4d`; (e.currentTarget as HTMLDivElement).style.background = `${accent}0d`; }}
      onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.1)'; (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.05)'; }}
    >
      <Icon className="w-7 h-7 mb-5" style={{ color: accent }} />
      <h3 className="font-bold text-lg mb-3">{title}</h3>
      <p className="text-sm text-slate-400 leading-relaxed">{desc}</p>
    </div>
  );
}

export default function InternXAIMarketingSpecialistPage() {
  const { get } = usePageContent('internx-ai-marketing-specialist');

  const accent          = get('hero', 'accent_color',        '#ec4899');
  const badgeText       = get('hero', 'badge_text',          'InternX Program');
  const headline        = get('hero', 'headline',            'AI Marketing Specialist Internship');
  const heroBody        = get('hero', 'body_text',           'Learn how to use AI to drive growth, optimize campaigns, and scale digital products.');
  const btnPrimaryLabel = get('hero', 'btn_primary_label',   'Apply Now');
  const btnPrimaryHref  = get('hero', 'btn_primary_href',    '/b2c/apply');
  const btnSecLabel     = get('hero', 'btn_secondary_label', 'Find My Program');
  const btnSecHref      = get('hero', 'btn_secondary_href',  '/b2c/program-finder');
  const heroImage       = get('hero', 'hero_image_url',      'https://img.freepik.com/free-photo/businessman-working-futuristic-office_23-2151003702.jpg');

  const stats      = safeParse<StatItem[]>(get('stats',      'items_json',  DEFAULT_STATS),       []);
  const whyCards   = safeParse<CardItem[]>(get('why',        'cards_json',  DEFAULT_WHY_CARDS),   []);
  const learnItems = safeParse<string[]>(get('learn',        'items_json',  DEFAULT_LEARN_ITEMS), []);
  const expCards   = safeParse<CardItem[]>(get('experience', 'cards_json',  DEFAULT_EXP_CARDS),   []);

  const whyHeadline  = get('why',        'headline', 'Why AI Marketing?');
  const learnHeadline= get('learn',      'headline', 'What You Will Learn');
  const expHeadline  = get('experience', 'headline', 'Internship Experience');

  const ctaHeadline  = get('cta', 'headline',            'Become an AI-Powered Marketing Leader');
  const ctaBody      = get('cta', 'body_text',           'Build future-ready marketing skills powered by AI and data.');
  const ctaPrimLabel = get('cta', 'btn_primary_label',   'Apply Now');
  const ctaPrimHref  = get('cta', 'btn_primary_href',    '/b2c/apply');
  const ctaSecLabel  = get('cta', 'btn_secondary_label', 'Talk to Advisor');
  const ctaSecHref   = get('cta', 'btn_secondary_href',  '/b2c/contact');

  return (
    <main className="bg-[#0a0a0a] text-white">
      <B2CHeader />

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative pt-36 pb-28 overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(circle at top, ${accent}2e, transparent 60%)` }} />
        <div className="relative max-w-[1200px] mx-auto px-6 grid md:grid-cols-2 gap-14 items-center">
          <div>
            <span
              className="inline-flex items-center gap-2 mb-5 px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest"
              style={{ border: `1px solid ${accent}4d`, background: `${accent}1a`, color: accent }}
            >
              {badgeText}
            </span>
            <h1 className="text-2xl md:text-4xl font-black leading-tight">{headline}</h1>
            <p className="mt-6 text-sm text-slate-400 max-w-xl">{heroBody}</p>
            <div className="mt-12 flex flex-wrap gap-4">
              <Link href={btnPrimaryHref}
                className="px-10 py-4 rounded-xl font-black text-xs uppercase tracking-widest flex items-center gap-2 shadow-xl"
                style={{ background: accent, boxShadow: `0 20px 30px ${accent}4d` }}>
                {btnPrimaryLabel} <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href={btnSecHref}
                className="border border-white/20 px-10 py-4 rounded-xl font-bold text-xs uppercase tracking-widest transition-all"
                onMouseEnter={e => (e.currentTarget.style.borderColor = `${accent}80`)}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)')}>
                {btnSecLabel}
              </Link>
            </div>
          </div>
          <div className="relative hidden md:flex justify-end">
            <img src={heroImage} alt={headline} className="drop-shadow-2xl" />
          </div>
        </div>
      </section>

      {/* ── STATS ─────────────────────────────────────────────────────────── */}
      <section className="py-16 border-b border-white/10 bg-[#0d0d0d]">
        <div className="max-w-[1200px] mx-auto px-6 grid md:grid-cols-4 gap-8 text-center">
          {stats.map(s => (
            <div key={s.label}>
              <div className="text-3xl font-black" style={{ color: accent }}>{s.value}</div>
              <div className="mt-2 text-sm text-slate-400 uppercase tracking-widest">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── WHY ───────────────────────────────────────────────────────────── */}
      <section className="py-28 border-b border-white/10">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-black mb-16">{whyHeadline}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {whyCards.map(c => { const Icon = ICON_MAP[c.icon] ?? ArrowRight; return <Feature key={c.id} icon={Icon} title={c.title} desc={c.description} accent={accent} />; })}
          </div>
        </div>
      </section>

      {/* ── LEARN ─────────────────────────────────────────────────────────── */}
      <section className="py-28 border-b border-white/10 bg-[#0d0d0d]">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-black mb-16">{learnHeadline}</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {learnItems.map(item => (
              <div key={item}
                className="p-5 rounded-xl border border-white/10 bg-white/5 transition cursor-default"
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = `${accent}0d`; (e.currentTarget as HTMLDivElement).style.borderColor = `${accent}4d`; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.05)'; (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.1)'; }}>
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EXPERIENCE ────────────────────────────────────────────────────── */}
      <section className="py-28 border-b border-white/10">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-black mb-16">{expHeadline}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {expCards.map(c => { const Icon = ICON_MAP[c.icon] ?? ArrowRight; return <Feature key={c.id} icon={Icon} title={c.title} desc={c.description} accent={accent} />; })}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────────────────────── */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: `linear-gradient(to top right, ${accent}33, transparent)` }} />
        <div className="relative max-w-[900px] mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-black">{ctaHeadline}</h2>
          <p className="mt-6 text-slate-400">{ctaBody}</p>
          <div className="mt-14 flex justify-center gap-4">
            <Link href={ctaPrimHref} className="px-14 py-5 rounded-xl font-black text-xs uppercase tracking-widest shadow-xl"
              style={{ background: accent, boxShadow: `0 20px 30px ${accent}66` }}>{ctaPrimLabel}</Link>
            <Link href={ctaSecHref} className="border border-white/20 px-14 py-5 rounded-xl font-bold text-xs uppercase tracking-widest">{ctaSecLabel}</Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}