// app/services/ai-web-apps/page.tsx
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Layout, Smartphone, Globe, Monitor,
  Code2, Zap, ArrowRight, MousePointer2,
  Sparkles, Search, ShieldCheck,
  X, Loader2, ChevronRight, Mail, Users,
} from 'lucide-react';
import Navbar from '@/components/freelancex/layout/HomeNavbar';
import Footer from '@/components/freelancex/landing/Footer';
import { usePageContent } from '@/hooks/usePageContent';

function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

interface FeatureCard { title: string; desc: string; icon: string }
interface StackRow    { label: string; value: string; icon: string }
interface StatBox     { icon: string; label: string }

const ICON_MAP: Record<string, React.ElementType> = {
  Layout, Smartphone, Globe, Monitor, Code2, Zap, MousePointer2, Sparkles, Search,
};

const DEFAULT_FEATURE_CARDS = JSON.stringify([
  { title: 'AI SaaS Platforms',     desc: 'Full-scale software-as-a-service development with embedded LLMs and agentic features.',                            icon: 'Globe'        },
  { title: 'Predictive Dashboards', desc: 'Data-heavy interfaces that don\'t just show the past, but forecast future trends using AI.',                        icon: 'Monitor'      },
  { title: 'Generative UI/UX',      desc: 'Interfaces that adapt in real-time based on user behavior and AI-driven personalization.',                          icon: 'MousePointer2'},
]);
const DEFAULT_STACK_ROWS = JSON.stringify([
  { label: 'Frontend Stack',  value: 'Next.js / Tailwind', icon: 'Code2'    },
  { label: 'AI Integration',  value: 'LangChain / OpenAI', icon: 'Zap'      },
  { label: 'Vector Search',   value: 'Pinecone / Supabase',icon: 'Search'   },
]);
const DEFAULT_STAT_BOXES = JSON.stringify([
  { icon: 'Smartphone', label: 'PWA Ready'    },
  { icon: 'Zap',        label: 'Edge Latency' },
]);

export default function AIWebAppsPage() {
  const [isModalOpen,  setIsModalOpen]  = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData,     setFormData]     = useState({ name: '', email: '' });

  const { get } = usePageContent('services-ai-web-apps');

  const accentFrom     = get('hero', 'accent_from',     '#3b82f6');
  const accentTo       = get('hero', 'accent_to',       '#06b6d4');
  const badgeText      = get('hero', 'badge_text',      'AI-Native Web Engineering');
  const heroPl         = get('hero', 'headline_plain',  'INTELLIGENT');
  const heroAcc        = get('hero', 'headline_accent', 'WEB APPS');
  const heroBody       = get('hero', 'body_text',       'We don\'t just build websites; we build autonomous web ecosystems. From AI-driven SaaS platforms to predictive dashboards, we merge world-class UX with neural compute.');
  const heroBtnLabel   = get('hero', 'btn_label',       'Start Your Project');

  const featuresPl     = get('features', 'headline_plain',  'What We');
  const featuresAcc    = get('features', 'headline_accent', 'Build.');
  const featuresCards  = safeParse<FeatureCard[]>(get('features', 'cards_json', DEFAULT_FEATURE_CARDS), []);

  const techPl         = get('tech', 'headline_plain',  'Beyond The');
  const techAcc        = get('tech', 'headline_accent', 'Browser');
  const techBody       = get('tech', 'body_text',       'We leverage modern frameworks like Next.js and React, infused with proprietary AI middleware, to create high-performance web experiences. Our apps are mobile-responsive, SEO-optimized, and built to handle millions of tokens per minute.');
  const techStackRows  = safeParse<StackRow[]>(get('tech', 'stack_rows_json', DEFAULT_STACK_ROWS), []);
  const techSpeedLabel = get('tech', 'speed_label',     'Optimized for Speed');
  const techStatBoxes  = safeParse<StatBox[]>(get('tech', 'stat_boxes_json', DEFAULT_STAT_BOXES), []);

  const ctaHeadline    = get('cta', 'headline',         'Build the Future on Web');
  const ctaBody        = get('cta', 'body_text',        'Our engineering team is ready to develop your AI-native web application.');
  const ctaBtnLabel    = get('cta', 'btn_label',        'START CODING');
  const ctaPhone       = get('cta', 'phone_display',    '+91 870023 6923');
  const ctaVerified    = get('cta', 'verified_label',   'Verified Web Development Team');

  const modalBadge     = get('contact_modal', 'badge_label',     'Web App Inquiry');
  const modalBtn       = get('contact_modal', 'btn_label',       'Send via WhatsApp');
  const modalFooter    = get('contact_modal', 'footer_note',     'Secure inquiry powered by Manee Pro 2.5');
  const modalWa        = get('contact_modal', 'whatsapp_number', '918700236923');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const msg = `*🌐 Web App Inquiry*%0A*Name:* ${formData.name}%0A*Email:* ${formData.email}`;
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
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full -z-10"
          style={{ background: `${accentFrom}1a`, filter: 'blur(120px)' }} />
        <div className="max-w-7xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
            style={{ background: `${accentFrom}1a`, border: `1px solid ${accentFrom}33` }}>
            <Layout className="w-4 h-4" style={{ color: accentFrom }} />
            <span className="text-xs font-black uppercase tracking-widest" style={{ color: accentFrom }}>{badgeText}</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-tight">
            {heroPl}<br />
            <span className="italic" style={{ backgroundImage: `linear-gradient(to right, ${accentFrom}, ${accentTo})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{heroAcc}</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="max-w-3xl mx-auto text-gray-400 text-lg md:text-xl leading-relaxed mb-12">{heroBody}</motion.p>
          <button onClick={() => setIsModalOpen(true)}
            className="px-10 py-5 rounded-2xl font-bold transition-all shadow-xl flex items-center gap-2 mx-auto hover:scale-105 active:scale-95"
            style={{ background: accentFrom, boxShadow: `0 20px 40px ${accentFrom}40` }}>
            {heroBtnLabel} <ArrowRight className="w-5 h-5" />
          </button>
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuresCards.map((item, i) => {
              const Icon = ICON_MAP[item.icon] ?? Layout;
              return (
                <motion.div key={i} whileHover={{ y: -8 }}
                  className="group p-10 rounded-[2.5rem] border border-white/5 transition-all"
                  style={{ background: `${accentFrom}08` }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = `${accentFrom}50`)}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)')}>
                  <div className="mb-6 p-4 rounded-2xl inline-block transition-all" style={{ background: `${accentFrom}1a` }}>
                    <Icon className="w-8 h-8" style={{ color: accentFrom }} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                  <p className="text-gray-500 leading-relaxed text-sm">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── TECH SECTION ──────────────────────────────────────────────────── */}
      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Terminal card */}
          <div className="relative order-2 lg:order-1">
            <div className="absolute -inset-10 rounded-full pointer-events-none"
              style={{ background: `${accentFrom}0d`, filter: 'blur(100px)' }} />
            <div className="relative bg-[#03081a] border border-white/10 rounded-[3rem] p-8 md:p-12 shadow-2xl">
              <div className="flex gap-4 mb-10">
                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/50" />
              </div>
              <div className="space-y-6">
                {techStackRows.map((row, idx) => {
                  const Icon = ICON_MAP[row.icon] ?? Zap;
                  return (
                    <div key={idx} className="p-4 rounded-xl border border-white/10 flex items-center justify-between"
                      style={{ background: 'rgba(255,255,255,0.05)' }}>
                      <div className="flex items-center gap-3">
                        <Icon className="w-5 h-5" style={{ color: accentFrom }} />
                        <span className="font-mono text-sm uppercase">{row.label}</span>
                      </div>
                      <span className="text-xs text-gray-500">{row.value}</span>
                    </div>
                  );
                })}
              </div>
              <div className="mt-8 pt-8 border-t border-white/5 flex justify-center">
                <div className="flex items-center gap-2" style={{ color: accentFrom }}>
                  <Sparkles className="w-4 h-4" />
                  <span className="text-xs font-black uppercase tracking-widest">{techSpeedLabel}</span>
                </div>
              </div>
            </div>
          </div>
          {/* Text */}
          <div className="order-1 lg:order-2">
            <h2 className="text-4xl md:text-6xl font-black mb-8 italic tracking-tighter">{techPl}<br />{techAcc}</h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">{techBody}</p>
            <div className="grid grid-cols-2 gap-4">
              {techStatBoxes.map((box, i) => {
                const Icon = ICON_MAP[box.icon] ?? Zap;
                return (
                  <div key={i} className="p-5 rounded-2xl border border-white/5"
                    style={{ background: 'rgba(255,255,255,0.03)' }}>
                    <Icon className="mb-2" style={{ color: accentFrom }} />
                    <p className="font-bold text-sm">{box.label}</p>
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
          style={{ backgroundImage: `linear-gradient(to bottom right, ${accentFrom}66, ${accentTo}33)`, border: `1px solid ${accentFrom}33` }}>
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
              onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-black/95 backdrop-blur-md" />
            <motion.div initial={{ scale: 0.9, opacity: 0, y: 30 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 30 }}
              className="relative bg-[#0a0f1d] border border-white/10 p-8 md:p-12 rounded-[2.5rem] max-w-lg w-full shadow-2xl">
              <button onClick={() => setIsModalOpen(false)} className="absolute top-8 right-8 p-2 text-slate-500 hover:text-white transition-colors"><X size={24} /></button>
              <div className="mb-10 text-center">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] mb-3" style={{ color: accentFrom }}>{modalBadge}</p>
                <h3 className="text-2xl font-black tracking-tight uppercase">Get In Touch</h3>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative"><Users className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={16} />
                  <input required type="text" placeholder="Your Full Name" className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 pl-12 text-sm text-white focus:border-blue-500 outline-none transition-all placeholder:text-slate-700" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                </div>
                <div className="relative"><Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={16} />
                  <input required type="email" placeholder="Your Email" className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 pl-12 text-sm text-white focus:border-blue-500 outline-none transition-all placeholder:text-slate-700" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                </div>
                <button disabled={isSubmitting} type="submit" className="w-full py-5 font-black uppercase tracking-[0.2em] rounded-2xl shadow-xl transition-all flex items-center justify-center gap-3 disabled:opacity-50 text-xs active:scale-95" style={{ background: accentFrom }}>
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