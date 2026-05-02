// app/hirex/hiring-insights/page.tsx
'use client';

import React, { useState } from 'react';
import Navbar from '@/components/hirex/layout/Navbar';
import Footer from '@/components/hirex/home/Footer';
import {
  BarChart3, TrendingUp, Map, PieChart, Zap, Globe,
  ChevronRight, Sparkles,
  X, User, Building2, Send, Cpu, Layers, Target, Activity,
  BrainCircuit, Server
} from 'lucide-react';
import { usePageContent } from '@/hooks/usePageContent';

// ── Types ─────────────────────────────────────────────────────────────────────
interface PlatformStat  { label: string; value: string; icon: string; color: string }
interface SkillBar      { tech: string; growth: string; width: string; color: string; legacy?: boolean }
interface SalaryTier    { role: string; exp: string; range: string; icon: string; color: string }
interface LocationStat  { city: string; pct: string; color: string }
interface Projection    { title: string; body: string; icon: string; color: string }

function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

const ICON_MAP: Record<string, React.ElementType> = {
  Activity, Zap, Building2, Target, BarChart3, TrendingUp,
  BrainCircuit, Layers, Server, Cpu, Globe, Map, PieChart,
};

// ── Defaults ──────────────────────────────────────────────────────────────────
const DEFAULT_PLATFORM_STATS = JSON.stringify([
  { label: 'Data Points Analyzed', value: '2.4M+', icon: 'Activity',  color: 'text-blue-400'   },
  { label: 'Avg Offer Velocity',   value: '48 Hrs', icon: 'Zap',      color: 'text-yellow-400' },
  { label: 'Active Enterprise Orgs',value: '150+',  icon: 'Building2',color: 'text-purple-400' },
  { label: 'Accuracy vs Human',    value: '99.2%',  icon: 'Target',   color: 'text-emerald-400'},
], null, 2);

const DEFAULT_SKILL_BARS = JSON.stringify([
  { tech: 'Generative AI & LLMOps',             growth: '+142%', width: '95%', color: 'bg-blue-500'   },
  { tech: 'Distributed SQL (TiDB)',              growth: '+88%',  width: '80%', color: 'bg-cyan-500'   },
  { tech: 'Next.js & React Server Components',   growth: '+65%',  width: '65%', color: 'bg-purple-500' },
  { tech: 'Legacy PHP / LAMP Stack',             growth: '-12%',  width: '20%', color: 'bg-red-500', legacy: true },
], null, 2);

const DEFAULT_SALARY_TIERS = JSON.stringify([
  { role: 'Senior AI Engineer',       exp: '4-7 Years',  range: '₹45L - ₹85L', icon: 'BrainCircuit', color: 'emerald' },
  { role: 'Full Stack Lead',          exp: '5-8 Years',  range: '₹35L - ₹55L', icon: 'Layers',       color: 'blue'    },
  { role: 'Cloud / DevOps Architect', exp: '6-10 Years', range: '₹40L - ₹75L', icon: 'Server',       color: 'purple'  },
], null, 2);

const DEFAULT_LOCATION_STATS = JSON.stringify([
  { city: 'Bangalore', pct: '42% of AI Roles',       color: 'text-emerald-400' },
  { city: 'Delhi-NCR', pct: '28% of FinTech Roles',  color: 'text-blue-400'   },
  { city: 'Pune',      pct: '18% of Cloud/DevOps',   color: 'text-purple-400' },
  { city: 'Remote',    pct: '12% Cross-domain',       color: 'text-yellow-400' },
], null, 2);

const DEFAULT_PROJECTIONS = JSON.stringify([
  { title: 'Death of the Whiteboard', body: '85% of enterprise companies will shift from leetcode-style whiteboard interviews to autonomous, logic-based AI sandboxes by late 2026.', icon: 'TrendingUp', color: 'red'    },
  { title: 'The "AI-First" Developer', body: 'Engineers who can leverage APIs (like Gemini, OpenAI) and build autonomous agents will command a 40% salary premium over traditional CRUD developers.', icon: 'Cpu', color: 'emerald' },
], null, 2);

export default function HiringInsightsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', company: '', domain: '' });
  const { get } = usePageContent('hirex-hiring-insights');

  // ── CMS values ─────────────────────────────────────────────────────────────
  const accentFrom        = get('hero', 'accent_from',      '#10b981');
  const accentTo          = get('hero', 'accent_to',        '#22d3ee');
  const heroBadge         = get('hero', 'badge_text',       'Live Intelligence Engine');
  const heroTitle         = get('hero', 'headline_plain',   'Talent');
  const heroTitleAccent   = get('hero', 'headline_accent',  'Insights 360');
  const heroBody          = get('hero', 'body_text',        'Real-time analytics extracted from thousands of autonomous AI interviews across the Indian tech ecosystem.');

  const platformStats     = safeParse<PlatformStat[]>(get('platform_stats', 'items_json', DEFAULT_PLATFORM_STATS), []);

  const skillTitle        = get('skill_demand', 'headline',    'Skill Demand Matrix');
  const skillBody         = get('skill_demand', 'body_text',   'YoY growth in hiring volume based on core framework requirements.');
  const skillPeriod       = get('skill_demand', 'period_label','Q1 2026 Data');
  const skillBars         = safeParse<SkillBar[]>(get('skill_demand', 'bars_json', DEFAULT_SKILL_BARS), []);

  const salaryTitle       = get('salary', 'headline',    '2026 Salary Benchmarks');
  const salaryBody        = get('salary', 'body_text',   'Verified CTC data extracted from successfully closed enterprise offers on the HireX platform.');
  const salaryTiers       = safeParse<SalaryTier[]>(get('salary', 'tiers_json', DEFAULT_SALARY_TIERS), []);

  const heatmapTitle      = get('heatmap', 'headline',   'Where is the talent migrating?');
  const heatmapBody       = get('heatmap', 'body_text',  'With hybrid work normalizing, hiring hubs are shifting. Bangalore remains the apex for Core AI, while Pune and Delhi-NCR are capturing massive Enterprise SaaS workloads.');
  const locationStats     = safeParse<LocationStat[]>(get('heatmap', 'stats_json', DEFAULT_LOCATION_STATS), []);

  const projTitle         = get('projections', 'headline', 'Future Projections');
  const projBody          = get('projections', 'body_text','What our models indicate for the next 18 months in tech hiring.');
  const projItems         = safeParse<Projection[]>(get('projections', 'items_json', DEFAULT_PROJECTIONS), []);

  const ctaTitle          = get('cta', 'headline',       'Need deeper custom insights?');
  const ctaBody           = get('cta', 'body_text',      'Request a tailored intelligence report specifically for your industry vertical and tech stack.');
  const ctaBtn            = get('cta', 'btn_label',      'Request Full Report');

  const modalTitle        = get('modal', 'headline',     'Request Intelligence');
  const modalSubtitle     = get('modal', 'subheading',   'Submit details to connect via WhatsApp');
  const modalBtn          = get('modal', 'btn_label',    'Send to Analyst');
  const waNumber          = get('modal', 'whatsapp_number', '918700236923');

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `*HireX Market Intelligence Request*%0A%0A*Name:* ${formData.name}%0A*Company:* ${formData.company}%0A*Domain:* ${formData.domain}%0A%0A_Please share the deep-dive market report._`;
    window.open(`https://wa.me/${waNumber}?text=${msg}`, '_blank');
    setIsModalOpen(false);
    setFormData({ name: '', company: '', domain: '' });
  };

  return (
    <main className="min-h-screen relative overflow-hidden bg-[#020617] text-white selection:bg-emerald-500/30">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full"
          style={{ background: `${accentFrom}1a`, filter: 'blur(150px)', transform: 'translate(33%, -33%)' }} />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full"
          style={{ background: `${accentTo}1a`, filter: 'blur(120px)', transform: 'translate(-33%, 33%)' }} />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      <Navbar />

      <div className="relative z-10 pt-28 pb-16 md:pt-40 md:pb-24">

        {/* ── HERO ──────────────────────────────────────────────────────────── */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-16 md:mb-24 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-[10px] md:text-xs font-mono uppercase tracking-widest mb-6"
            style={{ background: `${accentFrom}1a`, borderColor: `${accentFrom}33`, color: accentFrom }}>
            <Sparkles className="w-4 h-4" /> {heroBadge}
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight mb-6 leading-tight">
            {heroTitle}{' '}
            <span className="text-transparent bg-clip-text"
              style={{ backgroundImage: `linear-gradient(to right, ${accentFrom}, ${accentTo})` }}>
              {heroTitleAccent}
            </span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-slate-400 leading-relaxed max-w-3xl mx-auto">{heroBody}</p>
        </section>

        {/* ── PLATFORM STATS ────────────────────────────────────────────────── */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-24">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {platformStats.map((stat, i) => {
              const Icon = ICON_MAP[stat.icon] ?? Activity;
              return (
                <div key={i} className="bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 text-center hover:bg-slate-900/60 transition-colors">
                  <Icon className={`w-8 h-8 mx-auto mb-4 ${stat.color}`} />
                  <h4 className="text-2xl sm:text-3xl font-black text-white mb-1">{stat.value}</h4>
                  <p className="text-[10px] sm:text-xs text-slate-500 uppercase tracking-widest font-bold">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── SKILL DEMAND ──────────────────────────────────────────────────── */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-24">
          <div className="bg-slate-900/40 border border-white/10 rounded-[2.5rem] p-6 sm:p-10 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none"
              style={{ background: `${accentFrom}1a`, filter: 'blur(100px)' }} />
            <div className="flex flex-col md:flex-row items-end justify-between gap-6 mb-10 relative z-10">
              <div>
                <h2 className="text-2xl md:text-4xl font-bold text-white mb-2 flex items-center gap-3">
                  <BarChart3 style={{ color: accentFrom }} className="w-8 h-8" /> {skillTitle}
                </h2>
                <p className="text-slate-400 text-sm md:text-base">{skillBody}</p>
              </div>
              <div className="px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider"
                style={{ background: `${accentFrom}1a`, border: `1px solid ${accentFrom}33`, color: accentFrom }}>
                {skillPeriod}
              </div>
            </div>
            <div className="space-y-6 relative z-10">
              {skillBars.map((skill, i) => (
                <div key={i}>
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-sm sm:text-base font-bold text-white">{skill.tech}</span>
                    <span className={`text-sm font-mono font-bold ${skill.legacy ? 'text-red-400' : 'text-emerald-400'}`}>{skill.growth}</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden">
                    <div className={`h-full rounded-full ${skill.color}`} style={{ width: skill.width }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SALARY BENCHMARKS ─────────────────────────────────────────────── */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{salaryTitle}</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">{salaryBody}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {salaryTiers.map((tier, i) => {
              const Icon = ICON_MAP[tier.icon] ?? BrainCircuit;
              return (
                <div key={i} className="bg-slate-900/40 border border-white/10 rounded-[2rem] p-8 text-center hover:bg-slate-900/60 transition-all duration-300 group">
                  <div className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center border mb-6 group-hover:scale-110 transition-transform"
                    style={{ background: `${accentFrom}1a`, borderColor: `${accentFrom}33` }}>
                    <Icon className="w-8 h-8" style={{ color: accentFrom }} />
                  </div>
                  <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-2">{tier.exp}</p>
                  <h3 className="text-xl font-bold text-white mb-4">{tier.role}</h3>
                  <div className="text-2xl sm:text-3xl font-black font-mono text-white bg-white/5 py-3 rounded-xl border border-white/5">
                    {tier.range}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── TALENT HEATMAP ────────────────────────────────────────────────── */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-24">
          <div className="border border-white/10 rounded-[2.5rem] p-8 md:p-12 flex flex-col lg:flex-row items-center gap-12 relative overflow-hidden"
            style={{ background: `linear-gradient(to bottom right, ${accentFrom}1a, rgba(15,23,42,0.8))` }}>
            <div className="lg:w-1/2 relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-bold uppercase tracking-wider mb-6"
                style={{ background: `${accentFrom}1a`, borderColor: `${accentFrom}33`, color: accentFrom }}>
                <Map className="w-4 h-4" /> Geography Data
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">{heatmapTitle}</h2>
              <p className="text-slate-400 text-base md:text-lg leading-relaxed mb-8">{heatmapBody}</p>
              <div className="grid grid-cols-2 gap-4">
                {locationStats.map((loc, i) => (
                  <div key={i} className="bg-black/30 p-4 rounded-xl border border-white/5">
                    <h4 className="text-white font-bold mb-1">{loc.city}</h4>
                    <p className={`text-xs ${loc.color}`}>{loc.pct}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:w-1/2 w-full relative z-10 flex justify-center">
              <div className="w-full max-w-sm aspect-square rounded-full border flex items-center justify-center relative"
                style={{ background: `${accentFrom}0d`, borderColor: `${accentFrom}33`, boxShadow: `0 0 100px ${accentFrom}1a` }}>
                <Globe className="w-32 h-32 opacity-50" style={{ color: accentFrom, animation: 'spin 60s linear infinite' }} />
                <div className="absolute top-1/4 right-1/4 w-3 h-3 rounded-full animate-pulse" style={{ background: accentTo, boxShadow: `0 0 15px ${accentTo}` }} />
                <div className="absolute bottom-1/3 left-1/3 w-4 h-4 rounded-full animate-pulse" style={{ background: accentFrom, boxShadow: `0 0 15px ${accentFrom}` }} />
                <div className="absolute top-1/2 left-1/4 w-2 h-2 rounded-full animate-pulse" style={{ background: '#a855f7', boxShadow: `0 0 15px #a855f7` }} />
              </div>
            </div>
          </div>
        </section>

        {/* ── PROJECTIONS ────────────────────────────────────────────────────── */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{projTitle}</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">{projBody}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projItems.map((p, i) => {
              const Icon = ICON_MAP[p.icon] ?? TrendingUp;
              return (
                <div key={i} className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 hover:bg-white/[0.04] transition-colors">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                    style={{ background: `${accentFrom}1a`, border: `1px solid ${accentFrom}33` }}>
                    <Icon className="w-6 h-6" style={{ color: accentFrom }} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{p.title}</h3>
                  <p className="text-slate-400 leading-relaxed text-sm">{p.body}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── CTA ────────────────────────────────────────────────────────────── */}
        <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="p-8 md:p-12 rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden text-center md:text-left"
            style={{ background: accentFrom, boxShadow: `0 20px 40px ${accentFrom}66` }}>
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold mb-2 text-white">{ctaTitle}</h3>
              <p className="text-sm md:text-base max-w-md" style={{ color: 'rgba(209,250,229,0.8)' }}>{ctaBody}</p>
            </div>
            <button onClick={() => setIsModalOpen(true)}
              className="relative z-10 whitespace-nowrap w-full md:w-auto px-8 py-4 bg-white font-black rounded-2xl hover:bg-slate-100 transition-all flex items-center justify-center gap-2 shadow-xl hover:scale-105"
              style={{ color: accentFrom }}>
              {ctaBtn} <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </section>

      </div>

      {/* ── MODAL ──────────────────────────────────────────────────────────── */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg bg-[#0b0f1f] border rounded-[2.5rem] overflow-hidden shadow-2xl"
            style={{ borderColor: `${accentFrom}4d`, boxShadow: `0 0 50px ${accentFrom}33` }}>
            <button onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 p-2 text-slate-500 hover:text-white transition-colors bg-white/5 rounded-full">
              <X className="w-5 h-5" />
            </button>
            <div className="p-8 md:p-10">
              <div className="mb-8 text-center">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 border"
                  style={{ background: `${accentFrom}1a`, borderColor: `${accentFrom}33`, color: accentFrom }}>
                  <PieChart className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white">{modalTitle}</h3>
                <p className="text-slate-400 text-sm mt-1">{modalSubtitle}</p>
              </div>
              <form onSubmit={handleWhatsAppSubmit} className="space-y-4">
                {[
                  { icon: User,      placeholder: 'Your Name',               key: 'name',    type: 'text'  },
                  { icon: Building2, placeholder: 'Company Name',            key: 'company', type: 'text'  },
                  { icon: Zap,       placeholder: 'Tech Domain (e.g. AI)',   key: 'domain',  type: 'text'  },
                ].map(field => (
                  <div key={field.key} className="relative">
                    <field.icon className="absolute left-4 top-4 text-slate-500 w-4 h-4" />
                    <input required type={field.type} placeholder={field.placeholder}
                      className="bg-white/5 border border-white/10 rounded-xl p-4 pl-12 text-sm text-white outline-none w-full transition-colors"
                      style={{ ['--tw-ring-color' as any]: accentFrom }}
                      value={(formData as any)[field.key]}
                      onChange={e => setFormData({ ...formData, [field.key]: e.target.value })} />
                  </div>
                ))}
                <button type="submit"
                  className="w-full text-white font-black py-4 rounded-2xl flex items-center justify-center gap-2 transition-all mt-6"
                  style={{ background: accentFrom, boxShadow: `0 10px 30px ${accentFrom}66` }}>
                  {modalBtn} <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}