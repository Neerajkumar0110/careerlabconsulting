// app/services/ai-automation/page.tsx
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Zap, Workflow, MousePointerClick, Repeat,
  Cog, Gauge, ArrowRight, Clock, Layers,
  X, Loader2, ChevronRight, Mail, Users,
  ShieldCheck,
} from 'lucide-react';
import Navbar from '@/components/freelancex/layout/HomeNavbar';
import Footer from '@/components/freelancex/landing/Footer';
import { usePageContent } from '@/hooks/usePageContent';

// ── Helpers ───────────────────────────────────────────────────────────────────
function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

// ── Types ─────────────────────────────────────────────────────────────────────
interface FeatureCard  { title: string; desc: string; icon: string }
interface BulletPoint  { text: string; icon: string }
interface StatRow      { label: string; val: string; trend: string }

// ── Icon map ──────────────────────────────────────────────────────────────────
const ICON_MAP: Record<string, React.ElementType> = {
  Workflow, MousePointerClick, Repeat, Clock, Layers, Zap, Cog, Gauge,
};

// ── Defaults ──────────────────────────────────────────────────────────────────
const DEFAULT_FEATURE_CARDS = JSON.stringify([
  { title: 'Cognitive Workflows',   desc: 'AI that makes decisions within your process chain, routing tasks based on intent and priority.',         icon: 'Workflow'           },
  { title: 'Robotic Process AI',    desc: 'Legacy software automation enhanced with computer vision to interact with non-API interfaces.',           icon: 'MousePointerClick'  },
  { title: 'Data Pipeline Sync',    desc: 'Autonomous moving and cleaning of data between your CRM, ERP, and Analytics dashboards.',                icon: 'Repeat'             },
]);

const DEFAULT_STATS = JSON.stringify([
  { label: 'Active Workflows',  val: '148',   trend: '+12%' },
  { label: 'Hours Saved / Mo',  val: '1,240', trend: '+24%' },
  { label: 'Error Rate',        val: '0.02%', trend: '-80%' },
]);

const DEFAULT_BULLETS = JSON.stringify([
  { text: 'Predictive Task Queuing',       icon: 'Clock'  },
  { text: 'Multi-Layer Process Mapping',   icon: 'Layers' },
  { text: 'API-First Implementation',      icon: 'Zap'    },
]);

export default function AIAutomationPage() {
  const [isModalOpen,   setIsModalOpen]   = useState(false);
  const [isSubmitting,  setIsSubmitting]  = useState(false);
  const [formData,      setFormData]      = useState({ name: '', email: '' });

  const { get } = usePageContent('services-ai-automation');

  // ── CMS values ────────────────────────────────────────────────────────────
  const accentFrom     = get('hero', 'accent_from',     '#3b82f6');
  const accentTo       = get('hero', 'accent_to',       '#6366f1');
  const badgeText      = get('hero', 'badge_text',      'Efficiency Engineering');
  const heroPl         = get('hero', 'headline_plain',  'INTELLIGENT');
  const heroAcc        = get('hero', 'headline_accent', 'AUTOMATION');
  const heroBody       = get('hero', 'body_text',       'Stop wasting human intelligence on repetitive tasks. We design and deploy autonomous workflows that handle data entry, lead nurturing, and complex operations while you sleep.');
  const heroBtnPrimary = get('hero', 'btn_primary',     'Automate My Business');
  const heroBtnSecond  = get('hero', 'btn_secondary',   'See Live Demo');
  const whatsappNum    = get('hero', 'whatsapp_number', '918700236923');

  const featuresPl     = get('features', 'headline_plain',  'Core');
  const featuresAcc    = get('features', 'headline_accent', 'Capabilities.');
  const featuresCards  = safeParse<FeatureCard[]>(get('features', 'cards_json', DEFAULT_FEATURE_CARDS), []);

  const dashboardTitle = get('dashboard', 'headline',       'Zero-Touch Operations');
  const dashboardBody  = get('dashboard', 'body_text',      'We build "Autopilot" modes for your business. By integrating AI into the core of your operational stack, we reduce human error to near-zero and increase output velocity by up to 10x.');
  const dashboardStats = safeParse<StatRow[]>(get('dashboard', 'stats_json', DEFAULT_STATS), []);
  const dashboardBullets = safeParse<BulletPoint[]>(get('dashboard', 'bullets_json', DEFAULT_BULLETS), []);
  const dashboardBadge   = get('dashboard', 'system_badge', 'AUTOMATION_CORE_v2.0');

  const ctaHeadline    = get('cta', 'headline',          'Scale Without Hiring');
  const ctaBody        = get('cta', 'body_text',         'Our automation architects are ready to build your autonomous future.');
  const ctaBtnLabel    = get('cta', 'btn_label',         'START AUTOMATING');
  const ctaPhone       = get('cta', 'phone_display',     '+91 870023 6923');
  const ctaVerified    = get('cta', 'verified_label',    'Verified Automation Protocol');

  const modalBadge     = get('contact_modal', 'badge_label',  'Automation Inquiry');
  const modalBtn       = get('contact_modal', 'btn_label',    'Send via WhatsApp');
  const modalFooter    = get('contact_modal', 'footer_note',  'Secure inquiry powered by Manee Pro 2.5');
  const modalWa        = get('contact_modal', 'whatsapp_number', '918700236923');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const msg = `*🤖 Automation Inquiry*%0A*Name:* ${formData.name}%0A*Email:* ${formData.email}`;
    setTimeout(() => {
      window.open(`https://wa.me/${modalWa}?text=${msg}`, '_blank');
      setIsSubmitting(false);
      setIsModalOpen(false);
    }, 1500);
  };

  return (
    <main className="flex min-h-screen flex-col bg-[#020617] text-white overflow-x-hidden font-sans">
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full -z-10 pointer-events-none"
          style={{ background: `${accentFrom}1a`, filter: 'blur(120px)' }} />
        <div className="max-w-7xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 backdrop-blur-md"
            style={{ background: `${accentFrom}1a`, border: `1px solid ${accentFrom}33` }}>
            <Zap className="w-4 h-4 animate-pulse" style={{ color: accentFrom }} />
            <span className="text-xs font-black uppercase tracking-widest" style={{ color: accentFrom }}>{badgeText}</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-tight">
            {heroPl}<br />
            <span className="italic" style={{ backgroundImage: `linear-gradient(to right, ${accentFrom}, ${accentTo})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              {heroAcc}
            </span>
          </motion.h1>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="max-w-3xl mx-auto text-gray-400 text-lg md:text-xl leading-relaxed mb-12">
            {heroBody}
          </motion.p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => setIsModalOpen(true)}
              className="px-10 py-5 rounded-2xl font-bold transition-all shadow-xl flex items-center justify-center gap-2 hover:scale-105 active:scale-95"
              style={{ background: accentFrom, boxShadow: `0 20px 40px ${accentFrom}40` }}>
              {heroBtnPrimary} <ArrowRight className="w-5 h-5" />
            </button>
            <button className="px-10 py-5 bg-white/5 border border-white/10 hover:bg-white/10 rounded-2xl font-bold transition-all">
              {heroBtnSecond}
            </button>
          </div>
        </div>
      </section>

      {/* ── FEATURE CARDS ─────────────────────────────────────────────────── */}
      <section className="py-24 px-6" style={{ background: 'rgba(255,255,255,0.01)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter">
              {featuresPl} <span className="italic" style={{ color: accentTo }}>{featuresAcc}</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuresCards.map((card, i) => {
              const Icon = ICON_MAP[card.icon] ?? Zap;
              return (
                <motion.div key={i} whileHover={{ y: -8 }}
                  className="group p-10 rounded-[2.5rem] border border-white/5 hover:border-opacity-30 transition-all"
                  style={{ background: `${accentFrom}08` }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = `${accentFrom}50`)}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)')}>
                  <div className="mb-6 p-4 rounded-2xl inline-block transition-all"
                    style={{ background: `${accentFrom}1a` }}
                    onMouseEnter={e => (e.currentTarget.style.background = accentFrom)}
                    onMouseLeave={e => (e.currentTarget.style.background = `${accentFrom}1a`)}>
                    <Icon className="w-8 h-8" style={{ color: accentFrom }} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{card.title}</h3>
                  <p className="text-gray-500 leading-relaxed">{card.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── DASHBOARD SECTION ─────────────────────────────────────────────── */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Dashboard Card */}
          <div className="relative">
            <div className="absolute -inset-10 rounded-full pointer-events-none"
              style={{ background: `${accentFrom}1a`, filter: 'blur(100px)' }} />
            <div className="relative bg-[#03081a] border border-white/10 rounded-[3rem] p-10 shadow-2xl overflow-hidden">
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-2">
                  <Cog className="w-5 h-5 animate-spin" style={{ color: accentFrom, animationDuration: '4s' }} />
                  <span className="font-mono text-sm tracking-widest" style={{ color: accentFrom }}>{dashboardBadge}</span>
                </div>
                <Gauge className="w-5 h-5 text-gray-600" />
              </div>
              <div className="space-y-8">
                {dashboardStats.map((stat, idx) => (
                  <div key={idx} className="flex justify-between items-end border-b border-white/5 pb-4">
                    <div>
                      <p className="text-[10px] text-gray-500 uppercase tracking-widest">{stat.label}</p>
                      <p className="text-3xl font-black italic">{stat.val}</p>
                    </div>
                    <span className={`text-xs font-bold ${stat.trend.includes('+') ? 'text-emerald-400' : 'text-blue-400'}`}>
                      {stat.trend}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-10 flex gap-4">
                <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full rounded-full w-[80%]" style={{ background: accentFrom }} />
                </div>
                <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full rounded-full w-[60%]" style={{ background: accentTo }} />
                </div>
              </div>
            </div>
          </div>
          {/* Text */}
          <div>
            <h2 className="text-4xl md:text-6xl font-black mb-8 italic tracking-tighter">{dashboardTitle}</h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">{dashboardBody}</p>
            <div className="space-y-6">
              {dashboardBullets.map((pt, idx) => {
                const Icon = ICON_MAP[pt.icon] ?? Zap;
                return (
                  <div key={idx} className="flex items-center gap-4 font-bold group cursor-default">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-all"
                      style={{ background: `${accentFrom}1a`, color: accentFrom }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = accentFrom; (e.currentTarget as HTMLElement).style.color = '#fff'; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = `${accentFrom}1a`; (e.currentTarget as HTMLElement).style.color = accentFrom; }}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-gray-200">{pt.text}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto rounded-[4rem] p-12 md:p-24 text-center relative overflow-hidden"
          style={{ backgroundImage: `linear-gradient(to bottom right, ${accentFrom}66, ${accentTo}66)`, border: `1px solid ${accentFrom}33` }}>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-7xl font-black mb-8 italic tracking-tighter uppercase leading-tight">{ctaHeadline}</h2>
            <p className="text-blue-100/70 text-lg md:text-xl mb-12 max-w-2xl mx-auto">{ctaBody}</p>
            <div className="flex flex-col items-center gap-6">
              <button onClick={() => setIsModalOpen(true)}
                className="bg-white px-16 py-6 rounded-full font-black text-2xl hover:scale-110 transition-all shadow-2xl"
                style={{ color: accentFrom }}>
                {ctaBtnLabel}
              </button>
              <div className="font-mono text-sm tracking-widest uppercase" style={{ color: accentFrom }}>{ctaPhone}</div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center gap-3 mt-8">
          <ShieldCheck size={14} className="text-emerald-500" />
          <span className="text-[9px] font-black text-slate-600 uppercase tracking-[0.3em]">{ctaVerified}</span>
        </div>
      </section>

      <Footer />

      {/* ── CONTACT MODAL ─────────────────────────────────────────────────── */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/95 backdrop-blur-md" />
            <motion.div initial={{ scale: 0.9, opacity: 0, y: 30 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 30 }}
              className="relative bg-[#0a0f1d] border border-white/10 p-8 md:p-12 rounded-[2.5rem] max-w-lg w-full shadow-2xl overflow-hidden">
              <button onClick={() => setIsModalOpen(false)} className="absolute top-8 right-8 p-2 text-slate-500 hover:text-white transition-colors">
                <X size={24} />
              </button>
              <div className="mb-10 text-center">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] mb-3" style={{ color: accentFrom }}>{modalBadge}</p>
                <h3 className="text-2xl font-black tracking-tight uppercase">Get In Touch</h3>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative group">
                  <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-blue-400" size={16} />
                  <input required type="text" placeholder="Your Full Name"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 pl-12 text-sm text-white focus:border-blue-500 outline-none transition-all placeholder:text-slate-700"
                    value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                </div>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-blue-400" size={16} />
                  <input required type="email" placeholder="Your Email"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 pl-12 text-sm text-white focus:border-blue-500 outline-none transition-all placeholder:text-slate-700"
                    value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                </div>
                <button disabled={isSubmitting} type="submit"
                  className="w-full py-5 font-black uppercase tracking-[0.2em] rounded-2xl shadow-xl transition-all flex items-center justify-center gap-3 disabled:opacity-50 text-xs active:scale-95"
                  style={{ background: accentFrom }}>
                  {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : <>{modalBtn} <ChevronRight size={18} /></>}
                </button>
                <p className="text-[8px] font-black text-center text-slate-600 uppercase tracking-widest mt-6 border-t border-white/5 pt-4">{modalFooter}</p>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}