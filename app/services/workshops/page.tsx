// app/services/ai-workshops/page.tsx
'use client';

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import ExecutionFlow from '@/components/sections/ExecutionFlow';
import SuccessStories from '@/components/sections/SuccessStories';
import { Users, Presentation, Terminal, Lightbulb, Calendar, CheckCircle2, ArrowRight, MonitorPlay, Award } from 'lucide-react';
import { usePageContent } from '@/hooks/usePageContent';

function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

interface TrackItem   { title: string; desc: string; icon: string }
interface HandsOnItem { title: string; desc: string }

const TRACK_ICON_MAP: Record<string, React.ElementType> = { Lightbulb, Terminal, Award };

const DEFAULT_TRACKS = JSON.stringify([
  { title: 'Executive AI Strategy',    desc: 'High-level sessions for C-Suite on ROI modeling, risk management, and market positioning.',                       icon: 'Lightbulb' },
  { title: 'Prompt Engineering Lab',   desc: 'Technical deep-dives into LLM orchestration, chain-of-thought prompting, and agent design.',                     icon: 'Terminal'  },
  { title: 'AI Governance & Ethics',   desc: 'Frameworks for building unbiased, compliant, and secure autonomous infrastructure.',                             icon: 'Award'     },
], null, 2);

const DEFAULT_HANDS_ON = JSON.stringify([
  { title: 'Live Build Sessions',       desc: 'Deploy an AI agent during the workshop.'           },
  { title: 'Custom Use-Case Discovery', desc: 'We solve your specific business bottlenecks.'      },
  { title: 'Post-Workshop Support',     desc: '30 days of architectural advisory included.'       },
], null, 2);

export default function AIWorkshopsPage() {
  const { get } = usePageContent('services-ai-workshops');

  const accentFrom        = get('hero', 'accent_from',        '#3b82f6');
  const accentTo          = get('hero', 'accent_to',          '#6366f1');
  const badgeText         = get('hero', 'badge_text',         'Knowledge Transfer Series');
  const heroPl            = get('hero', 'headline_plain',     'AI MASTERY');
  const heroAcc           = get('hero', 'headline_accent',    'WORKSHOPS');
  const heroBody          = get('hero', 'body_text',          'Bridging the gap between AI hype and enterprise reality. We provide high-impact, hands-on workshops for executives and engineers to build, deploy, and govern autonomous systems.');
  const heroBtnPrimary    = get('hero', 'btn_primary_label',  'Book Corporate Session');
  const heroBtnSecond     = get('hero', 'btn_secondary_label','View Curriculum');

  const tracksTitle       = get('tracks', 'headline',         'Workshop Tracks');
  const tracks            = safeParse<TrackItem[]>(get('tracks', 'items_json', DEFAULT_TRACKS), []);

  const executionTitle    = get('execution', 'headline',      'Hands-on Execution');
  const executionBody     = get('execution', 'body_text',     "Our workshops aren't just slide decks. Participants build real prototypes using our proprietary GenAI Site Builder and internal automation tools.");
  const handsonItems      = safeParse<HandsOnItem[]>(get('execution', 'points_json', DEFAULT_HANDS_ON), []);
  const workshopImageUrl  = get('execution', 'image_url',     'https://images.pexels.com/photos/3182750/pexels-photo-3182750.jpeg?auto=compress&cs=tinysrgb&w=1260');
  const sessionLocation   = get('execution', 'session_location','Live in Gurugram');

  const ctaHeadline       = get('cta', 'headline',            'EMPOWER YOUR TEAM');
  const ctaBody           = get('cta', 'body_text',           "Our master instructors at DLF Cyber City are ready to elevate your organization's technical capability.");
  const ctaBtnLabel       = get('cta', 'btn_label',           'REQUEST QUOTE');
  const ctaNextOpening    = get('cta', 'next_opening',        'Next Hub Opening: Feb 2026');
  const ctaSlotsLabel     = get('cta', 'slots_label',         'Limited Slots Remaining');
  const ctaPhone          = get('cta', 'phone_number',        '+91 870023 6923');

  return (
    <main className="flex min-h-screen flex-col bg-[#020617] text-white overflow-x-hidden">
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-10"
          style={{ background: `radial-gradient(circle at center, ${accentFrom} 0%, transparent 70%)` }} />
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-8 backdrop-blur-md"
            style={{ background: `${accentFrom}1a`, borderColor: `${accentFrom}33` }}>
            <Presentation className="w-4 h-4" style={{ color: accentFrom }} />
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
            <button className="px-10 py-5 font-bold rounded-2xl transition-all flex items-center justify-center gap-2 shadow-xl"
              style={{ background: accentFrom, boxShadow: `0 10px 30px ${accentFrom}33` }}>
              {heroBtnPrimary} <ArrowRight className="w-5 h-5" />
            </button>
            <button className="px-10 py-5 bg-white/5 border border-white/10 hover:bg-white/10 rounded-2xl font-bold transition-all">{heroBtnSecond}</button>
          </div>
        </div>
      </section>

      {/* ── TRACKS ───────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold italic mb-12 text-center">{tracksTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {tracks.map((item, i) => {
              const Icon = TRACK_ICON_MAP[item.icon] ?? Lightbulb;
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

      {/* ── HANDS-ON ─────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-4xl md:text-6xl font-black mb-8 italic tracking-tighter">{executionTitle}</h2>
            <p className="text-gray-400 text-lg mb-10">{executionBody}</p>
            <div className="space-y-4">
              {handsonItems.map((point, idx) => (
                <div key={idx} className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                  <CheckCircle2 style={{ color: accentFrom, flexShrink: 0 }} />
                  <div>
                    <h4 className="font-bold">{point.title}</h4>
                    <p className="text-sm text-gray-500">{point.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-10 rounded-full blur-[100px]" style={{ background: `${accentFrom}1a` }} />
            <div className="relative bg-[#03081a] border border-white/10 rounded-[3rem] p-1 overflow-hidden group">
              <img src={workshopImageUrl} alt="Corporate AI Training"
                className="rounded-[2.9rem] opacity-60 grayscale group-hover:grayscale-0 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020617] to-transparent" />
              <div className="absolute bottom-10 left-10 right-10 flex justify-between items-end">
                <div>
                  <MonitorPlay className="w-12 h-12 mb-4" style={{ color: accentFrom }} />
                  <div className="font-mono text-xs tracking-widest" style={{ color: accentFrom }}>ACTIVE_SESSION_PREVIEW</div>
                </div>
                <div className="px-4 py-2 rounded-full font-bold text-xs uppercase" style={{ background: accentFrom }}>
                  {sessionLocation}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="py-12 border-y border-white/5"><ExecutionFlow /></div>
      <SuccessStories />

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto rounded-[4rem] p-12 md:p-24 text-center border backdrop-blur-3xl"
          style={{ backgroundImage: `linear-gradient(to bottom right, ${accentFrom}66, ${accentTo}66)`, borderColor: `${accentFrom}33` }}>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-7xl font-black mb-8 italic tracking-tighter">{ctaHeadline}</h2>
            <p className="text-blue-100/70 text-lg md:text-xl mb-12 max-w-2xl mx-auto">{ctaBody}</p>
            <div className="flex flex-col items-center gap-8">
              <div className="flex gap-4">
                <button className="bg-white px-12 py-5 rounded-full font-black text-xl hover:scale-110 transition-all shadow-2xl"
                  style={{ color: accentTo }}>
                  {ctaBtnLabel}
                </button>
                <div className="hidden md:flex flex-col items-start justify-center text-left">
                  <div className="flex items-center gap-2 font-mono text-sm" style={{ color: accentFrom }}>
                    <Calendar className="w-4 h-4" /> {ctaNextOpening}
                  </div>
                  <div className="text-gray-500 text-xs uppercase tracking-tighter font-bold">{ctaSlotsLabel}</div>
                </div>
              </div>
              <div className="font-mono text-sm tracking-widest" style={{ color: accentFrom }}>{ctaPhone}</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}