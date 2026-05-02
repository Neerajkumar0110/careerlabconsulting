'use client';

import React, { useEffect, useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { usePageContent } from '@/hooks/usePageContent';

function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

const DEFAULT_STEPS = [
  { number: '1', title: 'Integrate AI into your existing systems' },
  { number: '2', title: 'Configure modules and define roles' },
  { number: '3', title: 'Autonomous execution with real-time intelligence' },
];

const HowItWorksSection = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => { setIsMounted(true); }, []);

  const { get } = usePageContent('how-it-works');

  // ── CMS values ──────────────────────────────────────────────────────────────
  const badgeText       = get('how_it_works', 'badge_text',        'How It Works');
  const headlinePrefix  = get('how_it_works', 'headline_prefix',   'The');
  const headlineAccent  = get('how_it_works', 'headline_accent',   'Autonomous Flow');
  const headlineSuffix  = get('how_it_works', 'headline_suffix',   'in 3 Steps');
  const bodyText        = get('how_it_works', 'body_text',         'Deploy your AI workforce seamlessly. Plug, configure, and let it execute tasks autonomously, while gaining real-time intelligence. Three simple steps to full automation.');
  const primaryBtnLabel = get('how_it_works', 'primary_btn_label', 'Explore Process');
  const whatsappNumber  = get('how_it_works', 'whatsapp_number',   '918700236923');
  const whatsappMsg     = get('how_it_works', 'whatsapp_message',  'I want to explore the process about AI agents.');
  const secondaryLabel  = get('how_it_works', 'secondary_btn_label', 'Watch Demo');
  const secondaryLink   = get('how_it_works', 'secondary_btn_link', 'https://www.youtube.com/@careerlabconsulting4691');
  const stepsRaw        = get('how_it_works', 'steps_json',        JSON.stringify(DEFAULT_STEPS));
  const accentFrom      = get('how_it_works', 'accent_from',       '#60a5fa');
  const accentTo        = get('how_it_works', 'accent_to',         '#6366f1');

  const steps = safeParse<{ number: string; title: string }[]>(stepsRaw, DEFAULT_STEPS);

  return (
    <section className="relative py-12 sm:py-16 md:py-24 px-4 sm:px-8 md:px-12 bg-[#020617] overflow-hidden">
      {/* Background blobs */}
      <div
        className="absolute top-1/2 left-0 -translate-y-1/2 w-64 sm:w-72 h-64 sm:h-72 rounded-full blur-[100px] -z-10 animate-pulse"
        style={{ background: `${accentFrom}1a` }}
        aria-hidden="true"
      />
      <div
        className="absolute top-1/4 right-0 w-52 sm:w-64 h-52 sm:h-64 rounded-full blur-[80px] -z-10"
        style={{ background: `${accentTo}1a` }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-20 items-start">

          {/* ── Left content ─────────────────────────────────────────────── */}
          <div className="w-full lg:w-1/2 space-y-10 md:mt-12 text-center lg:text-left">
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-bold uppercase tracking-widest mb-2 mx-auto lg:mx-0"
              style={{ background: `${accentFrom}1a`, borderColor: `${accentFrom}33`, color: accentFrom }}
            >
              <Sparkles size={14} /> {badgeText}
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-none tracking-tight">
              {headlinePrefix}{' '}
              <span
                className="text-transparent bg-clip-text"
                style={{ backgroundImage: `linear-gradient(to right, ${accentFrom}, ${accentTo})` }}
              >
                {headlineAccent}
              </span>{' '}
              <br className="hidden md:block" />
              {headlineSuffix}
            </h2>

            <p className="text-slate-400 text-sm sm:text-base md:text-lg leading-relaxed max-w-lg mx-auto lg:mx-0 font-medium">
              {bodyText}
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 justify-center lg:justify-start">
              <button
                type="button"
                className="group relative px-6 sm:px-8 py-3 sm:py-4 text-white rounded-xl font-bold transition-all duration-300 flex items-center gap-2 sm:gap-3 overflow-hidden"
                style={{
                  background: accentFrom,
                  boxShadow: `0 0 20px ${accentFrom}4d`,
                }}
                onClick={() => window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMsg)}`, '_blank')}
              >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                {primaryBtnLabel}
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href={secondaryLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 hover:text-white font-bold tracking-widest text-[9px] sm:text-xs uppercase border-b-2 border-transparent transition-all py-1"
                style={{ ['--tw-border-opacity' as any]: 1 }}
                onMouseEnter={e => (e.currentTarget.style.borderBottomColor = accentFrom)}
                onMouseLeave={e => (e.currentTarget.style.borderBottomColor = 'transparent')}
              >
                {secondaryLabel}
              </a>
            </div>
          </div>

          {/* ── Right steps ──────────────────────────────────────────────── */}
          <div className="w-full lg:w-1/2 relative space-y-6 sm:space-y-8 md:space-y-10">
            {steps.map((step, index) => (
              <div
                key={index}
                className="relative flex items-center justify-center lg:justify-end w-full"
              >
                {index !== steps.length - 1 && (
                  <div
                    className="hidden lg:block absolute right-[50%] top-full w-px h-8 sm:h-10"
                    style={{ background: `linear-gradient(to bottom, ${accentFrom}80, transparent)` }}
                  />
                )}

                <span className="absolute -left-3 sm:-left-6 lg:-left-20 text-5xl sm:text-7xl md:text-8xl lg:text-[12rem] font-black text-white/5 select-none italic pointer-events-none">
                  0{step.number}
                </span>

                <div className="relative z-10 w-full max-w-sm sm:max-w-md transform skew-x-0 lg:-skew-x-12 bg-slate-900/40 backdrop-blur-xl border border-white/10 p-6 sm:p-8 md:p-10 rounded-2xl shadow-2xl transition-all duration-500 overflow-hidden"
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = `${accentFrom}80`;
                    e.currentTarget.style.background = 'rgba(30,41,59,0.6)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                    e.currentTarget.style.background = 'rgba(15,23,42,0.4)';
                  }}
                >
                  <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 rounded-full blur-3xl opacity-0 transition-opacity"
                    style={{ background: `${accentFrom}1a` }} />
                  <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white transform skew-x-0 lg:skew-x-12 tracking-tight text-center lg:text-left leading-tight">
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

export default HowItWorksSection;