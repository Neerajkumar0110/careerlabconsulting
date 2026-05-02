"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import { usePageContent } from '@/hooks/usePageContent';
import {
  Shield,
  Rocket,
  Clock,
  Layers,
  ArrowRight,
  Gem,
  BarChart4,
  HelpCircle,
  Zap,
} from 'lucide-react';

// ── Icon map ─────────────────────────────────────────────────────────────────
const ICON_MAP: Record<string, React.ElementType> = { Shield, Clock, Layers, Zap, Rocket };

// ── Types ─────────────────────────────────────────────────────────────────────
interface Inclusion    { title: string; desc: string; icon: string }
interface MetricItem   { label: string; val: string }

function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

const DEFAULT_INCLUSIONS = JSON.stringify([
  { title: 'Core Dev Support',       desc: 'Dedicated 40 hours/month of senior engineering for maintenance and minor feature updates.', icon: 'Layers'  },
  { title: 'Standard Security',      desc: 'Monthly vulnerability scans and automated patch management for your core infrastructure.',   icon: 'Shield'  },
  { title: 'Business Day Response',  desc: 'Guaranteed 8-hour response time during business hours for all non-critical tickets.',       icon: 'Clock'   },
]);
const DEFAULT_METRICS = JSON.stringify([
  { label: 'Uptime Commitment', val: '99.9%'  },
  { label: 'Monthly Dev Hours',  val: '40 hrs' },
  { label: 'Dedicated PM',       val: 'Shared' },
]);
const DEFAULT_FAQ = JSON.stringify([
  "Can I upgrade to Gold tier anytime?",
  "What defines a 'Minor Feature Update'?",
  "Do unused hours roll over to next month?",
]);

export default function SilverTierPage() {
  const { get } = usePageContent('services-silver');

  // ── Hero ────────────────────────────────────────────────────────────────
  const badgeText      = get('hero', 'badge_text',      'Growth-Stage Partnership');
  const headlinePlain  = get('hero', 'headline_plain',  'Silver');
  const headlineAccent = get('hero', 'headline_accent', 'Tier Support.');
  const bodyText       = get('hero', 'body_text',       'Perfect for startups and mid-sized enterprises.');
  const btnLabel       = get('hero', 'btn_label',       'Get Started with Silver');
  const btnHref        = get('hero', 'btn_href',        '/contact');
  const accentFrom     = get('hero', 'accent_from',     '#cbd5e1');
  const accentTo       = get('hero', 'accent_to',       '#94a3b8');
  const metrics        = safeParse<MetricItem[]>(get('hero', 'metrics_json', DEFAULT_METRICS), []);

  // ── Features ────────────────────────────────────────────────────────────
  const sectionLabel   = get('features', 'section_label',   'Feature Breakdown');
  const inclusions     = safeParse<Inclusion[]>(get('features', 'inclusions_json', DEFAULT_INCLUSIONS), []);

  // ── FAQ ─────────────────────────────────────────────────────────────────
  const faqHeadline    = get('faq', 'headline',         'Common Questions');
  const questions      = safeParse<string[]>(get('faq', 'questions_json', DEFAULT_FAQ), []);

  // ── CTA ─────────────────────────────────────────────────────────────────
  const ctaLine1       = get('cta', 'headline_line1',   'Build Sustainably.');
  const ctaLine2       = get('cta', 'headline_line2',   'Think Silver.');
  const ctaBody        = get('cta', 'body_text',        "High-quality support doesn't always need a high-end price tag.");
  const ctaBtnLabel    = get('cta', 'btn_label',        'Check Eligibility');
  const ctaBtnHref     = get('cta', 'btn_href',         '/contact');

  return (
    <main className="min-h-screen bg-[#020617] text-slate-100 selection:bg-slate-500/30 font-sans">
      <Navbar />

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 md:pt-52 md:pb-32 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,_rgba(148,163,184,0.1)_0%,_transparent_70%)] -z-10" />
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-500/10 border border-slate-500/20 mb-8 backdrop-blur-xl">
              <Gem size={14} className="text-slate-400" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300">{badgeText}</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85] mb-8">
              {headlinePlain} <br />
              <span
                className="italic font-black"
                style={{
                  backgroundImage: `linear-gradient(to right, ${accentFrom}, ${accentTo})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {headlineAccent}
              </span>
            </h1>
            <p className="max-w-xl text-slate-400 text-lg font-light leading-relaxed mb-10">{bodyText}</p>
            <button
              onClick={() => window.location.href = btnHref}
              className="bg-slate-100 hover:bg-white text-black px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center gap-3 transition-all shadow-xl shadow-white/5"
            >
              {btnLabel} <ArrowRight size={16} />
            </button>
          </div>

          <div className="lg:w-1/2 relative group w-full">
            <div className="absolute -inset-4 bg-slate-500/10 blur-3xl rounded-full" />
            <div className="relative p-1 rounded-[3rem]" style={{ background: `linear-gradient(to bottom right, ${accentFrom}4d, transparent)` }}>
              <div className="bg-slate-950 p-10 rounded-[2.8rem] border border-white/5">
                <h3 className="text-xs font-black text-slate-500 uppercase tracking-[0.4em] mb-8 italic text-center">Standard Package Metrics</h3>
                <div className="space-y-8">
                  {metrics.map((item, i) => (
                    <div key={i} className="flex justify-between items-end border-b border-white/5 pb-2">
                      <span className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">{item.label}</span>
                      <span className="text-xl font-black italic text-slate-200">{item.val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ──────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center text-[10px] font-black uppercase tracking-[0.5em] text-slate-500 mb-16 italic">{sectionLabel}</h2>
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
            {inclusions.map((item, i) => {
              const Icon = ICON_MAP[item.icon] ?? Shield;
              return (
                <div key={i} className="p-10 rounded-[2.5rem] bg-slate-900/30 border border-white/5 hover:border-slate-500/30 transition-all">
                  <div className="mb-6 text-slate-400"><Icon size={24} /></div>
                  <h4 className="text-xl font-black uppercase italic mb-3 tracking-tighter">{item.title}</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <HelpCircle className="text-slate-500" />
            <h3 className="text-2xl font-black uppercase italic tracking-tighter">{faqHeadline}</h3>
          </div>
          <div className="space-y-6">
            {questions.map((q, i) => (
              <div key={i} className="group p-6 rounded-2xl border border-white/5 bg-slate-900/40 flex justify-between items-center cursor-pointer hover:bg-slate-900 transition-all">
                <span className="text-slate-300 font-medium text-sm">{q}</span>
                <ArrowRight size={14} className="text-slate-600 group-hover:text-white transition-all" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto p-12 md:p-24 rounded-[4rem] bg-gradient-to-br from-slate-800/40 via-slate-900/40 to-slate-950 border border-slate-500/20 text-center relative overflow-hidden shadow-2xl">
          <div className="relative z-10">
            <BarChart4 className="mx-auto text-slate-400 mb-8" size={48} />
            <h2 className="text-4xl md:text-7xl font-black italic uppercase tracking-tighter mb-8 leading-none">
              {ctaLine1} <br />
              <span className="text-slate-400 italic">{ctaLine2}</span>
            </h2>
            <p className="text-slate-400 mb-12 max-w-lg mx-auto font-light">{ctaBody}</p>
            <button
              onClick={() => window.location.href = ctaBtnHref}
              className="bg-white text-black px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:scale-105 transition-all"
            >
              {ctaBtnLabel}
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}