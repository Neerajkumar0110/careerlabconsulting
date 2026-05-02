'use client';

import React, { useEffect, useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { usePageContent } from '@/hooks/usePageContent';

function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

interface MethodologyStep { number: string; title: string; }
interface StatItem { value: string; label: string; accentColor: string; }

const DEFAULT_STEPS: MethodologyStep[] = [
  { number: '1', title: 'Strategic alignment and planning' },
  { number: '2', title: 'Proof of Value' },
  { number: '3', title: 'Process augmentation' },
];

const DEFAULT_STATS: StatItem[] = [
  { value: '30+', label: 'Agents Live', accentColor: '#ef4444' },
  { value: '5x',  label: 'Avg. ROI',   accentColor: '#3b82f6' },
];

const MethodologySection = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => { setIsMounted(true); }, []);

  const { get } = usePageContent('home');

  // ── CMS values ──────────────────────────────────────────────────────────────
  const accentColor       = get('methodology', 'accent_color',         '#3b82f6');
  const badgeText         = get('methodology', 'badge_text',           'Our Process');
  const headlinePlain     = get('methodology', 'headline_plain',       'The');
  const headlineAccent    = get('methodology', 'headline_accent',      'TriStorm');
  const headlineSuffix    = get('methodology', 'headline_suffix',      'methodology');
  const bodyText          = get('methodology', 'body_text',            'After 30+ AI implementations, we identified the patterns that separate successful leaders from failed experiments. Experience works for you.');
  const bodyAccentPhrase  = get('methodology', 'body_accent_phrase',   'successful leaders');
  const ctaPrimaryLabel   = get('methodology', 'cta_primary_label',    'Explore Methodology');
  const ctaSecondaryLabel = get('methodology', 'cta_secondary_label',  'View Case Studies');
  const ctaSecondaryHref  = get('methodology', 'cta_secondary_href',   '#case-studies');
  const stepsRaw          = get('methodology', 'steps_json',           JSON.stringify(DEFAULT_STEPS));
  const statsRaw          = get('methodology', 'stats_json',           JSON.stringify(DEFAULT_STATS));

  const steps = safeParse<MethodologyStep[]>(stepsRaw, DEFAULT_STEPS);
  const stats = safeParse<StatItem[]>(statsRaw, DEFAULT_STATS);

  const renderBody = () => {
    if (!bodyAccentPhrase || !bodyText.includes(bodyAccentPhrase)) {
      return <>{bodyText}</>;
    }
    const [before, after] = bodyText.split(bodyAccentPhrase);
    return (
      <>
        {before}
        <span className="text-white">{bodyAccentPhrase}</span>
        {after}
      </>
    );
  };

  return (
    <section className="relative py-16 md:py-32 px-4 md:px-12 bg-[#020617] overflow-hidden">
      <div
        className="absolute top-1/2 left-0 -translate-y-1/2 w-72 h-72 rounded-full blur-[120px] -z-10 animate-pulse will-change-[opacity,transform]"
        style={{ background: `${accentColor}1a` }}
        aria-hidden="true"
      />
      <div
        className="absolute top-1/4 right-0 w-64 h-64 rounded-full blur-[100px] -z-10"
        style={{ background: '#6366f11a' }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">

          {/* ── LEFT: Text ────────────────────────────────────────────────── */}
          <div className="w-full lg:w-1/2 space-y-10 text-center lg:text-left">
            <div className="space-y-6">
              <div
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-bold uppercase tracking-[0.2em] mb-2 mx-auto lg:mx-0"
                style={{ background: `${accentColor}1a`, borderColor: `${accentColor}33`, color: accentColor }}
              >
                <Sparkles size={14} /> {badgeText}
              </div>

              <h2 className="text-5xl sm:text-6xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter">
                {headlinePlain}{' '}
                <span
                  className="text-transparent bg-clip-text"
                  style={{ backgroundImage: `linear-gradient(to right, ${accentColor}, #6366f1)` }}
                >
                  {headlineAccent}
                </span>{' '}
                <br className="hidden md:block" />
                {headlineSuffix}
              </h2>

              <p className="text-slate-400 text-lg md:text-xl leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium">
                {renderBody()}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start">
              <button
                type="button"
                className="group relative px-8 py-4 text-white rounded-xl font-bold transition-all duration-300 flex items-center gap-3 overflow-hidden"
                style={{
                  background: accentColor,
                  boxShadow: `0 0 20px ${accentColor}4d`,
                }}
              >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                {ctaPrimaryLabel}
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href={ctaSecondaryHref}
                className="text-slate-500 hover:text-white font-bold tracking-widest text-xs uppercase border-b-2 border-transparent py-1 transition-all"
                style={{ ['--hover-border' as string]: accentColor }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = accentColor)}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'transparent')}
              >
                {ctaSecondaryLabel}
              </a>
            </div>

            <dl className="flex flex-row justify-center lg:justify-start gap-12 pt-12 border-t border-white/5">
              {stats.map((stat) => (
                <div key={stat.label} className="relative pl-6">
                  <div
                    className="absolute left-0 top-0 bottom-0 w-1 rounded-full"
                    style={{ background: `linear-gradient(to bottom, ${stat.accentColor}, transparent)` }}
                  />
                  <dd className="text-4xl md:text-6xl font-black text-white">{stat.value}</dd>
                  <dt className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mt-2">{stat.label}</dt>
                </div>
              ))}
            </dl>
          </div>

          {/* ── RIGHT: Steps ──────────────────────────────────────────────── */}
          <div className="w-full lg:w-1/2 relative space-y-6 md:space-y-10">
            {steps.map((step, index) => (
              <div
                key={index}
                className="relative flex items-center justify-center lg:justify-end w-full group"
                style={{
                  transform: isMounted ? `translateX(calc(-30px * ${index}))` : 'none',
                }}
              >
                {index !== steps.length - 1 && (
                  <div
                    className="hidden lg:block absolute right-[50%] top-full w-px h-10"
                    style={{ background: `linear-gradient(to bottom, ${accentColor}80, transparent)` }}
                  />
                )}

                <span className="absolute -left-4 lg:-left-20 text-8xl md:text-[12rem] font-black text-white/5 select-none transition-all duration-700 pointer-events-none italic"
                  style={{ ['--hover-color' as string]: `${accentColor}1a` }}
                >
                  0{step.number}
                </span>

                <div
                  className="relative z-10 w-full max-w-md transform skew-x-0 lg:-skew-x-12 backdrop-blur-xl border p-8 md:p-12 rounded-2xl shadow-2xl transition-all duration-500 overflow-hidden"
                  style={{
                    background: 'rgba(15,23,42,0.4)',
                    borderColor: 'rgba(255,255,255,0.1)',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = `${accentColor}80`;
                    e.currentTarget.style.background = 'rgba(30,41,59,0.6)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                    e.currentTarget.style.background = 'rgba(15,23,42,0.4)';
                  }}
                >
                  <div
                    className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ background: `${accentColor}1a` }}
                  />
                  <h3 className="text-xl md:text-3xl font-bold text-white transform skew-x-0 lg:skew-x-12 tracking-tight text-center lg:text-left leading-tight">
                    {step.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default MethodologySection;