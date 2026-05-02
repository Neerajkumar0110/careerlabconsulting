"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import { usePageContent } from '@/hooks/usePageContent';
import {
  LifeBuoy, Wrench, Clock, ShieldCheck, RefreshCcw,
  ArrowRight, UserCheck, Zap, History, CheckCircle,
} from 'lucide-react';

function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

interface FeatureCard  { title: string; desc: string; img: string }
interface FrameworkItem { label: string; val: string }

const DEFAULT_FEATURES = JSON.stringify([
  { title: '24/7 Proactive Monitoring',   desc: 'Hum aapke systems ko round-the-clock monitor karte hain taaki bugs user tak pahunchne se pehle hi fix ho jayein.', img: 'https://images.pexels.com/photos/735911/pexels-photo-735911.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
  { title: 'Security & OS Updates',       desc: 'Regular patches, version upgrades, aur security audits taaki aapka application hamesha updated aur secure rahe.',   img: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
]);
const DEFAULT_FRAMEWORK = JSON.stringify([
  { label: 'Bug Tracking',     val: 'Automated' },
  { label: 'SLA Response',     val: 'Immediate' },
  { label: 'Uptime Commit',    val: '99.99%'    },
  { label: 'Account Manager',  val: 'Dedicated' },
]);
const FRAMEWORK_ICONS = [<Wrench key="w" />, <History key="h" />, <Zap key="z" />, <UserCheck key="uc" />];
const FEATURE_ICONS   = [Clock, ShieldCheck];

export default function SupportMaintenance() {
  const { get } = usePageContent('services-support-maintenance');

  // Hero
  const accentFrom    = get('hero', 'accent_from',     '#3b82f6');
  const accentTo      = get('hero', 'accent_to',       '#6366f1');
  const badgeText     = get('hero', 'badge_text',      'Mission Critical Support');
  const heroPl        = get('hero', 'headline_plain',  'Reliability');
  const heroAcc       = get('hero', 'headline_accent', 'Guaranteed.');
  const heroBody      = get('hero', 'body_text',       'Aapka business kabhi nahi rukta, aur hamara support bhi nahi. We offer world-class maintenance for legacy systems, modern SaaS, and Web3 protocols.');
  const heroBtnLabel  = get('hero', 'btn_label',       'Get Maintenance Plan');
  const responseLabel = get('hero', 'response_label',  'SLA_Priority_1_Response');
  const responseTime  = get('hero', 'response_time',   '< 15 Mins');

  // Framework
  const frameworkLabel = get('framework', 'section_label', 'Maintenance Framework');
  const frameworkItems = safeParse<FrameworkItem[]>(get('framework', 'items_json', DEFAULT_FRAMEWORK), []);

  // Features
  const featureCards   = safeParse<FeatureCard[]>(get('features', 'cards_json', DEFAULT_FEATURES), []);

  // CTA
  const ctaHeadline    = get('cta', 'headline',         'Prevention is Better Than Fixing.');
  const ctaAccent      = get('cta', 'headline_accent',  'Fixing.');
  const ctaBody        = get('cta', 'body_text',         'System failures cost $5,600 per minute on average. Don\'t be a statistic. Let\'s keep your software running perfectly.');
  const ctaBtnPrimary  = get('cta', 'btn_primary_label', 'Start Maintenance');
  const ctaBtnSecond   = get('cta', 'btn_secondary_label','View SLA Terms');

  return (
    <main className="min-h-screen bg-[#020617] text-slate-100 selection:bg-blue-600/30 font-sans">
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative pt-32 pb-20 md:pt-52 md:pb-32 px-6 overflow-hidden">
        <div className="absolute inset-0 -z-10" style={{ background: `radial-gradient(circle at 50% 30%, ${accentFrom}14 0%, transparent 70%)` }} />
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border mb-8 backdrop-blur-xl" style={{ background: `${accentFrom}1a`, borderColor: `${accentFrom}33` }}>
              <LifeBuoy size={14} style={{ color: accentFrom }} />
              <span className="text-[10px] font-black uppercase tracking-[0.3em]" style={{ color: accentFrom }}>{badgeText}</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85] mb-8">
              {heroPl}<br />
              <span className="italic font-black" style={{ backgroundImage: `linear-gradient(to right, ${accentFrom}, ${accentTo})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{heroAcc}</span>
            </h1>
            <p className="max-w-xl text-slate-400 text-lg font-light leading-relaxed mb-10">{heroBody}</p>
            <button onClick={() => (window.location.href = '/contact')} className="text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center gap-3 transition-all shadow-xl" style={{ background: accentFrom }}>
              {heroBtnLabel} <ArrowRight size={16} />
            </button>
          </div>
          {/* SLA Widget */}
          <div className="lg:w-1/2 relative group w-full">
            <div className="absolute -inset-4 rounded-full" style={{ background: `${accentFrom}1a`, filter: 'blur(40px)' }} />
            <div className="relative p-8 border border-white/10 rounded-[3rem] backdrop-blur-3xl overflow-hidden" style={{ background: 'rgba(15,23,42,0.5)' }}>
              <div className="flex justify-between items-center mb-8">
                <span className="text-[10px] font-mono uppercase tracking-widest" style={{ color: accentFrom }}>{responseLabel}</span>
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                </div>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                  <div className="flex justify-between items-start mb-2">
                    <p className="text-xs font-bold uppercase italic">Response Time</p>
                    <span className="text-emerald-400 text-[10px] font-mono font-bold">{responseTime}</span>
                  </div>
                  <div className="h-1 w-full rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.1)' }}>
                    <div className="h-full bg-emerald-500 w-full animate-pulse" />
                  </div>
                </div>
                <div className="p-4 bg-white/5 rounded-2xl border border-white/5 opacity-60">
                  <p className="text-[10px] text-slate-500 uppercase font-bold mb-2">System Health Check</p>
                  <div className="flex gap-2">
                    {[1,2,3,4,5,6,7,8].map(i => (
                      <div key={i} className="h-4 flex-1 rounded-sm" style={{ background: `${accentFrom}33` }} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FRAMEWORK ── */}
      <section className="py-24 px-6 border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center text-[10px] font-black uppercase tracking-[0.5em] text-slate-500 mb-16 italic">{frameworkLabel}</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {frameworkItems.map((item, i) => (
              <div key={i} className="text-center group p-6 rounded-3xl hover:bg-white/[0.02] transition-all">
                <div className="mb-4 flex justify-center group-hover:scale-110 transition-transform" style={{ color: accentFrom }}>{FRAMEWORK_ICONS[i % FRAMEWORK_ICONS.length]}</div>
                <h4 className="text-lg font-black italic mb-1 uppercase">{item.val}</h4>
                <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {featureCards.map((feature, i) => {
            const FeatureIcon = FEATURE_ICONS[i % FEATURE_ICONS.length];
            return (
              <div key={i} className="group relative rounded-[3rem] overflow-hidden border border-white/5 bg-slate-900/40 transition-all"
                onMouseEnter={e => (e.currentTarget.style.borderColor = `${accentFrom}4d`)}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)')}>
                <img src={feature.img} className="absolute inset-0 w-full h-full object-cover opacity-10 grayscale group-hover:scale-110 transition-transform duration-1000" alt={feature.title} />
                <div className="relative p-12 bg-gradient-to-t from-[#020617] via-[#020617]/90 to-transparent">
                  <div className="mb-6 p-4 rounded-2xl w-fit transition-all" style={{ background: `${accentFrom}1a`, color: accentFrom }}>
                    <FeatureIcon size={30} />
                  </div>
                  <h3 className="text-2xl font-black uppercase italic mb-4">{feature.title}</h3>
                  <p className="text-slate-400 font-light leading-relaxed mb-8">{feature.desc}</p>
                  <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest" style={{ color: accentFrom }}>
                    <CheckCircle size={14} /> ITIL V4 Certified
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-32 px-6" style={{ background: `${accentFrom}0d` }}>
        <div className="max-w-5xl mx-auto p-12 md:p-24 rounded-[4rem] bg-slate-900 border border-white/5 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-0 p-12 opacity-5"><RefreshCcw size={200} /></div>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-7xl font-black italic uppercase tracking-tighter mb-8 leading-none">
              {ctaHeadline.replace(ctaAccent, '')}
              <br /><span style={{ color: accentFrom }}>{ctaAccent}</span>
            </h2>
            <p className="text-slate-400 mb-12 max-w-lg mx-auto font-light leading-relaxed">{ctaBody}</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button onClick={() => (window.location.href = '/contact')} className="text-white px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:scale-105 transition-all" style={{ background: accentFrom }}>
                {ctaBtnPrimary}
              </button>
              <button className="bg-white/5 border border-white/10 text-white px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all">
                {ctaBtnSecond}
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}