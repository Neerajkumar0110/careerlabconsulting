// app/internx/ai-product-manager/page.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { Layers, Brain, BarChart3, Target, Users, ArrowRight } from 'lucide-react';
import B2CHeader from '@/components/b2c/B2CHeader';
import Footer from '@/components/b2c/Footer';
import { usePageContent } from '@/hooks/usePageContent';

// ── Icon map ──────────────────────────────────────────────────────────────────
const ICON_MAP: Record<string, React.ElementType> = { Layers, Brain, BarChart3, Target, Users, ArrowRight };

// ── Helpers ───────────────────────────────────────────────────────────────────
function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

// ── Types ─────────────────────────────────────────────────────────────────────
interface StatItem   { label: string; value: string }
interface CardItem   { id: number; icon: string; title: string; description: string }

// ── Defaults ──────────────────────────────────────────────────────────────────
const DEFAULT_STATS = JSON.stringify([
  { label: 'Weeks', value: '12+' }, { label: 'Case Studies', value: '8+' },
  { label: 'AI Tools', value: '10+' }, { label: 'Career Support', value: '100%' },
]);
const DEFAULT_WHY_CARDS = JSON.stringify([
  { id: 1, icon: 'Brain',  title: 'AI-Driven Products',          description: 'Every modern product now integrates AI for personalization, automation, and insights.' },
  { id: 2, icon: 'Target', title: 'Strategic Impact',            description: 'AI PMs define vision, prioritize features, and align teams to business outcomes.' },
  { id: 3, icon: 'Users',  title: 'Cross-Functional Leadership', description: 'Work closely with engineers, designers, data scientists, and stakeholders.' },
]);
const DEFAULT_LEARN_ITEMS = JSON.stringify([
  'AI product lifecycle & strategy', 'User research & problem discovery',
  'PRDs & AI feature specifications', 'Data metrics & KPI definition',
  'Experimentation & A/B testing', 'AI model trade-offs & limitations',
  'Ethics & responsible AI decisions', 'Go-to-market & product launches',
  'Stakeholder communication', 'Product analytics & iteration',
]);
const DEFAULT_EXP_CARDS = JSON.stringify([
  { id: 1, icon: 'Layers',    title: 'Real AI Products',      description: 'Work on real AI product case studies from ideation to launch.' },
  { id: 2, icon: 'BarChart3', title: 'Data-Backed Decisions', description: 'Use analytics to prioritize features and measure success.' },
  { id: 3, icon: 'ArrowRight',title: 'Career Readiness',      description: 'Portfolio projects, PM interview prep, and career guidance.' },
]);

// ── Subcomponents ─────────────────────────────────────────────────────────────
function Feature({ icon: Icon, title, desc, accent }: { icon: React.ElementType; title: string; desc: string; accent: string }) {
  return (
    <div
      className="p-8 rounded-2xl border border-white/10 bg-white/5 transition"
      onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = `${accent}4d`; (e.currentTarget as HTMLDivElement).style.background = `${accent}0d`; }}
      onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.1)'; (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.05)'; }}
    >
      <Icon className="w-7 h-7 mb-5" style={{ color: accent }} />
      <h3 className="font-bold text-lg mb-3">{title}</h3>
      <p className="text-sm text-slate-400 leading-relaxed">{desc}</p>
    </div>
  );
}

export default function InternXAIProductManagerPage() {
  const { get } = usePageContent('internx-ai-product-manager');

  const accent          = get('hero', 'accent_color',        '#6366f1');
  const badgeText       = get('hero', 'badge_text',          'InternX Program');
  const headline        = get('hero', 'headline',            'AI Product Manager Internship');
  const heroBody        = get('hero', 'body_text',           'Learn how to build, launch, and scale AI-powered products.');
  const btnPrimaryLabel = get('hero', 'btn_primary_label',   'Apply Now');
  const btnPrimaryHref  = get('hero', 'btn_primary_href',    '/b2c/apply');
  const btnSecLabel     = get('hero', 'btn_secondary_label', 'Find My Program');
  const btnSecHref      = get('hero', 'btn_secondary_href',  '/b2c/program-finder');
  const heroImage       = get('hero', 'hero_image_url',      'https://img.freepik.com/free-photo/businessman-using-futuristic-technology-with-digital-interface_23-2151964658.jpg');

  const stats      = safeParse<StatItem[]>(get('stats', 'items_json', DEFAULT_STATS), []);
  const whyCards   = safeParse<CardItem[]>(get('why',  'cards_json',  DEFAULT_WHY_CARDS),  []);
  const learnItems = safeParse<string[]>(get('learn',  'items_json',  DEFAULT_LEARN_ITEMS), []);
  const expCards   = safeParse<CardItem[]>(get('experience', 'cards_json', DEFAULT_EXP_CARDS), []);

  const whyHeadline  = get('why',        'headline', 'Why AI Product Management?');
  const learnHeadline= get('learn',      'headline', 'What You Will Learn');
  const expHeadline  = get('experience', 'headline', 'Internship Experience');

  const ctaHeadline  = get('cta', 'headline',            'Lead the Future of AI Products');
  const ctaBody      = get('cta', 'body_text',           'Build the skills needed to manage and scale AI-powered products.');
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
            {whyCards.map(c => {
              const Icon = ICON_MAP[c.icon] ?? ArrowRight;
              return <Feature key={c.id} icon={Icon} title={c.title} desc={c.description} accent={accent} />;
            })}
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
            {expCards.map(c => {
              const Icon = ICON_MAP[c.icon] ?? ArrowRight;
              return <Feature key={c.id} icon={Icon} title={c.title} desc={c.description} accent={accent} />;
            })}
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
            <Link href={ctaPrimHref}
              className="px-14 py-5 rounded-xl font-black text-xs uppercase tracking-widest shadow-xl"
              style={{ background: accent, boxShadow: `0 20px 30px ${accent}66` }}>
              {ctaPrimLabel}
            </Link>
            <Link href={ctaSecHref} className="border border-white/20 px-14 py-5 rounded-xl font-bold text-xs uppercase tracking-widest">
              {ctaSecLabel}
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}