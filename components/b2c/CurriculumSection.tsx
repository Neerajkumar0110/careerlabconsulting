'use client';

import React from 'react';
import { Star, ChevronRight, Globe, Cpu, Terminal, Rocket } from 'lucide-react';
import { usePageContent } from '@/hooks/usePageContent';

// ── Helpers ───────────────────────────────────────────────────────────────────
function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

interface RoadmapItem {
  phase:      string;
  title:      string;
  subtitle:   string;
  desc:       string;
  icon:       string;
  color_from: string;
  color_to:   string;
  tags:       string[];
}

const ICON_MAP: Record<string, React.ElementType> = {
  Cpu, Terminal, Rocket, Globe,
};

const DEFAULT_ITEMS: RoadmapItem[] = [
  { phase: 'Phase 01', title: 'Neural Foundations',     subtitle: 'Week 1-4',   desc: 'Mastering Large Language Models (LLMs) architecture and prompt engineering protocols.', icon: 'Cpu',      color_from: '#2563eb', color_to: '#4f46e5', tags: ['LLMs', 'PyTorch', 'Transformers'] },
  { phase: 'Phase 02', title: 'Autonomous Agent Ops',   subtitle: 'Week 5-8',   desc: 'Building self-correcting AI agents using AutoGPT and LangChain frameworks.',            icon: 'Terminal', color_from: '#06b6d4', color_to: '#3b82f6', tags: ['LangChain', 'Multi-Agent', 'Tools'] },
  { phase: 'Phase 03', title: 'Production Deployment',  subtitle: 'Week 9-12',  desc: 'Scaling agents on cloud infrastructure with security and audit protocols.',             icon: 'Rocket',   color_from: '#10b981', color_to: '#14b8a6', tags: ['Cloud Ops', 'Docker', 'Security'] },
];

export default function CurriculumSection() {
  const { get } = usePageContent('curriculum');

  // ── CMS values ────────────────────────────────────────────────────────────
  const badgeText    = get('curriculum', 'badge_text',       'The Curriculum');
  const headPlain    = get('curriculum', 'headline_plain',   'Your');
  const headAccent   = get('curriculum', 'headline_accent',  'Deployment');
  const headSuffix   = get('curriculum', 'headline_suffix',  'Roadmap');
  const subheading   = get('curriculum', 'subheading',       'A structured path from core concepts to live production. No filler, only industry-grade deployment.');
  const itemsRaw     = get('curriculum', 'items_json',       '');
  const items        = safeParse<RoadmapItem[]>(itemsRaw, DEFAULT_ITEMS);
  const certTitle    = get('curriculum', 'cert_title',       'Certification included on completion');
  const certSubtitle = get('curriculum', 'cert_subtitle',    'Verified by Industry Partners & Neural Protocols');
  const certBtnLabel = get('curriculum', 'cert_btn_label',   'Download Full Syllabus');
  const certBtnHref  = get('curriculum', 'cert_btn_href',    '/syllabus.pdf');
  const accentFrom   = get('curriculum', 'accent_from',      '#3b82f6');
  const accentTo     = get('curriculum', 'accent_to',        '#06b6d4');

  return (
    <section className="py-24 bg-[#020617] relative overflow-hidden">
      {/* Radial bg */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none"
        style={{ background: `radial-gradient(circle at center, ${accentFrom}0d 0, transparent 70%)` }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* ── Header ─────────────────────────────────────────────────────── */}
        <div className="text-center mb-20">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border mb-4"
            style={{ background: `${accentFrom}1a`, borderColor: `${accentFrom}33` }}
          >
            <Star className="w-3 h-3 fill-current" style={{ color: accentFrom }} />
            <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: accentFrom }}>
              {badgeText}
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase mb-6">
            {headPlain}{' '}
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: `linear-gradient(to right, ${accentFrom}, ${accentTo})` }}
            >
              {headAccent}
            </span>{' '}
            {headSuffix}
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">{subheading}</p>
        </div>

        {/* ── Cards ──────────────────────────────────────────────────────── */}
        <div className="grid lg:grid-cols-3 gap-8">
          {items.map((item, index) => {
            const Icon = ICON_MAP[item.icon] ?? Cpu;
            return (
              <div key={index} className="group relative">
                <div
                  className="absolute -inset-0.5 rounded-[2.5rem] opacity-0 group-hover:opacity-20 transition duration-500"
                  style={{ background: `linear-gradient(to bottom, ${item.color_from}, ${item.color_to})` }}
                />
                <div className="relative h-full bg-[#0a0f1d] border border-white/5 p-8 rounded-[2.5rem] flex flex-col">
                  <div className="flex justify-between items-start mb-8">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500"
                      style={{ background: `linear-gradient(135deg, ${item.color_from}, ${item.color_to})` }}
                    >
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <span className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em]">{item.phase}</span>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                  <p
                    className="font-bold text-xs uppercase tracking-widest mb-4"
                    style={{ color: item.color_from }}
                  >
                    {item.subtitle}
                  </p>
                  <p className="text-slate-400 leading-relaxed mb-8 flex-grow">{item.desc}</p>

                  <div className="flex flex-wrap gap-2 pt-6 border-t border-white/5">
                    {item.tags.map(tag => (
                      <span
                        key={tag}
                        className="text-[9px] font-black text-slate-500 bg-white/5 px-3 py-1 rounded-full uppercase tracking-tighter"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {index !== items.length - 1 && (
                    <div className="lg:hidden absolute -bottom-8 left-1/2 -translate-x-1/2 text-white/10">
                      <ChevronRight className="w-8 h-8 rotate-90" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Certification Banner ────────────────────────────────────────── */}
        <div
          className="mt-20 p-8 rounded-[3rem] flex flex-col md:flex-row items-center justify-between gap-8 border border-white/5"
          style={{ background: `linear-gradient(to right, ${accentFrom}1a, #0a0f1d, transparent)` }}
        >
          <div className="flex items-center gap-6">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center border"
              style={{ background: '#10b9811a', borderColor: '#10b98133' }}
            >
              <Globe className="w-6 h-6" style={{ color: '#10b981' }} />
            </div>
            <div>
              <h4 className="text-white font-bold">{certTitle}</h4>
              <p className="text-slate-500 text-sm italic">{certSubtitle}</p>
            </div>
          </div>
          <a href={certBtnHref}>
            <button className="px-10 py-4 bg-white text-black rounded-2xl font-black uppercase text-xs tracking-widest hover:text-white transition-all"
              style={{ }}
              onMouseEnter={e => (e.currentTarget.style.background = accentFrom)}
              onMouseLeave={e => (e.currentTarget.style.background = '#fff')}
            >
              {certBtnLabel}
            </button>
          </a>
        </div>

      </div>
    </section>
  );
}