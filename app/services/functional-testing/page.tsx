"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import { CheckCircle2, Bug, FlaskConical, ShieldCheck, Search, ArrowRight, ClipboardCheck, MousePointer2, MonitorCheck, Terminal } from 'lucide-react';
import { usePageContent } from '@/hooks/usePageContent';

function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

const DEFAULT_FEATURES = JSON.stringify([
  { icon: 'Search',       title: 'Rigorous Discovery', desc: 'Har ek edge-case ko identify karna hamari priority hai.' },
  { icon: 'MonitorCheck', title: 'Cross-Platform',     desc: 'Web, Mobile, aur Desktop par consistent performance ki guarantee.' },
  { icon: 'ShieldCheck',  title: 'Regression Ready',   desc: 'Har naye update ke baad automate test suits run hote hain.' },
]);

const DEFAULT_SERVICES = JSON.stringify([
  { title: 'Unit & Integration Testing', desc: 'Individual components aur unke interactions ko verify karna taaki production mein koi logic gap na rahe.', icon: 'FlaskConical', img: 'https://images.pexels.com/photos/5473337/pexels-photo-5473337.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
  { title: 'User Acceptance Testing (UAT)', desc: 'Real-world scenarios ko simulate karke ensure karna ki software end-user ki expectations par khara utarta hai.', icon: 'MousePointer2', img: 'https://images.pexels.com/photos/3182811/pexels-photo-3182811.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
]);

const ICON_MAP: Record<string, React.ElementType> = { Search, MonitorCheck, ShieldCheck, FlaskConical, MousePointer2, ClipboardCheck, CheckCircle2, Bug, Terminal };

export default function FunctionalTestingPage() {
  const { get } = usePageContent('services-functional-testing');

  const accentColor     = get('hero', 'accent_color',      '#10b981');
  const badgeText       = get('hero', 'badge_text',        'QA & Precision Protocol');
  const heroPl          = get('hero', 'headline_plain',    'Zero Error');
  const heroAcc         = get('hero', 'headline_accent',   'Assurance.');
  const heroBody        = get('hero', 'body_text',         'Hum software ko sirf build nahi karte, use rigorous testing se guzaarte hain. Hamari Functional Testing services ensure karti hain ki aapka application har aspect mein flawless perform kare.');
  const heroBtnLabel    = get('hero', 'btn_label',         'Request QA Audit');
  const testsCount      = get('hero', 'tests_count',       '4,290');
  const bugsResolved    = get('hero', 'bugs_resolved',     '100%');
  const statusText      = get('hero', 'status_text',       'Running regression_suite.sh...');

  const features        = safeParse<{ icon: string; title: string; desc: string }[]>(get('features', 'items_json', DEFAULT_FEATURES), []);

  const servicesPl      = get('services', 'headline_plain',  'Our');
  const servicesAcc     = get('services', 'headline_accent', 'Testing Services.');
  const servicesItems   = safeParse<{ title: string; desc: string; icon: string; img: string }[]>(get('services', 'items_json', DEFAULT_SERVICES), []);

  const ctaHeadline     = get('cta', 'headline',   'Break Your Code Before Users Do.');
  const ctaQuote        = get('cta', 'quote',       '"Quality is not an act, it is a habit. Let\'s make your software bulletproof."');
  const ctaBtnLabel     = get('cta', 'btn_label',   'Start Testing Cycle');

  return (
    <main className="min-h-screen bg-[#020617] text-slate-100 selection:bg-emerald-600/30 font-sans">
      <Navbar />

      {/* HERO */}
      <section className="relative pt-32 pb-20 md:pt-52 md:pb-32 px-6 overflow-hidden">
        <div className="absolute inset-0 -z-10" style={{ background: `radial-gradient(circle at 50% 30%, ${accentColor}14 0%, transparent 70%)` }}></div>
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border mb-8 backdrop-blur-xl"
              style={{ background: `${accentColor}1a`, borderColor: `${accentColor}33` }}>
              <CheckCircle2 size={14} style={{ color: accentColor }} />
              <span className="text-[10px] font-black uppercase tracking-[0.3em]" style={{ color: accentColor }}>{badgeText}</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85] mb-8">
              {heroPl} <br />
              <span className="italic font-black" style={{ backgroundImage: `linear-gradient(to right, ${accentColor}, #14b8a6)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{heroAcc}</span>
            </h1>
            <p className="max-w-xl text-slate-400 text-lg font-light leading-relaxed mb-10">{heroBody}</p>
            <button onClick={() => window.location.href = '/contact'}
              className="text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center gap-3 transition-all shadow-xl"
              style={{ background: accentColor }}>
              {heroBtnLabel} <ArrowRight size={16} />
            </button>
          </div>

          <div className="lg:w-1/2 relative group w-full">
            <div className="absolute -inset-4 blur-3xl rounded-full" style={{ background: `${accentColor}1a` }}></div>
            <div className="relative p-8 bg-slate-950 border border-white/10 rounded-[3rem] overflow-hidden">
              <div className="flex items-center justify-between mb-8">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full" style={{ background: accentColor }}></div>
                </div>
                <span className="text-[10px] font-mono" style={{ color: accentColor }}>SYSTEM_STABLE_99.9%</span>
              </div>
              <div className="space-y-6">
                <div className="flex justify-between items-end border-b border-white/5 pb-4">
                  <span className="text-xs text-slate-500 uppercase tracking-tighter">Tests Executed</span>
                  <span className="text-3xl font-black italic" style={{ color: accentColor }}>{testsCount}</span>
                </div>
                <div className="flex justify-between items-end border-b border-white/5 pb-4">
                  <span className="text-xs text-slate-500 uppercase tracking-tighter">Bugs Resolved</span>
                  <span className="text-3xl font-black italic text-blue-400">{bugsResolved}</span>
                </div>
                <div className="h-12 w-full rounded-xl flex items-center px-4 gap-3 border"
                  style={{ background: `${accentColor}0d`, borderColor: `${accentColor}33` }}>
                  <Terminal size={16} style={{ color: accentColor }} />
                  <span className="text-[10px] font-mono animate-pulse" style={{ color: accentColor }}>{statusText}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-24 px-6 border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {features.map((feat, i) => {
              const Icon = ICON_MAP[feat.icon] ?? Search;
              return (
                <div key={i} className="text-center md:text-left space-y-4">
                  <Icon size={32} style={{ color: accentColor }} className="mx-auto md:mx-0" />
                  <h4 className="text-xl font-black uppercase italic">{feat.title}</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">{feat.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tight mb-12">
            {servicesPl} <span style={{ color: accentColor }}>{servicesAcc}</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {servicesItems.map((service, i) => {
              const Icon = ICON_MAP[service.icon] ?? FlaskConical;
              return (
                <div key={i} className="group relative rounded-[3rem] overflow-hidden border border-white/5 bg-slate-900/40 transition-all"
                  style={{ '--hover-border': `${accentColor}50` } as React.CSSProperties}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = `${accentColor}50`)}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)')}>
                  <img src={service.img} className="absolute inset-0 w-full h-full object-cover opacity-10 grayscale group-hover:scale-110 transition-transform duration-1000" alt={service.title} />
                  <div className="relative p-12 bg-gradient-to-t from-[#020617] via-[#020617]/90 to-transparent">
                    <div className="mb-6 p-4 rounded-2xl w-fit transition-all group-hover:text-white" style={{ background: `${accentColor}1a`, color: accentColor }}>
                      <Icon size={30} />
                    </div>
                    <h3 className="text-2xl font-black uppercase italic mb-4">{service.title}</h3>
                    <p className="text-slate-400 font-light leading-relaxed mb-8">{service.desc}</p>
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest" style={{ color: accentColor }}>
                      <ClipboardCheck size={14} /> Certified QA Process
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6" style={{ background: `${accentColor}08` }}>
        <div className="max-w-4xl mx-auto text-center">
          <Bug className="mx-auto mb-8 animate-bounce" size={48} style={{ color: accentColor }} />
          <h2 className="text-4xl md:text-7xl font-black uppercase italic tracking-tighter mb-10 leading-none">{ctaHeadline}</h2>
          <p className="text-slate-400 mb-12 max-w-lg mx-auto italic font-light">{ctaQuote}</p>
          <button onClick={() => window.location.href = '/contact'}
            className="text-white px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:scale-105 transition-all shadow-2xl"
            style={{ background: accentColor }}>
            {ctaBtnLabel}
          </button>
        </div>
      </section>

      <Footer />
    </main>
  );
}