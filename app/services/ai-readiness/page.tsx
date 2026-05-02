// app/services/ai-readiness/page.tsx
'use client';

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import ExecutionFlow from '@/components/sections/ExecutionFlow';
import FeatureGrid from '@/components/sections/FeatureGrid';
import { ClipboardCheck, Database, ShieldAlert, Zap, BarChart, HardDrive, LayoutDashboard, Target, ArrowUpRight, Download, FileText } from 'lucide-react';
import { usePageContent } from '@/hooks/usePageContent';

function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

interface FrameworkItem { title: string; desc: string; icon: string }
interface GapPoint      { point: string }
interface AuditStat     { label: string; val: string; color: string }

const FRAMEWORK_ICON_MAP: Record<string, React.ElementType> = { Database, HardDrive, ShieldAlert, Zap };
const STAT_COLOR_MAP: Record<string, string> = {
  'bg-blue-500': '#3b82f6', 'bg-indigo-500': '#6366f1',
  'bg-yellow-500': '#eab308', 'bg-emerald-500': '#10b981',
};

const DEFAULT_FRAMEWORK = JSON.stringify([
  { title: 'Data Maturity',   desc: 'Cleanliness, accessibility, and labeling quality.',            icon: 'Database'   },
  { title: 'Tech Stack',      desc: 'Cloud infrastructure and legacy system compatibility.',         icon: 'HardDrive'  },
  { title: 'Security Risk',   desc: 'Vulnerabilities in data privacy and AI guardrails.',           icon: 'ShieldAlert'},
  { title: 'Scale Potential', desc: 'Computational costs and performance bottlenecks.',             icon: 'Zap'        },
], null, 2);

const DEFAULT_GAP_POINTS = JSON.stringify([
  { point: 'Data Silo Identification & Mapping'    },
  { point: 'Infrastructure Scalability Scoring'    },
  { point: 'Security & Governance Compliance'      },
  { point: 'Workforce Skill-Gap Matrix'            },
], null, 2);

const DEFAULT_AUDIT_STATS = JSON.stringify([
  { label: 'Data Maturity', val: '75%', color: 'bg-blue-500'    },
  { label: 'Tech Stack',    val: 'High', color: 'bg-indigo-500' },
  { label: 'Security Risk', val: 'Med',  color: 'bg-yellow-500' },
  { label: 'Scale Cap',     val: '92%', color: 'bg-emerald-500' },
], null, 2);

export default function AIReadinessPage() {
  const { get } = usePageContent('services-ai-readiness');

  const accentFrom        = get('hero', 'accent_from',        '#3b82f6');
  const accentTo          = get('hero', 'accent_to',          '#6366f1');
  const badgeText         = get('hero', 'badge_text',         'Audit & Evaluation');
  const heroPl            = get('hero', 'headline_plain',     'AI READINESS');
  const heroAcc           = get('hero', 'headline_accent',    'ASSESSMENT');
  const heroBody          = get('hero', 'body_text',          'Is your organization actually ready for AI? We perform deep-dive audits of your data pipelines, security protocols, and technical debt to ensure a frictionless transition to autonomous operations.');
  const heroBtnPrimary    = get('hero', 'btn_primary_label',  'Start Your Audit');
  const heroBtnSecond     = get('hero', 'btn_secondary_label','View Audit Metrics');

  const frameworkTitle    = get('framework', 'headline',      'The Readiness Framework');
  const frameworkSubhead  = get('framework', 'subheading',    'Evaluating enterprise readiness across four critical tech-layers.');
  const frameworkItems    = safeParse<FrameworkItem[]>(get('framework', 'items_json', DEFAULT_FRAMEWORK), []);

  const gapTitle          = get('gap_analysis', 'headline',   'Gap Analysis Report');
  const gapBody           = get('gap_analysis', 'body_text',  "Our Readiness Audit concludes with a comprehensive Gap Analysis Report. We don't just find problems; we provide the architectural blueprints to fix them before they impact your ROI.");
  const gapPoints         = safeParse<GapPoint[]>(get('gap_analysis', 'points_json', DEFAULT_GAP_POINTS), []);
  const readinessScore    = get('gap_analysis', 'readiness_score',  'Readiness Score: 78%');
  const auditId           = get('gap_analysis', 'audit_id',         'CLC-AUDIT-2026-X9');
  const auditStats        = safeParse<AuditStat[]>(get('gap_analysis', 'stats_json', DEFAULT_AUDIT_STATS), []);

  const ctaHeadline       = get('cta', 'headline',            'GET CERTIFIED READY.');
  const ctaBody           = get('cta', 'body_text',           'Schedule an initial technical audit with our engineers at our Gurugram Hub.');
  const ctaBtnLabel       = get('cta', 'btn_label',           'REQUEST READINESS AUDIT');
  const ctaPhone          = get('cta', 'phone_number',        '+91 870023 6923');

  return (
    <main className="flex min-h-screen flex-col bg-[#020617] text-white overflow-x-hidden">
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full blur-[120px] -z-10"
          style={{ background: `${accentFrom}0d` }} />
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-8 backdrop-blur-md"
            style={{ background: `${accentFrom}1a`, borderColor: `${accentFrom}33` }}>
            <ClipboardCheck className="w-4 h-4" style={{ color: accentFrom }} />
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
              {heroBtnPrimary} <ArrowUpRight className="w-5 h-5" />
            </button>
            <button className="px-10 py-5 bg-white/5 border border-white/10 hover:bg-white/10 rounded-2xl font-bold transition-all">{heroBtnSecond}</button>
          </div>
        </div>
      </section>

      {/* ── FRAMEWORK ────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold italic">{frameworkTitle}</h2>
            <p className="text-gray-500 mt-4">{frameworkSubhead}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {frameworkItems.map((item, i) => {
              const Icon = FRAMEWORK_ICON_MAP[item.icon] ?? Database;
              return (
                <div key={i} className="p-8 rounded-[2rem] border border-white/5 hover:border-blue-500/30 transition-all"
                  style={{ background: `${accentFrom}08` }}>
                  <div className="mb-6 p-4 rounded-2xl inline-block" style={{ background: `${accentFrom}1a` }}>
                    <Icon style={{ color: accentFrom }} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── GAP ANALYSIS ─────────────────────────────────────────────────── */}
      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-6xl font-black mb-8 italic tracking-tighter">{gapTitle}</h2>
            <p className="text-gray-400 mb-8 leading-relaxed text-lg">{gapBody}</p>
            <div className="space-y-6 mb-10">
              {gapPoints.map((p, idx) => (
                <div key={idx} className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-xl border flex items-center justify-center group-hover:bg-blue-600 transition-all"
                    style={{ background: `${accentFrom}1a`, borderColor: `${accentFrom}33` }}>
                    <BarChart className="w-5 h-5" style={{ color: accentFrom }} />
                  </div>
                  <span className="font-bold text-gray-200 text-xl">{p.point}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 rounded-[4rem] blur-3xl" style={{ background: `${accentFrom}1a` }} />
            <div className="relative bg-[#03081a] border border-white/10 rounded-[3rem] p-8 md:p-10 shadow-2xl">
              <div className="flex justify-between items-center mb-8 pb-6 border-b border-white/5">
                <div>
                  <h3 className="text-2xl font-black" style={{ color: accentFrom }}>{readinessScore}</h3>
                  <p className="text-xs text-gray-500 font-mono">ID: {auditId}</p>
                </div>
                <LayoutDashboard className="w-8 h-8 opacity-50" style={{ color: accentFrom }} />
              </div>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {auditStats.map((stat, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/5">
                    <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-1">{stat.label}</p>
                    <div className="flex items-end justify-between">
                      <span className="text-xl font-bold">{stat.val}</span>
                      <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: STAT_COLOR_MAP[stat.color] || '#6366f1' }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="relative h-48 w-full rounded-2xl border flex items-center justify-center overflow-hidden mb-8"
                style={{ background: `${accentTo}1a`, borderColor: `${accentFrom}1a` }}>
                <div className="relative w-32 h-32 rounded-full border flex items-center justify-center" style={{ borderColor: `${accentFrom}4d` }}>
                  <Target className="w-10 h-10" style={{ color: accentFrom }} />
                  <div className="absolute -top-4 text-[10px] font-mono" style={{ color: accentFrom }}>DATA</div>
                  <div className="absolute -bottom-4 text-[10px] font-mono" style={{ color: accentFrom }}>SCALE</div>
                </div>
              </div>
              <div className="flex gap-3">
                <button className="flex-1 py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all border"
                  style={{ background: `${accentFrom}1a`, borderColor: `${accentFrom}4d`, color: accentFrom }}>
                  <FileText className="w-4 h-4" /> VIEW RAW DATA
                </button>
                <button className="flex-1 py-3 bg-white/5 border border-white/10 rounded-xl text-xs font-bold flex items-center justify-center gap-2 hover:bg-white/10 transition-all">
                  <Download className="w-4 h-4" /> DOWNLOAD PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="py-12 border-y border-white/5"><ExecutionFlow /></div>
      <FeatureGrid />

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto rounded-[3rem] p-12 md:p-24 text-center border border-white/10 backdrop-blur-3xl"
          style={{ backgroundImage: `linear-gradient(to bottom right, ${accentFrom}4d, #020617)` }}>
          <h2 className="text-4xl md:text-6xl font-black mb-8 italic">{ctaHeadline}</h2>
          <p className="text-gray-400 text-lg mb-12 max-w-xl mx-auto">{ctaBody}</p>
          <div className="flex flex-col items-center gap-6">
            <button className="px-16 py-6 bg-white rounded-full font-black text-xl hover:scale-110 transition-all shadow-2xl"
              style={{ color: accentTo }}>
              {ctaBtnLabel}
            </button>
            <div className="font-mono text-sm tracking-widest" style={{ color: accentFrom }}>{ctaPhone}</div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}