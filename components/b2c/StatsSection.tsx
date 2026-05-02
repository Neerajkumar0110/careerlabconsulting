'use client';

import React from 'react';
import {
  Globe2, Users2, Building2, Clock, Award, Zap
} from 'lucide-react';
import { usePageContent } from '@/hooks/usePageContent';

// ── Helpers ───────────────────────────────────────────────────────────────────
function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

// ── Types ─────────────────────────────────────────────────────────────────────
interface StatItem {
  label: string;
  value: string;
  icon: string;
  color: string;
  glow: string;
}

// ── Icon map ──────────────────────────────────────────────────────────────────
const ICON_MAP: Record<string, React.ElementType> = {
  Globe2, Users2, Building2, Clock, Award, Zap,
};

// ── Tailwind color → CSS value helper ─────────────────────────────────────────
// We rely on Tailwind for the colour classes (they're already in the JSON);
// inline the glow via a data attribute workaround is fine because the strings
// are direct Tailwind class names that have already been included via the seeded JSON.

// ── Default payload ───────────────────────────────────────────────────────────
const DEFAULT_STATS: StatItem[] = [
  { label: 'Countries',               value: '27+',        icon: 'Globe2',    color: 'text-blue-400',   glow: 'group-hover:shadow-[0_0_25px_rgba(96,165,250,0.4)]'   },
  { label: 'Internx Batches',         value: '103+',       icon: 'Zap',       color: 'text-amber-400',  glow: 'group-hover:shadow-[0_0_25px_rgba(251,191,36,0.4)]'   },
  { label: 'Global Corporate Partners',value: '260+',      icon: 'Building2', color: 'text-emerald-400',glow: 'group-hover:shadow-[0_0_25px_rgba(52,211,153,0.4)]'   },
  { label: 'Internx Trained Students', value: '15000+',    icon: 'Users2',    color: 'text-purple-400', glow: 'group-hover:shadow-[0_0_25px_rgba(192,132,252,0.4)]'  },
  { label: 'Training Hours Completed', value: '1+ Million',icon: 'Clock',     color: 'text-cyan-400',   glow: 'group-hover:shadow-[0_0_25px_rgba(34,211,238,0.4)]'   },
  { label: 'Industry Trainers',        value: '718+',      icon: 'Award',     color: 'text-rose-400',   glow: 'group-hover:shadow-[0_0_25px_rgba(251,113,133,0.4)]'  },
];

export default function GlobalImpactSection() {
  const { get } = usePageContent('global-impact');

  // ── CMS values ─────────────────────────────────────────────────────────────
  const badgeText         = get('header', 'badge_text',          'Global Footprint');
  const headline1         = get('header', 'headline_1',          'Global Leader in');
  const headline2         = get('header', 'headline_2',          'Professional');
  const headline3         = get('header', 'headline_3',          'Training');
  const accentColor       = get('header', 'accent_color',        '#3b82f6');

  const backgroundImage   = get('stats',  'background_image',    'https://bostoninstituteofanalytics.b-cdn.net/wp-content/uploads/2023/12/video-placeholder.webp');
  const bgOpacityRaw      = get('stats',  'background_opacity',  '0.4');
  const bgOpacity         = parseFloat(bgOpacityRaw) || 0.4;

  const statsRaw          = get('stats',  'stats_json',          JSON.stringify(DEFAULT_STATS));
  const stats             = safeParse<StatItem[]>(statsRaw, DEFAULT_STATS);

  return (
    <section className="py-24 bg-[#020617] relative overflow-hidden min-h-screen flex items-center">

      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src={backgroundImage}
          alt="Background"
          className="w-full h-full object-cover"
          style={{ opacity: bgOpacity }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-[#020617]/80 to-[#020617]" />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">

        {/* Header */}
        <div className="text-center flex flex-col items-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-6 backdrop-blur-xl"
            style={{ background: `${accentColor}1a`, borderColor: `${accentColor}33` }}>
            <Globe2 className="w-4 h-4" style={{ color: accentColor }} />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]" style={{ color: accentColor }}>
              {badgeText}
            </span>
          </div>

          <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-6 leading-[1] max-w-4xl">
            {headline1} <br />
            <span className="italic" style={{ color: 'transparent', WebkitTextFillColor: 'transparent', backgroundImage: `linear-gradient(to right, ${accentColor}, #67e8f9, ${accentColor})`, WebkitBackgroundClip: 'text', backgroundClip: 'text' }}>
              {headline2}
            </span>{' '}
            {headline3}
          </h2>

          <div className="flex items-center justify-center gap-2">
            <div className="h-[2px] w-12 rounded-full" style={{ background: accentColor }} />
            <div className="w-2.5 h-2.5 rotate-45 shadow-[0_0_10px_rgba(96,165,250,0.8)]" style={{ background: accentColor }} />
            <div className="h-[2px] w-12 rounded-full" style={{ background: accentColor }} />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
          {stats.map((stat, index) => {
            const Icon = ICON_MAP[stat.icon] ?? Globe2;
            return (
              <div
                key={index}
                className={`group relative p-10 rounded-[3rem] border border-white/5 hover:border-blue-500/40 transition-all duration-500 backdrop-blur-xl flex flex-col items-center text-center justify-center min-h-[300px] ${stat.glow}`}
                style={{ background: 'rgba(15,23,42,0.4)' }}
              >
                <div className="absolute inset-0 rounded-[3rem] transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                  style={{ background: `${accentColor}0d` }} />

                <div className="relative z-10 flex flex-col items-center space-y-6 w-full">
                  <div className={`w-20 h-20 rounded-3xl bg-white/[0.03] border border-white/10 flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-2`}>
                    <Icon className={`w-10 h-10 ${stat.color}`} />
                  </div>

                  <div className="space-y-2">
                    <div className="text-5xl md:text-6xl font-black text-white tracking-tighter tabular-nums leading-none">
                      {stat.value}
                    </div>
                    <div className="text-xs font-black text-slate-400 uppercase tracking-[0.25em] leading-relaxed max-w-[200px] group-hover:text-white transition-colors duration-300">
                      {stat.label}
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-6 w-8 h-[2px] group-hover:w-16 transition-all duration-500"
                  style={{ background: `${accentColor}33` }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = accentColor; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = `${accentColor}33`; }}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Corner glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] -mr-64 pointer-events-none"
        style={{ background: `${accentColor}1a`, filter: 'blur(150px)', borderRadius: '50%' }} />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] -ml-64 pointer-events-none"
        style={{ background: 'rgba(6,182,212,0.1)', filter: 'blur(150px)', borderRadius: '50%' }} />
    </section>
  );
}