'use client';

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import { usePageContent } from '@/hooks/usePageContent';
import {
  History,
  Target,
  Cpu,
  Globe2,
  Users2,
  ShieldCheck,
  Network,
  ArrowRight,
  Flame,
  Award,
  Zap,
} from 'lucide-react';

function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

interface CoreValue    { title: string; desc: string; icon: string }
interface GlobalNode   { city: string; role: string; coords: string }
interface PressBadge   { label: string; icon: string }
interface Stat         { value: string; label: string }

const ICON_MAP: Record<string, React.ElementType> = { Cpu, Zap, Network, Globe2, ShieldCheck, Award, History, Users2, Flame, Target, ArrowRight };

const DEFAULT_CORE_VALUES = JSON.stringify([
  { title: 'Radical Transparency', desc: "We open the 'black box'. Our clients understand every weight and every bias in the models we build.", icon: 'Cpu' },
  { title: 'Performance First',    desc: "If it's not sub-100ms latency, it's not production-ready. We optimize for high-velocity real-world use.", icon: 'Zap' },
  { title: 'Ethical Autonomy',     desc: 'We build systems that respect human agency, data sovereignty, and universal safety standards.', icon: 'Network' },
]);
const DEFAULT_GLOBAL_NODES = JSON.stringify([
  { city: 'Gurugram',   role: 'HQ & Neural Research',        coords: '28.4595° N' },
  { city: 'New York',   role: 'Product & Strategy',           coords: '40.7128° N' },
  { city: 'Bangalore',  role: 'Core Systems Engineering',     coords: '12.9716° N' },
]);
const DEFAULT_PRESS_BADGES = JSON.stringify([
  { label: 'AI_FORBES_30',      icon: 'Award'   },
  { label: 'TECH_CRUNCH_INIT',  icon: 'History' },
  { label: 'GITHUB_FOUNDERS',   icon: 'Users2'  },
  { label: 'ISO_CERT_9001',     icon: 'ShieldCheck' },
]);
const DEFAULT_STATS = JSON.stringify([
  { value: '500M+', label: 'Tokens Processed Daily'  },
  { value: '24/7',  label: 'Autonomous Monitoring'   },
]);

export default function AboutPage() {
  const { get } = usePageContent('home-about');

  // Hero
  const badgeText        = get('hero', 'badge_text',        'The Intelligence Renaissance');
  const heroPl           = get('hero', 'headline_plain',    'Engineering');
  const heroAcc          = get('hero', 'headline_accent',   'The Future');
  const heroBody         = get('hero', 'body_text',         "We aren't just an AI agency. We are a Neural Laboratory dedicated to closing the gap between human intent and machine execution. Based in the heart of Gurugram's tech corridor, we architect the systems that define the next decade.");
  const accentFrom       = get('hero', 'accent_from',       '#6366f1');
  const accentTo         = get('hero', 'accent_to',         '#3b82f6');

  // Mission
  const missionPl        = get('mission', 'headline_plain',   'Intelligence');
  const missionAcc       = get('mission', 'headline_accent',  'Unchained.');
  const missionBody1     = get('mission', 'body_text_1',      'Founded in 2024, our mission was simple: eliminate the friction of legacy software. We believe that AI should not be a "plugin," but the fundamental core of every modern enterprise.');
  const missionBody2     = get('mission', 'body_text_2',      'From our Research Hub in DLF Cyber City, we\'ve transitioned from small-scale LLM experiments to deploying autonomous agents for Fortune 500s and solo-founders alike.');
  const missionQuote     = get('mission', 'quote_text',       'To empower the human species by offloading cognitive drudgery to perfectly aligned autonomous systems.');
  const missionQuoteTag  = get('mission', 'quote_tag',        'Ethics & Alignment Verified');
  const missionStats     = safeParse<Stat[]>(get('mission', 'stats_json', DEFAULT_STATS), []);

  // Core Values
  const valuesPl         = get('values', 'headline_plain',   'Our Core');
  const valuesAcc        = get('values', 'headline_accent',  'Parameters.');
  const valuesItems      = safeParse<CoreValue[]>(get('values', 'items_json', DEFAULT_CORE_VALUES), []);

  // Global Nodes
  const nodesPl          = get('nodes', 'headline_plain',    'Global');
  const nodesAcc         = get('nodes', 'headline_accent',   'Nodes.');
  const nodesBody        = get('nodes', 'body_text',         'Our distributed team of researchers, engineers, and designers operate across three major time zones to ensure perpetual development cycles.');
  const nodesItems       = safeParse<GlobalNode[]>(get('nodes', 'items_json', DEFAULT_GLOBAL_NODES), []);

  // Press
  const pressBadges      = safeParse<PressBadge[]>(get('press', 'badges_json', DEFAULT_PRESS_BADGES), []);

  // CTA
  const ctaPl            = get('cta', 'headline_plain',      'Join The');
  const ctaAcc           = get('cta', 'headline_accent',     'Movement.');
  const ctaBody          = get('cta', 'body_text',           'Whether you\'re looking for a partner or a career in the neural frontier, we\'re ready to hear from you.');
  const ctaBtnPrimary    = get('cta', 'btn_primary_label',   'Work With Us');
  const ctaBtnSecond     = get('cta', 'btn_secondary_label', 'View Careers');

  return (
    <main className="min-h-screen bg-[#020617] text-slate-100 overflow-x-hidden selection:bg-indigo-500/30 font-sans">
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-16 md:pt-52 md:pb-32 px-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,_rgba(99,102,241,0.08)_0%,_transparent_70%)] -z-10" />
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full mb-8 backdrop-blur-xl"
            style={{ background: `${accentFrom}1a`, border: `1px solid ${accentFrom}33` }}>
            <Flame className="w-3.5 h-3.5" style={{ color: accentFrom }} />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]" style={{ color: accentFrom }}>{badgeText}</span>
          </div>
          <h1 className="text-5xl md:text-9xl font-black tracking-tighter leading-[0.85] uppercase mb-12">
            {heroPl} <br />
            <span className="text-transparent bg-clip-text italic"
              style={{ backgroundImage: `linear-gradient(to right, ${accentFrom}, ${accentTo})` }}>
              {heroAcc}
            </span>
          </h1>
          <p className="max-w-3xl text-slate-400 text-lg md:text-2xl leading-relaxed font-light">{heroBody}</p>
        </div>
      </section>

      {/* ── MISSION ──────────────────────────────────────────────────── */}
      <section className="py-24 px-6 relative border-y border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-4xl md:text-6xl font-black mb-8 italic tracking-tighter uppercase leading-none">
              {missionPl} <br /><span style={{ color: accentFrom }}>{missionAcc}</span>
            </h2>
            <div className="space-y-6 text-slate-400 text-lg leading-relaxed">
              <p>{missionBody1}</p>
              <p>{missionBody2}</p>
            </div>
            <div className="grid grid-cols-2 gap-8 mt-12">
              {missionStats.map((s, i) => (
                <div key={i}>
                  <p className="text-4xl font-black text-white">{s.value}</p>
                  <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: accentFrom }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-10 rounded-full" style={{ background: `${accentFrom}10`, filter: 'blur(120px)' }} />
            <div className="relative border border-white/10 bg-slate-950/50 p-8 rounded-[3rem] backdrop-blur-3xl">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 rounded-2xl" style={{ background: `${accentFrom}20` }}>
                  <Target size={24} style={{ color: accentFrom }} />
                </div>
                <h4 className="text-xl font-bold uppercase italic">The North Star</h4>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed italic mb-8">"{missionQuote}"</p>
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest" style={{ color: accentFrom }}>
                <ShieldCheck size={14} style={{ color: accentFrom }} /> {missionQuoteTag}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CORE VALUES ──────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h3 className="text-2xl font-black uppercase tracking-[0.4em] text-slate-500 italic">{valuesPl} {valuesAcc}</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {valuesItems.map((v, i) => {
              const Icon = ICON_MAP[v.icon] ?? Cpu;
              return (
                <div key={i} className="group">
                  <div className="mb-6 group-hover:scale-110 transition-transform duration-500">
                    <Icon className="w-10 h-10" style={{ color: accentFrom }} />
                  </div>
                  <h4 className="text-2xl font-bold mb-4 italic uppercase">{v.title}</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">{v.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── GLOBAL NODES ─────────────────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-end mb-16 gap-8">
            <h2 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase leading-none">
              {nodesPl} <br /><span style={{ color: accentFrom }}>{nodesAcc}</span>
            </h2>
            <p className="max-w-md text-slate-500 text-sm italic">{nodesBody}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {nodesItems.map((node, i) => (
              <div key={i} className="p-8 border border-white/5 bg-slate-900/20 rounded-3xl transition-all"
                onMouseEnter={e => (e.currentTarget.style.borderColor = `${accentFrom}50`)}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)')}>
                <div className="flex items-center gap-2 mb-4" style={{ color: accentFrom }}>
                  <Globe2 size={16} />
                  <span className="text-[10px] font-mono tracking-widest">{node.coords}</span>
                </div>
                <h4 className="text-2xl font-black uppercase mb-1">{node.city}</h4>
                <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">{node.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRESS ────────────────────────────────────────────────────── */}
      <section className="py-24 border-t border-white/5 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-around items-center gap-12">
          {pressBadges.map((b, i) => {
            const Icon = ICON_MAP[b.icon] ?? Award;
            return (
              <div key={i} className="flex items-center gap-2 font-black text-xl">
                <Icon style={{ color: accentFrom }} /> {b.label}
              </div>
            );
          })}
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl md:text-8xl font-black italic tracking-tighter uppercase leading-tight mb-12">
            {ctaPl} <br /><span style={{ color: accentFrom }}>{ctaAcc}</span>
          </h2>
          <p className="text-slate-400 text-lg mb-12 max-w-2xl mx-auto">{ctaBody}</p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button className="bg-white text-black px-12 py-6 rounded-2xl font-black text-xl hover:scale-105 transition-all shadow-2xl flex items-center justify-center gap-3 italic uppercase">
              {ctaBtnPrimary} <ArrowRight size={20} />
            </button>
            <button className="bg-white/5 border border-white/10 px-12 py-6 rounded-2xl font-black text-xl hover:bg-white/10 transition-all italic uppercase">
              {ctaBtnSecond}
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}