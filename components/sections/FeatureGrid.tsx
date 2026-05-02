'use client';

import Link from 'next/link';
import React from 'react';
import {
  Zap, ShieldCheck, MessageSquare, Languages, BarChart3, Infinity, ArrowRight,
  TrendingUp, Box, Globe, Users, CheckCircle2, Search, Cpu, Network, Settings,
  type LucideIcon,
} from 'lucide-react';
import { usePageContent } from '@/hooks/usePageContent';

function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

// ── Icon registry ─────────────────────────────────────────────────────────────
const ICON_MAP: Record<string, LucideIcon> = {
  Zap, ShieldCheck, MessageSquare, Languages, BarChart3, Infinity,
  TrendingUp, Box, Globe, Users, CheckCircle2, Search, Cpu, Network, Settings,
};

interface FeatureCard {
  title: string;
  desc: string;
  icon: string;
  gradient: string;
}

const DEFAULT_FEATURES: FeatureCard[] = [
  { title: 'Real-time Intelligence', desc: 'AI agents that process enterprise data and make decisions in under 30ms for maximum efficiency.', icon: 'Zap',            gradient: 'from-yellow-400 to-orange-500' },
  { title: 'Enterprise Security',    desc: 'Military-grade encryption with SOC2 Type II compliance standards ensuring data privacy.',        icon: 'ShieldCheck',    gradient: 'from-blue-400 to-indigo-600'   },
  { title: 'Omnichannel Support',    desc: 'Seamless AI integration across WhatsApp, Web, Voice, and Email platforms.',                     icon: 'MessageSquare',  gradient: 'from-purple-400 to-pink-600'   },
  { title: 'Global Language Support',desc: 'Communicate fluently in over 95+ regional and global languages with native accuracy.',         icon: 'Languages',      gradient: 'from-emerald-400 to-teal-600'  },
  { title: 'Predictive Analytics',   desc: 'Forecasting business trends using advanced neural networks and historical data points.',        icon: 'BarChart3',      gradient: 'from-cyan-400 to-blue-600'     },
  { title: 'Infinite Scalability',   desc: 'Handle 1 to 1,000,000 concurrent sessions without latency or performance drops.',              icon: 'Infinity',       gradient: 'from-red-400 to-rose-600'      },
];

// ── Component ─────────────────────────────────────────────────────────────────
export default function FeatureGrid() {
  const { get } = usePageContent('feature-grid2');

  const badgeText      = get('feature_grid', 'badge_text',      'Next-Gen AI Infrastructure');
  const headlineLine1  = get('feature_grid', 'headline_line1',  'Scale Your Business');
  const headlineLine2  = get('feature_grid', 'headline_line2',  'Without the Limits');
  const subheading     = get('feature_grid', 'subheading',      "Standard LLMs aren't enough for scale. Our proprietary architecture is built for companies that demand 99.9% accuracy and global reliability.");
  const subheadingBold = get('feature_grid', 'subheading_bold', '99.9% accuracy');
  const ctaHeadline    = get('feature_grid', 'cta_headline',    'Ready to automate your growth?');
  const ctaSubtext     = get('feature_grid', 'cta_subtext',     'Join 500+ enterprises building the future of work today.');
  const ctaBtnLabel    = get('feature_grid', 'cta_btn_label',   'Start Free Trial');
  const ctaBtnHref     = get('feature_grid', 'cta_btn_href',    '/contact');
  const accentFrom     = get('feature_grid', 'accent_from',     '#3b82f6');
  const accentTo       = get('feature_grid', 'accent_to',       '#6366f1');
  const featuresRaw    = get('feature_grid', 'features_json',   '');
  const features       = safeParse<FeatureCard[]>(featuresRaw, DEFAULT_FEATURES);

  const renderSubheading = () => {
    if (!subheadingBold || !subheading.includes(subheadingBold)) return <>{subheading}</>;
    const [before, after] = subheading.split(subheadingBold);
    return <>{before}<strong className="text-white font-semibold">{subheadingBold}</strong>{after}</>;
  };

  return (
    <section className="py-20 md:py-32 bg-[#020617] relative overflow-hidden" id="features" aria-labelledby="features-title">
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] blur-[120px] rounded-full pointer-events-none"
        style={{ backgroundColor: `${accentFrom}0d` }} aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <header>
            <span className="inline-block px-4 py-1.5 mb-6 text-[10px] font-black tracking-[0.2em] uppercase rounded-full border"
              style={{ color: accentFrom, backgroundColor: `${accentFrom}1a`, borderColor: `${accentFrom}33` }}>
              {badgeText}
            </span>
            <h2 id="features-title" className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight leading-[1.1]">
              {headlineLine1} <br />
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(to right, ${accentFrom}, ${accentTo})` }}>
                {headlineLine2}
              </span>
            </h2>
          </header>
          <p className="text-slate-400 text-lg md:text-xl leading-relaxed">{renderSubheading()}</p>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, i) => {
            const Icon = ICON_MAP[feature.icon] ?? Zap;
            return (
              <article key={i} className="group relative p-8 rounded-3xl bg-slate-900/30 border border-white/5 hover:border-blue-500/30 transition-all duration-500 hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-b from-blue-500/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl" aria-hidden="true" />
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${feature.gradient} p-0.5 mb-6 shadow-lg shadow-black/20`}>
                  <div className="w-full h-full bg-[#020617] rounded-[14px] flex items-center justify-center text-white">
                    <Icon className="w-6 h-6" strokeWidth={1.5} />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-3 tracking-tight">{feature.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed group-hover:text-slate-300 transition-colors">{feature.desc}</p>
                <div className="mt-6 flex items-center text-[10px] font-black tracking-widest opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0 uppercase"
                  style={{ color: accentFrom }}>
                  <span className="cursor-pointer">Learn More</span>
                  <ArrowRight className="ml-2 w-3.5 h-3.5" />
                </div>
              </article>
            );
          })}
        </div>

        {/* CTA Banner */}
        <div className="mt-20 p-8 md:p-14 rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between gap-10 shadow-2xl relative overflow-hidden group"
          style={{ backgroundImage: `linear-gradient(to bottom right, ${accentFrom}, ${accentTo})` }}>
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] pointer-events-none" />
          <div className="text-center md:text-left relative z-10">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight">{ctaHeadline}</h3>
            <p className="text-blue-100/80 text-lg">{ctaSubtext}</p>
          </div>
          <Link href={ctaBtnHref}>
            <button aria-label={ctaBtnLabel} className="relative z-10 whitespace-nowrap px-12 py-5 bg-white font-black uppercase text-xs tracking-widest rounded-2xl hover:bg-blue-50 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] transition-all active:scale-95"
              style={{ color: accentFrom }}>
              {ctaBtnLabel}
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}