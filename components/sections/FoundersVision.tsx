'use client';

import React from 'react';
import Image from 'next/image';
import { Phone, Award, CheckCircle2, ArrowRight } from 'lucide-react';
import { usePageContent } from '@/hooks/usePageContent';

const FoundersVision = () => {
  const { get } = usePageContent('home');

  // ── CMS values ─────────────────────────────────────────────────────────────
  const accentColor       = get('founders_vision', 'accent_color',         '#3b82f6');
  const badgeText         = get('founders_vision', 'badge_text',           "Founder's Vision");
  const headline          = get('founders_vision', 'headline',             '"We strive to lead the field and we won\'t stop until we are the best at what we do"');
  const headlineAccent    = get('founders_vision', 'headline_accent',      'best at what we do');
  const bodyText          = get('founders_vision', 'body_text',            'At Career Lab Consulting, our mission is personal. We believe growth is only transformative when it solves real human problems through Agentic AI.');
  const companyName       = get('founders_vision', 'company_name',         'Career Lab Consulting');
  const accentWord        = get('founders_vision', 'accent_word',          'Agentic AI');
  const imageUrl          = get('founders_vision', 'image_url',            'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg');
  const imageAlt          = get('founders_vision', 'image_alt',            'Career Lab Consulting leadership team discussing AI strategy');
  const awardBadgeLabel   = get('founders_vision', 'award_badge_label',    'Nominated');
  const awardBadgeSub     = get('founders_vision', 'award_badge_sub',      'Leaders 2024');
  const verifiedLabel     = get('founders_vision', 'verified_badge_label', 'Verified Strategy');
  const verifiedDesc      = get('founders_vision', 'verified_badge_desc',  'Driving exponential ROI for 500+ Global Enterprises');
  const phoneNumber       = get('founders_vision', 'phone_number',         '+91 870023 6923');
  const phoneHref         = get('founders_vision', 'phone_href',           'tel:+918700236923');
  const ctaSecondaryLabel = get('founders_vision', 'cta_secondary_label',  'Schedule Consultation');
  const liveStatusText    = get('founders_vision', 'live_status_text',     'Accepting New Partnerships for Q1 2026-27');

  // Build headline with accent highlighted
  const renderHeadline = () => {
    if (!headlineAccent || !headline.includes(headlineAccent)) {
      return <span className="text-white">{headline}</span>;
    }
    const parts = headline.split(headlineAccent);
    return (
      <>
        {parts[0]}
        <span
          className="text-transparent bg-clip-text"
          style={{ backgroundImage: `linear-gradient(to right, ${accentColor}, #6366f1, #06b6d4)` }}
        >
          {headlineAccent}
        </span>
        {parts[1]}
      </>
    );
  };

  // Build body with bold company name and accent word
  const renderBody = () => {
    let remaining = bodyText;
    const parts: React.ReactNode[] = [];
    let key = 0;

    const highlights = [
      { text: companyName, type: 'bold' },
      { text: accentWord,  type: 'accent' },
    ].filter(h => h.text && remaining.includes(h.text));

    // Sort by position
    highlights.sort((a, b) => remaining.indexOf(a.text) - remaining.indexOf(b.text));

    for (const h of highlights) {
      const idx = remaining.indexOf(h.text);
      if (idx === -1) continue;
      if (idx > 0) parts.push(<span key={key++}>{remaining.slice(0, idx)}</span>);
      if (h.type === 'bold') {
        parts.push(<strong key={key++} className="text-white font-bold">{h.text}</strong>);
      } else {
        parts.push(<span key={key++} style={{ color: accentColor }} className="font-medium">{h.text}</span>);
      }
      remaining = remaining.slice(idx + h.text.length);
    }
    if (remaining) parts.push(<span key={key++}>{remaining}</span>);
    return parts;
  };

  return (
    <section
      className="relative py-24 px-6 md:px-12 bg-transparent overflow-hidden"
      style={{ contain: 'layout' }}
    >
      <div
        className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-[120px] -z-10 hidden md:block"
        style={{ background: `${accentColor}1a` }}
      />

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">

        {/* ── LEFT: Image column ─────────────────────────────────────────────── */}
        <div className="relative w-full lg:w-1/2 group">
          <div className="relative z-10 rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl transition-transform duration-500 group-hover:scale-[1.01]">
            <Image
              src={imageUrl}
              alt={imageAlt}
              width={800}
              height={1000}
              className="w-full h-[450px] md:h-[550px] object-cover brightness-[0.8] transition-all duration-700 group-hover:brightness-100"
              priority={false}
              loading="lazy"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
          </div>

          {/* Award badge */}
          <div className="absolute -top-6 -left-4 z-20 bg-[#0f172a]/80 backdrop-blur-xl p-5 rounded-2xl border border-white/20 shadow-2xl flex items-center gap-4 animate-bounce-slow">
            <div
              className="p-2 rounded-full ring-4"
              style={{ color: accentColor, background: `${accentColor}33`, '--tw-ring-color': `${accentColor}1a` } as React.CSSProperties}
              aria-hidden="true"
            >
              <Award size={28} />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] font-bold" style={{ color: accentColor }}>
                {awardBadgeLabel}
              </p>
              <p className="text-sm font-bold text-white">{awardBadgeSub}</p>
            </div>
          </div>

          {/* Verified badge */}
          <div
            className="absolute -bottom-8 -right-4 z-20 bg-slate-900/90 backdrop-blur-2xl text-white p-6 rounded-[1.5rem] border shadow-xl max-w-[240px]"
            style={{ borderColor: `${accentColor}4d` }}
          >
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 size={18} className="text-emerald-400" aria-hidden="true" />
              <span
                className="text-[10px] font-bold uppercase tracking-widest"
                style={{ color: accentColor }}
              >
                {verifiedLabel}
              </span>
            </div>
            <p className="text-sm font-semibold leading-snug">{verifiedDesc}</p>
          </div>
        </div>

        {/* ── RIGHT: Content column ──────────────────────────────────────────── */}
        <div className="w-full lg:w-1/2 space-y-10">
          <header className="space-y-6">
            <div
              className="inline-flex items-center gap-3 px-4 py-2 rounded-full border"
              style={{ background: `${accentColor}1a`, borderColor: `${accentColor}33` }}
            >
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: accentColor }} />
              <span
                className="font-bold tracking-[0.2em] text-xs uppercase font-mono"
                style={{ color: accentColor }}
              >
                {badgeText}
              </span>
            </div>

            <h2 className="text-3xl md:text-5xl font-black text-white leading-[1.1] tracking-tight">
              {renderHeadline()}
            </h2>
          </header>

          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-1 rounded-full" style={{ background: `${accentColor}80` }} />
            <p className="pl-8 text-slate-300 text-lg md:text-xl leading-relaxed">
              {renderBody()}
            </p>
          </div>

          <div className="pt-6 space-y-8">
            <div className="flex flex-col sm:flex-row gap-5">
              <a
                href={phoneHref}
                aria-label="Call Career Lab Consulting"
                className="group flex items-center justify-center gap-3 text-white px-8 py-5 rounded-2xl font-bold transition-all shadow-lg"
                style={{ background: accentColor, boxShadow: `0 10px 30px ${accentColor}66` }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '0.9')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
              >
                <Phone size={20} className="group-hover:rotate-12 transition-transform" />
                <span className="text-lg">{phoneNumber}</span>
              </a>

              <button className="group flex items-center justify-center gap-2 px-8 py-5 border border-white/10 hover:border-white/30 bg-white/5 rounded-2xl font-bold text-white transition-all">
                {ctaSecondaryLabel}
                <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
              </button>
            </div>

            <div className="flex items-center gap-4 text-slate-400 bg-white/[0.03] w-fit px-5 py-3 rounded-xl border border-white/5">
              <div className="flex -space-x-2" aria-hidden="true">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-slate-900 flex items-center justify-center text-[10px] font-bold"
                    style={{ background: i === 1 ? accentColor : '#6366f1' }}
                  >
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <p className="text-xs md:text-sm font-medium">
                <span className="text-emerald-400 font-bold uppercase text-[10px] block">Live Status</span>
                {liveStatusText}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FoundersVision;