'use client';

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import { usePageContent } from '@/hooks/usePageContent';
import {
  Users2, Workflow, ShieldCheck, Settings,
  Plus, ArrowRight, Handshake, LayoutGrid, Zap, Briefcase,
} from 'lucide-react';

// ── Icon maps ─────────────────────────────────────────────────────────────────
const ICON_MAP: Record<string, React.ElementType> = {
  LayoutGrid, Zap, Settings, ShieldCheck, Briefcase, Handshake, Users2, Workflow,
};

// ── Types ─────────────────────────────────────────────────────────────────────
interface OnboardingStep { step: string; label: string; desc: string }
interface TeamModel      { title: string; desc: string; icon: string; img: string }
interface BenefitItem    { title: string; icon: string; text: string }
interface HeroMember     { role: string; status: string }

function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

const DEFAULT_STEPS: OnboardingStep[] = [
  { step: '01', label: 'Talent Match', desc: 'Selecting experts based on your tech stack and culture.' },
  { step: '02', label: 'Deep Sync',    desc: 'Aligning on tools (Slack, Jira) and sprint cycles.'     },
  { step: '03', label: 'Launch',       desc: 'Team starts delivering value within 7-14 days.'          },
  { step: '04', label: 'Scale',        desc: 'Easily add or remove resources as per project load.'     },
];
const DEFAULT_MODELS: TeamModel[] = [
  { title: 'Full-Stack Squads',         desc: 'Complete autonomous teams including Frontend, Backend, QA, and a Project Manager. Ready to ship features from day one.', icon: 'LayoutGrid', img: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
  { title: 'Specialized AI/DevOps Units', desc: 'Deep-tech experts focus on specific complex domains like infrastructure automation or machine learning pipelines.',      icon: 'Zap',        img: 'https://images.pexels.com/photos/3182811/pexels-photo-3182811.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
];
const DEFAULT_BENEFITS: BenefitItem[] = [
  { title: 'Direct Control',       icon: 'Settings',    text: 'You manage the team directly or through us.'   },
  { title: 'IP Protection',        icon: 'ShieldCheck', text: 'Full ownership of every line of code written.'  },
  { title: 'Zero Hiring Overhead', icon: 'Briefcase',   text: 'We handle payroll, benefits, and office space.' },
];
const DEFAULT_MEMBERS: HeroMember[] = [
  { role: 'Team Lead',    status: 'Active'     },
  { role: 'SR. Engineer', status: 'In Sprint'  },
  { role: 'QA Expert',    status: 'Monitoring' },
];

export default function DedicatedTeamsPage() {
  const { get } = usePageContent('services-dedicated-teams');

  // ── Hero ──────────────────────────────────────────────────────────────────
  const badgeText   = get('hero', 'badge_text',       'Scalable Workforce');
  const heroPl      = get('hero', 'headline_plain',   'Your Team,');
  const heroAcc     = get('hero', 'headline_accent',  'Our Talent.');
  const heroBody    = get('hero', 'body_text',        'Stop recruiting, start building. Hum aapko dedicated software engineers provide karte hain jo aapke culture aur workflows mein seamlessly integrate ho jate hain.');
  const btnLabel    = get('hero', 'btn_label',        'Assemble My Team');
  const btnHref     = get('hero', 'btn_href',         '/contact');
  const accent      = get('hero', 'accent_color',     '#3b82f6');
  const accentTo    = get('hero', 'accent_color_to',  '#6366f1');
  const heroLabel   = get('hero', 'hero_label',       'Integration_Active');
  const heroMembers = safeParse<HeroMember[]>(get('hero', 'hero_members_json', JSON.stringify(DEFAULT_MEMBERS)), DEFAULT_MEMBERS);

  // ── Onboarding ────────────────────────────────────────────────────────────
  const onboardLabel = get('onboarding', 'section_label', 'The Onboarding Sprint');
  const steps        = safeParse<OnboardingStep[]>(get('onboarding', 'steps_json', JSON.stringify(DEFAULT_STEPS)), DEFAULT_STEPS);

  // ── Team Models ───────────────────────────────────────────────────────────
  const models       = safeParse<TeamModel[]>(get('team_models', 'items_json', JSON.stringify(DEFAULT_MODELS)), DEFAULT_MODELS);

  // ── Benefits ──────────────────────────────────────────────────────────────
  const benefits     = safeParse<BenefitItem[]>(get('benefits', 'items_json', JSON.stringify(DEFAULT_BENEFITS)), DEFAULT_BENEFITS);

  // ── CTA ───────────────────────────────────────────────────────────────────
  const ctaPl        = get('cta', 'headline_plain',  'Your Extension Is');
  const ctaAcc       = get('cta', 'headline_accent', 'Waiting.');
  const ctaBody      = get('cta', 'body_text',       'Skip the 3-month hiring cycle. Get a high-performing dedicated team ready to ship code next week.');
  const ctaBtn       = get('cta', 'btn_label',       'Request Team Profile');
  const ctaHref      = get('cta', 'btn_href',        '/contact');

  return (
    <main className="min-h-screen bg-[#020617] text-slate-100 selection:bg-blue-600/30 font-sans">
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 md:pt-52 md:pb-32 px-6 overflow-hidden">
        <div className="absolute inset-0 -z-10" style={{ background: `radial-gradient(circle at 50% 30%, ${accent}1a 0%, transparent 70%)` }} />
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-8 backdrop-blur-xl"
              style={{ background: `${accent}1a`, border: `1px solid ${accent}33` }}>
              <Users2 size={14} style={{ color: accent }} />
              <span className="text-[10px] font-black uppercase tracking-[0.3em]" style={{ color: accent }}>{badgeText}</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85] mb-8">
              {heroPl}<br />
              <span className="italic font-black" style={{
                backgroundImage: `linear-gradient(to right, ${accent}, ${accentTo})`,
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>{heroAcc}</span>
            </h1>
            <p className="max-w-xl text-slate-400 text-lg font-light leading-relaxed mb-10">{heroBody}</p>
            <button onClick={() => window.location.href = btnHref}
              className="text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center gap-3 transition-all hover:opacity-90"
              style={{ background: accent, boxShadow: `0 20px 40px ${accent}33` }}>
              {btnLabel} <ArrowRight size={16} />
            </button>
          </div>

          <div className="lg:w-1/2 relative group w-full">
            <div className="absolute -inset-4 rounded-full blur-3xl" style={{ background: `${accent}1a` }} />
            <div className="relative p-8 bg-slate-900/50 border border-white/5 rounded-[3rem] backdrop-blur-3xl overflow-hidden">
              <div className="flex items-center gap-3 mb-10 border-b border-white/5 pb-6">
                <div className="h-10 w-10 rounded-xl flex items-center justify-center font-black text-sm" style={{ background: accent }}>HQ</div>
                <Plus size={16} className="text-slate-500" />
                <div className="h-10 w-10 bg-slate-800 rounded-xl flex items-center justify-center font-black border border-white/10 italic font-serif" style={{ color: accent }}>A</div>
                <span className="ml-auto text-[10px] font-mono uppercase tracking-widest" style={{ color: accent }}>{heroLabel}</span>
              </div>
              <div className="space-y-4">
                {heroMembers.map((m, i) => (
                  <div key={i} className="flex justify-between items-center p-4 bg-white/5 rounded-2xl border border-white/5">
                    <span className="text-xs font-bold uppercase tracking-tight">{m.role}</span>
                    <span className="text-[10px] px-3 py-1 rounded-full font-black border"
                      style={{ background: '#10b9811a', color: '#34d399', borderColor: '#10b98133' }}>
                      {m.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ONBOARDING ───────────────────────────────────────────────────── */}
      <section className="py-24 px-6 border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center text-[10px] font-black uppercase tracking-[0.5em] text-slate-500 mb-20 italic">{onboardLabel}</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {steps.map((item, i) => (
              <div key={i} className="relative space-y-4">
                <span className="text-5xl font-black italic absolute -top-4 -left-2" style={{ color: 'rgba(255,255,255,0.04)' }}>{item.step}</span>
                <h4 className="text-xl font-black italic uppercase relative z-10">{item.label}</h4>
                <p className="text-sm text-slate-500 leading-relaxed font-light">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM MODELS ──────────────────────────────────────────────────── */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {models.map((model, i) => {
            const Icon = ICON_MAP[model.icon] ?? LayoutGrid;
            return (
              <div key={i} className="group relative rounded-[3rem] overflow-hidden border border-white/5 bg-slate-900/40 transition-all duration-500"
                onMouseEnter={e => (e.currentTarget.style.borderColor = `${accent}4d`)}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)')}>
                <img src={model.img} className="absolute inset-0 w-full h-full object-cover opacity-10 grayscale group-hover:scale-110 transition-transform duration-1000" alt={model.title} />
                <div className="relative p-12 bg-gradient-to-t from-[#020617] via-[#020617]/95 to-transparent">
                  <div className="mb-6 p-4 rounded-2xl w-fit transition-all" style={{ background: `${accent}1a`, color: accent }}
                    onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = accent; (e.currentTarget as HTMLDivElement).style.color = '#fff'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = `${accent}1a`; (e.currentTarget as HTMLDivElement).style.color = accent; }}>
                    <Icon size={30} />
                  </div>
                  <h3 className="text-2xl font-black uppercase italic mb-4 tracking-tighter">{model.title}</h3>
                  <p className="text-slate-400 font-light leading-relaxed mb-8">{model.desc}</p>
                  <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest" style={{ color: accent }}>
                    <Handshake size={14} /> Long-term Commitment
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── BENEFITS ─────────────────────────────────────────────────────── */}
      <section className="py-24 px-6" style={{ background: `${accent}0d` }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((box, i) => {
            const Icon = ICON_MAP[box.icon] ?? ShieldCheck;
            return (
              <div key={i} className="p-8 border border-white/5 rounded-3xl bg-slate-950/40">
                <div className="mb-6" style={{ color: accent }}><Icon size={24} /></div>
                <h5 className="font-black uppercase italic mb-2 tracking-tight">{box.title}</h5>
                <p className="text-sm text-slate-500 leading-relaxed font-light">{box.text}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto p-12 md:p-24 rounded-[4rem] text-center relative overflow-hidden shadow-2xl"
          style={{ backgroundImage: `linear-gradient(to bottom right, ${accent}, ${accentTo})` }}>
          <div className="absolute top-0 right-0 p-12 opacity-10 rotate-12"><Workflow size={300} /></div>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-7xl font-black italic uppercase tracking-tighter mb-8 leading-none">
              {ctaPl}<br /><span style={{ color: `${accent}66` }}>{ctaAcc}</span>
            </h2>
            <p className="text-blue-100 text-lg mb-12 max-w-xl mx-auto font-light">{ctaBody}</p>
            <button onClick={() => window.location.href = ctaHref}
              className="bg-white text-black px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:scale-105 transition-all shadow-2xl">
              {ctaBtn}
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}