'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { usePageContent } from '@/hooks/usePageContent';

// ── Helpers ───────────────────────────────────────────────────────────────────
function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

interface LogoItem { name: string; url: string }

const DEFAULT_LOGOS: LogoItem[] = [
  { name: 'IBM',       url: 'https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg' },
  { name: 'Oracle',    url: 'https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg' },
  { name: 'Microsoft', url: 'https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg' },
  { name: 'Netflix',   url: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg' },
  { name: 'Google',    url: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg' },
];

export default function LogoSection() {
  const { get } = usePageContent('logo_marquee');

  // ── CMS values ────────────────────────────────────────────────────────────
  const brandName      = get('logo_marquee', 'brand_name',      'CLC');
  const headlineSuffix = get('logo_marquee', 'headline_suffix', 'ALUMNI SUCCESS');
  const subLabel       = get('logo_marquee', 'sub_label',       'Global Placement Partners');
  const mobileBadge    = get('logo_marquee', 'mobile_badge',    'Infinite Career Network');
  const speedRaw       = get('logo_marquee', 'marquee_speed',   '20');
  const speed          = parseFloat(speedRaw) || 20;
  const logosRaw       = get('logo_marquee', 'logos_json',      '');
  const logos          = safeParse<LogoItem[]>(logosRaw, DEFAULT_LOGOS);
  const accentColor    = get('logo_marquee', 'accent_color',    '#3b82f6');
  const bgColor        = get('logo_marquee', 'bg_color',        '#020617');

  // Quadruple for smooth infinite loop
  const duplicatedLogos = [...logos, ...logos, ...logos, ...logos];

  return (
    <section
      className="relative py-12 md:py-24 overflow-hidden"
      style={{ background: bgColor }}
    >
      {/* Central glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[800px] h-[300px] rounded-full pointer-events-none"
        style={{ background: `${accentColor}0d`, filter: 'blur(100px)' }} />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Headline */}
        <div className="text-center mb-10 md:mb-16 px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl md:text-5xl font-black text-white tracking-tighter uppercase italic leading-none">
              {brandName}
              <sup className="align-top text-[10px] md:text-sm not-italic ml-1">®</sup>
              <span className="ml-3" style={{ color: accentColor }}>{headlineSuffix}</span>
            </h2>
            <div className="flex items-center justify-center gap-3 md:gap-4 mt-4">
              <div
                className="h-[1px] w-6 md:w-16"
                style={{ background: `linear-gradient(to right, transparent, ${accentColor})` }}
              />
              <p className="text-slate-400 text-[8px] md:text-xs font-bold uppercase tracking-[0.3em] md:tracking-[0.4em]">
                {subLabel}
              </p>
              <div
                className="h-[1px] w-6 md:w-16"
                style={{ background: `linear-gradient(to left, transparent, ${accentColor})` }}
              />
            </div>
          </motion.div>
        </div>

        {/* Marquee */}
        <div className="relative w-full flex items-center overflow-hidden">
          {/* Edge fades */}
          <div
            className="absolute inset-y-0 left-0 w-10 md:w-32 z-20 pointer-events-none"
            style={{ background: `linear-gradient(to right, ${bgColor}, transparent)` }}
          />
          <div
            className="absolute inset-y-0 right-0 w-10 md:w-32 z-20 pointer-events-none"
            style={{ background: `linear-gradient(to left, ${bgColor}, transparent)` }}
          />

          <motion.div
            className="flex whitespace-nowrap items-center py-6"
            animate={{ x: ['0%', '-50%'] }}
            transition={{ repeat: Infinity, ease: 'linear', duration: speed }}
          >
            {duplicatedLogos.map((logo, index) => (
              <div
                key={index}
                className="flex items-center justify-center px-6 md:px-12 min-w-[140px] md:min-w-[240px]"
              >
                <img
                  src={logo.url}
                  alt={logo.name}
                  className="h-6 md:h-10 w-auto object-contain transition-transform duration-300 hover:scale-110"
                  loading={index < 8 ? 'eager' : 'lazy'}
                />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Mobile badge */}
        <div className="mt-8 flex justify-center md:hidden px-4">
          <div
            className="px-3 py-1 rounded-full border"
            style={{ borderColor: `${accentColor}33`, background: `${accentColor}0d` }}
          >
            <p
              className="text-[7px] font-bold tracking-[0.2em] uppercase"
              style={{ color: accentColor }}
            >
              {mobileBadge}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}