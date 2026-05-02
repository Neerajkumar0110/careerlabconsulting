'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Library, Sparkles, ShieldCheck, Zap, GraduationCap,
  Search, ArrowUpRight, BrainCircuit, Globe, Database,
  BarChart3, X, Loader2, Mail, Users, ChevronRight,
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import { usePageContent } from '@/hooks/usePageContent';

// ── Helpers ───────────────────────────────────────────────────────────────────
function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

// ── Types ─────────────────────────────────────────────────────────────────────
interface StatItem    { label: string; val: string; icon: string }
interface FeatureCard { title: string; desc: string; icon: string }
interface TruthPoint  { text: string }

// ── Defaults ──────────────────────────────────────────────────────────────────
const DEFAULT_STATS = JSON.stringify([
  { label: 'RAG Latency',   val: '120ms', icon: 'Zap'        },
  { label: 'Accuracy Rate', val: '99.4%', icon: 'ShieldCheck' },
  { label: 'Institutions',  val: '40+',   icon: 'Library'     },
  { label: 'Student ROI',   val: '+34%',  icon: 'BarChart3'   },
]);

const DEFAULT_SUPERPOWERS = JSON.stringify([
  { title: 'Semantic Discovery Engine',  desc: 'Turn static library archives into a live conversational brain. Our RAG tech indexes text, video, and research data with 99% citation accuracy.',       icon: 'Search'   },
  { title: 'Automated Pedagogy',         desc: 'Real-time lesson adjustment based on cognitive load analysis of each individual student.',                                                            icon: 'GraduationCap' },
  { title: 'Global Localization',        desc: 'AI that understands cultural nuances and regional academic standards for every learner.',                                                             icon: 'Globe'    },
  { title: 'Private Data Vaults',        desc: 'Zero-Trust infrastructure ensuring student data never leaves your internal cloud environment.',                                                       icon: 'Database' },
]);

const DEFAULT_TRUTH_POINTS = JSON.stringify([
  { text: 'SOC2 Type II & FERPA Compliant'           },
  { text: 'On-Premise Deployment Models'             },
  { text: 'Hallucination Rate < 0.2%'                },
  { text: 'Multi-Model Agnostic (Claude, GPT, Gemini)' },
]);

const ICON_MAP: Record<string, React.ElementType> = {
  Zap, ShieldCheck, Library, BarChart3, Search, GraduationCap, Globe, Database, BrainCircuit,
};

export default function EducationAIPage() {
  const [isModalOpen, setIsModalOpen]   = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData]         = useState({ name: '', email: '' });

  const { get } = usePageContent('industry-education');

  // ── CMS values ─────────────────────────────────────────────────────────────
  const accentFrom       = get('hero', 'accent_from',      '#6366f1');
  const accentTo         = get('hero', 'accent_to',        '#06b6d4');
  const accentThree      = get('hero', 'accent_three',     '#10b981');
  const badgeText        = get('hero', 'badge_text',       'Cognitive Infrastructure 2.0');
  const heroPl           = get('hero', 'headline_plain',   'Knowledge');
  const heroAcc          = get('hero', 'headline_accent',  'Orchestrated');
  const heroBody         = get('hero', 'body_text',        'We don\'t just build chatbots. We engineer Retrieval-Augmented Learning Ecosystems that ground AI in institutional truth, eliminating hallucinations and ensuring pedagogical safety.');
  const heroBtnPrimary   = get('hero', 'btn_primary_label','DEPLOY ACADEMIC RAG');
  const heroBtnSecond    = get('hero', 'btn_secondary_label','VIEW CASE STUDIES');
  const statsJson        = get('hero', 'stats_json',       DEFAULT_STATS);
  const waNumber         = get('hero', 'whatsapp_number',  '918700236923');

  const superPl          = get('superpowers', 'headline_plain',  'Institutional');
  const superAcc         = get('superpowers', 'headline_accent', 'Superpowers');
  const superpowersJson  = get('superpowers', 'cards_json',      DEFAULT_SUPERPOWERS);

  const truthPl          = get('truth', 'headline_plain',  'Truth-First');
  const truthAcc         = get('truth', 'headline_accent', 'Intelligence.');
  const truthBody        = get('truth', 'body_text',       'Generic AI hallucinates. Our Education-Specific AI retrieves before it speaks. By grounding every response in your institution\'s proprietary knowledge, we ensure 100% academic integrity.');
  const truthPointsJson  = get('truth', 'points_json',     DEFAULT_TRUTH_POINTS);

  const ctaHeadline      = get('cta', 'headline',           'Ready to Upgrade?');
  const ctaBody          = get('cta', 'body_text',          'Join the elite circle of institutions transforming learning into a self-optimizing network.');
  const ctaBtnLabel      = get('cta', 'btn_label',          'BOOK ARCHITECT CONSULTATION');
  const ctaLocation      = get('cta', 'location_label',     'Education Hub: Gurugram, India');

  const modalBadge       = get('modal', 'badge_label',      'Academic RAG Consultation');
  const modalBtnLabel    = get('modal', 'btn_label',        'Request Deployment');
  const modalFooterNote  = get('modal', 'footer_note',      'Secure & FERPA-compliant architecture consultation');
  const modalWaNumber    = get('modal', 'whatsapp_number',  '918700236923');

  const stats        = safeParse<StatItem[]>(statsJson, []);
  const superpowers  = safeParse<FeatureCard[]>(superpowersJson, []);
  const truthPoints  = safeParse<TruthPoint[]>(truthPointsJson, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const msg = `*🎓 Education AI Consultation*%0A*Name:* ${formData.name}%0A*Email:* ${formData.email}`;
    setTimeout(() => {
      window.open(`https://wa.me/${modalWaNumber}?text=${msg}`, '_blank');
      setIsSubmitting(false);
      setIsModalOpen(false);
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-[#020617] text-slate-50 overflow-x-hidden font-sans selection:bg-indigo-500/30">
      <Navbar />

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 md:pt-56 md:pb-40 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10"
          style={{ background: `radial-gradient(circle at center, ${accentFrom}14 0%, transparent 70%)` }} />
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full blur-[120px] animate-pulse"
          style={{ background: `${accentFrom}1a` }} />

        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center space-y-8">
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full backdrop-blur-md"
              style={{ background: `${accentFrom}1a`, border: `1px solid ${accentFrom}33` }}>
              <Sparkles className="w-3.5 h-3.5" style={{ color: accentFrom }} />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: accentFrom }}>{badgeText}</span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="text-4xl md:text-7xl lg:text-9xl font-black tracking-tight leading-[0.9] uppercase italic">
              {heroPl} <br />
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(to right, ${accentFrom}, ${accentTo}, ${accentThree})` }}>
                {heroAcc}
              </span>
            </motion.h1>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
              className="max-w-2xl text-slate-400 text-base md:text-xl leading-relaxed">
              {heroBody}
            </motion.p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-4">
              <button onClick={() => setIsModalOpen(true)}
                className="group relative px-8 py-4 rounded-xl font-bold transition-all hover:scale-105 active:scale-95 shadow-2xl overflow-hidden flex items-center justify-center gap-2 text-sm uppercase tracking-widest"
                style={{ background: accentFrom, boxShadow: `0 20px 40px ${accentFrom}40` }}>
                {heroBtnPrimary} <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
              <button className="px-8 py-4 bg-white/5 border border-white/10 rounded-xl font-bold hover:bg-white/10 transition-all backdrop-blur-md text-sm uppercase tracking-widest">
                {heroBtnSecond}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ─────────────────────────────────────────────────────────── */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
          {stats.map((s, idx) => {
            const Icon = ICON_MAP[s.icon] ?? Zap;
            return (
              <motion.div key={idx} whileHover={{ y: -4 }}
                className="p-4 md:p-8 bg-white/[0.02] border border-white/5 rounded-2xl md:rounded-3xl transition-all group"
                style={{ ['--hover-border' as any]: `${accentFrom}4d` }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = `${accentFrom}4d`)}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)')}>
                <div className="mb-3 opacity-50 group-hover:opacity-100 transition-opacity" style={{ color: accentFrom }}>
                  <Icon className="w-5 h-5" />
                </div>
                <p className="text-2xl md:text-4xl font-black text-white">{s.val}</p>
                <p className="text-[10px] md:text-xs uppercase tracking-widest text-slate-500 font-bold mt-1">{s.label}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ── SUPERPOWERS ───────────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-[#030816]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter">
              {superPl} <br />
              <span className="underline underline-offset-8" style={{ color: accentFrom, textDecorationColor: `${accentFrom}4d` }}>{superAcc}</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {superpowers[0] && (() => {
              const Icon = ICON_MAP[superpowers[0].icon] ?? Search;
              return (
                <div className="md:col-span-8 p-8 md:p-12 rounded-[2rem] relative overflow-hidden group"
                  style={{ background: `linear-gradient(to bottom right, ${accentFrom}1a, transparent)`, border: `1px solid ${accentFrom}33` }}>
                  <div className="relative z-10 max-w-lg">
                    <Icon className="w-12 h-12 mb-6" style={{ color: accentFrom }} />
                    <h3 className="text-2xl md:text-4xl font-bold mb-4">{superpowers[0].title}</h3>
                    <p className="text-slate-400 leading-relaxed mb-6">{superpowers[0].desc}</p>
                    <div className="flex gap-2">
                      <span className="px-3 py-1 rounded-full text-[10px] font-bold" style={{ background: `${accentFrom}1a`, color: accentFrom }}>VECTOR SEARCH</span>
                      <span className="px-3 py-1 rounded-full text-[10px] font-bold" style={{ background: `${accentThree}1a`, color: accentThree }}>CITE-CHECK</span>
                    </div>
                  </div>
                  <div className="absolute top-1/2 -right-20 -translate-y-1/2 w-80 h-80 border-[20px] rounded-full group-hover:scale-110 transition-transform duration-700"
                    style={{ borderColor: `${accentFrom}0d` }} />
                </div>
              );
            })()}

            {superpowers[1] && (() => {
              const Icon = ICON_MAP[superpowers[1].icon] ?? GraduationCap;
              return (
                <div className="md:col-span-4 p-8 rounded-[2rem] bg-slate-900/50 border border-white/5 flex flex-col justify-between group">
                  <Icon className="w-10 h-10 group-hover:rotate-12 transition-transform" style={{ color: accentTo }} />
                  <div>
                    <h3 className="text-xl font-bold mb-2">{superpowers[1].title}</h3>
                    <p className="text-slate-500 text-sm">{superpowers[1].desc}</p>
                  </div>
                </div>
              );
            })()}

            {superpowers[2] && (() => {
              const Icon = ICON_MAP[superpowers[2].icon] ?? Globe;
              return (
                <div className="md:col-span-4 p-8 rounded-[2rem] bg-slate-900/50 border border-white/5 group">
                  <Icon className="w-10 h-10 mb-6" style={{ color: accentThree }} />
                  <h3 className="text-xl font-bold mb-2">{superpowers[2].title}</h3>
                  <p className="text-slate-500 text-sm">{superpowers[2].desc}</p>
                </div>
              );
            })()}

            {superpowers[3] && (() => {
              const Icon = ICON_MAP[superpowers[3].icon] ?? Database;
              return (
                <div className="md:col-span-8 p-8 md:p-12 rounded-[2rem] bg-slate-900/30 border border-white/5 relative overflow-hidden group">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                    <div className="max-w-md">
                      <Icon className="w-10 h-10 mb-6" style={{ color: accentFrom }} />
                      <h3 className="text-2xl font-bold mb-4">{superpowers[3].title}</h3>
                      <p className="text-slate-400 text-sm italic">{superpowers[3].desc}</p>
                    </div>
                    <div className="h-32 w-full md:w-48 bg-white/5 rounded-2xl flex items-center justify-center border border-dashed border-white/10">
                      <BrainCircuit className="w-12 h-12" style={{ color: `${accentFrom}80` }} />
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      </section>

      {/* ── TRUTH-FIRST ───────────────────────────────────────────────────── */}
      <section className="py-24 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Terminal mockup */}
          <div className="order-2 lg:order-1 relative">
            <div className="absolute -inset-10 rounded-full blur-[80px]" style={{ background: `${accentFrom}0d` }} />
            <div className="relative p-6 md:p-10 bg-slate-950 border rounded-[2.5rem] shadow-3xl" style={{ borderColor: `${accentFrom}4d` }}>
              <div className="flex items-center justify-between mb-8">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/50" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/50" />
                </div>
                <span className="text-[10px] font-mono font-bold" style={{ color: accentFrom }}>RAG_KERNEL_SYSTEM_V4</span>
              </div>
              <div className="space-y-4 font-mono text-xs md:text-sm">
                <div className="p-4 bg-white/5 rounded-xl border border-white/5" style={{ color: `${accentFrom}cc` }}>
                  <span style={{ color: accentFrom }}>Query:</span> &quot;Summarize Chapter 4 and compare with Lecture 12 notes.&quot;
                </div>
                <div className="flex justify-center py-2 animate-bounce">
                  <ArrowUpRight className="rotate-90" style={{ color: accentFrom }} />
                </div>
                <div className="p-4 rounded-xl border" style={{ background: `${accentFrom}1a`, borderColor: `${accentFrom}33`, color: `${accentFrom}e6` }}>
                  <span className="font-bold uppercase block mb-2 text-[10px]" style={{ color: accentThree }}>Source Verification Active</span>
                  &quot;In Chapter 4, the focus is on Neural Backprop... [Source: Page 142]. This correlates with Prof. Smith&apos;s lecture on October 4th...&quot;
                </div>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <h2 className="text-4xl md:text-7xl font-black uppercase italic tracking-tighter leading-none mb-8">
              {truthPl} <br />
              <span style={{ color: accentFrom }}>{truthAcc}</span>
            </h2>
            <p className="text-slate-400 text-lg mb-8">{truthBody}</p>
            <ul className="space-y-4">
              {truthPoints.map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm font-bold uppercase tracking-wide text-slate-200">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: accentFrom }} />
                  {item.text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden shadow-3xl group"
          style={{ backgroundImage: `linear-gradient(to bottom right, ${accentFrom}, ${accentTo})`, boxShadow: `0 40px 80px ${accentFrom}40` }}>
          <div className="absolute top-0 right-0 p-8 opacity-20 rotate-12 group-hover:rotate-45 transition-transform duration-700">
            <Sparkles size={120} />
          </div>
          <h2 className="text-4xl md:text-7xl font-black text-white mb-8 uppercase italic leading-none">{ctaHeadline}</h2>
          <p className="text-indigo-100 text-lg md:text-xl mb-12 max-w-xl mx-auto font-medium">{ctaBody}</p>
          <button onClick={() => setIsModalOpen(true)}
            className="px-12 py-6 bg-white rounded-2xl font-black text-xl hover:scale-105 transition-all shadow-xl active:scale-95 uppercase"
            style={{ color: accentFrom }}>
            {ctaBtnLabel}
          </button>
          <p className="mt-6 font-mono text-[10px] tracking-[0.3em] uppercase" style={{ color: 'rgba(219,234,254,0.5)' }}>{ctaLocation}</p>
        </div>
      </section>

      <Footer />

      {/* ── MODAL ─────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/95 backdrop-blur-md" />
            <motion.div initial={{ scale: 0.9, opacity: 0, y: 30 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 30 }}
              className="relative bg-[#0a0f1d] border border-white/10 p-8 md:p-12 rounded-[2.5rem] max-w-lg w-full shadow-3xl overflow-hidden">
              <button onClick={() => setIsModalOpen(false)} className="absolute top-8 right-8 p-2 text-slate-500 hover:text-white transition-colors"><X size={24} /></button>
              <div className="mb-10">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] mb-3" style={{ color: accentFrom }}>{modalBadge}</p>
                <h3 className="text-2xl font-black tracking-tight uppercase text-white">Let&apos;s Build Together</h3>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative group">
                  <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={16} />
                  <input required type="text" placeholder="Full Name"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 pl-12 text-sm text-white outline-none transition-all placeholder:text-slate-700"
                    style={{ ['--focus-border' as any]: accentFrom }}
                    onFocus={e => (e.currentTarget.style.borderColor = accentFrom)}
                    onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}
                    value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                </div>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={16} />
                  <input required type="email" placeholder="Institutional Email"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 pl-12 text-sm text-white outline-none transition-all placeholder:text-slate-700"
                    onFocus={e => (e.currentTarget.style.borderColor = accentFrom)}
                    onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}
                    value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                </div>
                <button disabled={isSubmitting} type="submit"
                  className="w-full py-5 text-white font-black uppercase tracking-[0.2em] rounded-2xl shadow-xl transition-all flex items-center justify-center gap-3 disabled:opacity-50 text-[10px] active:scale-95"
                  style={{ background: accentFrom }}>
                  {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : <>{modalBtnLabel} <ChevronRight size={18} /></>}
                </button>
                <p className="text-[8px] font-black text-center text-slate-600 uppercase tracking-widest mt-6 border-t border-white/5 pt-4">{modalFooterNote}</p>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}