// app/home/ai-employers/page.tsx
'use client';

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import { usePageContent } from '@/hooks/usePageContent';
import {
  Users, UserPlus, Target, Zap, BarChart3,
  ShieldCheck, Search, ArrowRight, Fingerprint, HeartPulse,
} from 'lucide-react';

function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

const DEFAULT_CARDS = JSON.stringify([
  { title: 'Autonomous Sourcing', desc: 'Hyper-targeted agents that find passive talent across GitHub, LinkedIn, and research papers based on technical depth, not keywords.', icon: 'Search' },
  { title: 'Cognitive Vetting',   desc: 'Interactive technical assessments that adapt in real-time to a candidate\'s skill level, eliminating the "Leetcode" bias.', icon: 'Fingerprint' },
  { title: 'Onboarding Swarms',   desc: 'AI agents that handle legal compliance, hardware provisioning, and internal knowledge transfer in under 60 minutes.', icon: 'Zap' },
]);
const DEFAULT_FEATURES = JSON.stringify([
  { icon: 'ShieldCheck', title: 'Bias-Free Vetting',   text: 'Removing gender, age, and ethnic indicators from early-stage screening.' },
  { icon: 'BarChart3',   title: 'Predictive Turnover', text: 'Forecasting employee retention before you even sign the offer letter.' },
  { icon: 'HeartPulse',  title: 'Bio-Digital Match',   text: 'Matching candidates to team dynamics and manager styles.' },
  { icon: 'Users',       title: 'Diversity Optimizer', text: 'Automatically balancing teams for maximum cognitive diversity.' },
]);
const DEFAULT_STATS = JSON.stringify([
  { label: 'Time-to-Hire',  val: '-70%', desc: 'Average reduction' },
  { label: 'Cost-per-Hire', val: '-45%', desc: 'Efficiency gain'   },
  { label: 'Interview ROI', val: '4.2x', desc: 'Qualified leads'   },
  { label: 'Retention Rate',val: '92%',  desc: '12-month average'  },
]);

const CARD_ICON_MAP: Record<string, React.ElementType> = { Search, Fingerprint, Zap, Users };
const FEAT_ICON_MAP: Record<string, React.ElementType> = { ShieldCheck, BarChart3, HeartPulse, Users };

interface ServiceCard { title: string; desc: string; icon: string }
interface Feature     { icon: string; title: string; text: string }
interface Stat        { label: string; val: string; desc: string }

export default function AIEmployersPage() {
  const { get } = usePageContent('home-ai-employers');

  // Hero
  const accentColor        = get('hero', 'accent_color',         '#3b82f6');
  const accentTo           = get('hero', 'accent_to',            '#6366f1');
  const badgeText          = get('hero', 'badge_text',           'Neural Recruitment Layer');
  const heroPl             = get('hero', 'headline_plain',       'Augmented');
  const heroAcc            = get('hero', 'headline_accent',      'Workforce');
  const heroBody           = get('hero', 'body_text',            'Stop sorting resumes. Start matching synapses. Our AI Employers suite automates the Discovery, Vetting, and Integration of top-tier talent using proprietary behavioral-match LLMs.');
  const heroBtnPrimary     = get('hero', 'btn_primary_label',    'Deploy Talent Agent');
  const heroBtnSecondary   = get('hero', 'btn_secondary_label',  'Employer Case Studies');

  // Services (cards)
  const serviceCards       = safeParse<ServiceCard[]>(get('services', 'items_json', DEFAULT_CARDS), []);
  const servicesPl         = get('services', 'headline_plain',   'Core');
  const servicesAcc        = get('services', 'headline_accent',  'Services');

  // Terminal/Vetting Section
  const vettingPl          = get('vetting', 'headline_plain',    'Hire for Potential,');
  const vettingAcc         = get('vetting', 'headline_accent',   'Not History.');
  const vettingBody        = get('vetting', 'body_text',         'Our agents look beyond the PDF. By analyzing cognitive agility, technical velocity, and cultural resonance, we ensure you hire the top 0.1% of global talent.');
  const features           = safeParse<Feature[]>(get('vetting', 'features_json', DEFAULT_FEATURES), []);
  const cultureLabel       = get('vetting', 'culture_label',     'Cultural Alignment');
  const culturePercent     = get('vetting', 'culture_percent',   '94');
  const technicalLabel     = get('vetting', 'technical_label',   'Technical Proficiency');
  const technicalLevel     = get('vetting', 'technical_level',   'Mastery');
  const terminalLabel      = get('vetting', 'terminal_label',    'RECRUITMENT_ENGINE_v4.2');

  // Stats strip
  const stats              = safeParse<Stat[]>(get('stats', 'items_json', DEFAULT_STATS), []);

  // CTA
  const ctaHeadline        = get('cta', 'headline',              'Build Your Dream Team');
  const ctaBody            = get('cta', 'body_text',             'Our talent architects at DLF Cyber City are rewriting the rules of recruitment. Deploy your autonomous hiring squad today.');
  const ctaBtnLabel        = get('cta', 'btn_label',             'Schedule Talent Audit');
  const ctaFootnote        = get('cta', 'footnote',              'Talent Node // Gurugram Hub');

  return (
    <main className="min-h-screen bg-[#020617] text-slate-100 overflow-x-hidden selection:bg-blue-500/30 font-sans">
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-16 md:pt-52 md:pb-32 px-6">
        <div className="absolute inset-0 -z-10"
          style={{ background: `radial-gradient(circle at 50% 30%, ${accentColor}1a 0%, transparent 70%)` }} />
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full border mb-6 backdrop-blur-xl"
            style={{ background: `${accentColor}1a`, borderColor: `${accentColor}33` }}>
            <Users className="w-3.5 h-3.5" style={{ color: `${accentColor}cc` }} />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]" style={{ color: `${accentColor}cc` }}>{badgeText}</span>
          </div>
          <h1 className="text-5xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.85] uppercase mb-10">
            {heroPl} <br />
            <span className="italic" style={{
              backgroundImage: `linear-gradient(to right, ${accentColor}cc, ${accentColor}, ${accentTo})`,
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>{heroAcc}</span>
          </h1>
          <p className="max-w-3xl text-slate-400 text-base md:text-xl leading-relaxed mb-12 font-light">{heroBody}</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 shadow-2xl"
              style={{ background: accentColor, boxShadow: `0 20px 40px ${accentColor}4d` }}>
              {heroBtnPrimary} <UserPlus className="w-4 h-4" />
            </button>
            <button className="px-10 py-5 bg-white/5 border border-white/10 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-white/10 transition-all backdrop-blur-md">
              {heroBtnSecondary}
            </button>
          </div>
        </div>
      </section>

      {/* ── SERVICE CARDS ────────────────────────────────────────────────── */}
      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {serviceCards.map((card, i) => {
            const Icon = CARD_ICON_MAP[card.icon] ?? Zap;
            return (
              <div key={i} className="group p-10 rounded-[3rem] border border-white/5 relative overflow-hidden transition-all"
                style={{ background: 'rgba(15,23,42,0.4)' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = `${accentColor}66`)}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)')}>
                <div className="mb-8 p-4 rounded-2xl inline-block transition-all"
                  style={{ background: `${accentColor}0d` }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = accentColor; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = `${accentColor}0d`; }}>
                  <Icon className="w-8 h-8" style={{ color: accentColor }} />
                </div>
                <h3 className="text-2xl font-bold mb-4">{card.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">{card.desc}</p>
                <div className="flex items-center gap-2 font-bold text-[10px] uppercase tracking-widest cursor-pointer transition-transform group-hover:translate-x-2"
                  style={{ color: accentColor }}>
                  View Workflow <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── VETTING / FEATURES ───────────────────────────────────────────── */}
      <section className="py-24 px-6" style={{ background: '#030816' }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Terminal mock */}
          <div className="relative group">
            <div className="absolute -inset-10 rounded-full pointer-events-none"
              style={{ background: `${accentColor}08`, filter: 'blur(120px)' }} />
            <div className="relative border rounded-[3rem] p-8 md:p-12 shadow-2xl font-mono"
              style={{ background: 'rgba(0,0,0,0.6)', borderColor: `${accentColor}33` }}>
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
                <div className="flex items-center gap-2 font-black italic text-[10px]" style={{ color: accentColor }}>
                  <Target className="w-4 h-4" /> {terminalLabel}
                </div>
                <span className="text-[10px] text-slate-500">BIAS_FILTER: ACTIVE</span>
              </div>
              <div className="mt-8 space-y-3">
                <div className="flex justify-between text-[10px] uppercase font-bold text-slate-400">
                  <span>{cultureLabel}</span>
                  <span style={{ color: accentColor }}>{culturePercent}%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${culturePercent}%`, background: accentColor }} />
                </div>
                <div className="flex justify-between text-[10px] uppercase font-bold text-slate-400 pt-2">
                  <span>{technicalLabel}</span>
                  <span className="text-emerald-400">{technicalLevel}</span>
                </div>
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full w-[88%] bg-emerald-500 rounded-full" />
                </div>
              </div>
            </div>
          </div>
          {/* Text */}
          <div>
            <h2 className="text-4xl md:text-7xl font-black mb-8 italic tracking-tighter uppercase leading-none">
              {vettingPl}<br />
              <span style={{ color: accentColor }}>{vettingAcc}</span>
            </h2>
            <p className="text-slate-400 text-lg mb-8 leading-relaxed font-light">{vettingBody}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((feat, idx) => {
                const Icon = FEAT_ICON_MAP[feat.icon] ?? ShieldCheck;
                return (
                  <div key={idx} className="flex flex-col gap-3 p-5 rounded-2xl border border-white/5 bg-white/5 transition-all"
                    onMouseEnter={e => (e.currentTarget.style.borderColor = `${accentColor}33`)}
                    onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)')}>
                    <Icon className="w-5 h-5" style={{ color: accentColor }} />
                    <h4 className="text-[10px] font-black uppercase tracking-widest" style={{ color: `${accentColor}cc` }}>{feat.title}</h4>
                    <p className="text-slate-500 text-[11px] leading-relaxed">{feat.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS STRIP ──────────────────────────────────────────────────── */}
      <section className="py-24 border-y border-white/5" style={{ background: `${accentColor}02` }}>
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {stats.map((stat, i) => (
            <div key={i}>
              <p className="text-4xl md:text-5xl font-black text-white mb-2">{stat.val}</p>
              <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: accentColor }}>{stat.label}</p>
              <p className="text-[9px] text-slate-500 italic">{stat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto border rounded-[4rem] p-12 md:p-24 text-center backdrop-blur-3xl relative overflow-hidden"
          style={{ background: `linear-gradient(to bottom right, ${accentColor}1a, #000)`, borderColor: `${accentColor}4d`, boxShadow: `0 0 80px ${accentColor}18` }}>
          <div className="relative z-10">
            <h2 className="text-5xl md:text-8xl font-black mb-8 italic tracking-tighter uppercase leading-tight">{ctaHeadline}</h2>
            <p className="text-lg md:text-xl mb-12 max-w-2xl mx-auto font-light" style={{ color: `${accentColor}b3` }}>{ctaBody}</p>
            <div className="flex flex-col items-center gap-6">
              <button className="bg-white px-16 py-7 rounded-2xl font-black text-2xl hover:scale-105 transition-all shadow-2xl uppercase italic"
                style={{ color: '#1e1b4b' }}>
                {ctaBtnLabel}
              </button>
              <div className="font-mono text-[10px] tracking-[0.4em] uppercase italic opacity-50" style={{ color: accentColor }}>
                {ctaFootnote}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}