'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Zap, BrainCircuit, Building2, BadgeCheck,
  ArrowRight, Maximize2, Layers, Cpu,
  ShieldCheck, Network, X, Loader2,
  Mail, Users, ChevronRight,
} from 'lucide-react';
import Navbar from '@/components/freelancex/layout/HomeNavbar';
import Footer from '@/components/freelancex/landing/Footer';
import { usePageContent } from '@/hooks/usePageContent';

// ── Helpers ───────────────────────────────────────────────────────────────────
function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

// ── Types ─────────────────────────────────────────────────────────────────────
interface ModuleItem  { title: string; subtitle: string; desc: string; features: string[]; icon: string; color: string; moduleId: string }
interface PipelineStep { label: string; stepId: string }
interface Stat         { value: string; label: string }

// ── Icon map ──────────────────────────────────────────────────────────────────
const ICON_MAP: Record<string, React.ElementType> = { BrainCircuit, Building2, BadgeCheck, Zap, ShieldCheck, Layers, Cpu, Network };

// ── Defaults ─────────────────────────────────────────────────────────────────
const DEFAULT_MODULES = JSON.stringify([
  { title: 'EDU-AI:', subtitle: 'Learning Core', desc: 'Adaptive RAG-based tutoring, sentiment-aware pedagogy, and personalized knowledge graphs that scale the 1-on-1 mentor experience.', features: ['Hyper-Personalized Content', 'Real-time Skill Gap Analysis', 'Generative Socratic Tutors'], icon: 'BrainCircuit', color: 'cyan', moduleId: 'MODULE_01' },
  { title: 'EDU-INST:', subtitle: 'Campus OS', desc: 'The institutional operating system. Managing enrollment, grant lifecycles, and zero-trust security with predictive precision.', features: ['Predictive Yield Models', 'Autonomous Grant Compliance', 'Secure Data Sovereignty'], icon: 'Building2', color: 'blue', moduleId: 'MODULE_02' },
  { title: 'EDU-CERT:', subtitle: 'Skill Tokenization', desc: 'The "Proof of Skill" layer. Immutable credentials, fraud-proof proctoring, and labor-market syllabus alignment.', features: ['Biometric Proctoring', 'Fraud-Proof Badging', 'Syllabus-to-Jobs Mapping'], icon: 'BadgeCheck', color: 'amber', moduleId: 'MODULE_03' },
]);
const DEFAULT_PIPELINE = JSON.stringify([
  { label: 'Audit & Ingest', stepId: 'STEP_01' },
  { label: 'Infrastructure Build', stepId: 'STEP_02' },
  { label: 'Agent Deployment', stepId: 'STEP_03' },
  { label: 'Scale & Monitor', stepId: 'STEP_04' },
]);
const DEFAULT_STATS = JSON.stringify([
  { value: '100%', label: 'Data Synergy' },
  { value: '<500ms', label: 'Network Latency' },
]);

const COLOR_MAP: Record<string, { bg: string; border: string; text: string; hover: string }> = {
  cyan:  { bg: 'rgba(6,182,212,0.1)',   border: 'rgba(6,182,212,0.3)',   text: '#06b6d4', hover: 'rgba(6,182,212,0.15)'  },
  blue:  { bg: 'rgba(59,130,246,0.1)',  border: 'rgba(59,130,246,0.3)',  text: '#3b82f6', hover: 'rgba(59,130,246,0.15)' },
  amber: { bg: 'rgba(245,158,11,0.1)',  border: 'rgba(245,158,11,0.3)',  text: '#f59e0b', hover: 'rgba(245,158,11,0.15)' },
};

export default function EducationPage() {
  const [isModalOpen, setIsModalOpen]   = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData]         = useState({ name: '', email: '' });

  const { get } = usePageContent('industry-education2');

  // ── CMS values ────────────────────────────────────────────────────────────
  const accentFrom     = get('hero', 'accent_from',      '#06b6d4');
  const accentTo       = get('hero', 'accent_to',        '#6366f1');
  const badgeText      = get('hero', 'badge_text',       'The Full Spectrum Intelligence');
  const heroPl         = get('hero', 'headline_plain',   'The Integrated');
  const heroAcc        = get('hero', 'headline_accent',  'Future Academy');
  const heroBody       = get('hero', 'body_text',        "We don't just sell tools; we engineer Neural Academic Infrastructure. Explore the synergy between cognitive learning systems, autonomous institutional governance, and immutable skill verification.");
  const heroBtnLabel   = get('hero', 'btn_label',        'Download Full Capability Deck');
  const heroLocation   = get('hero', 'location_label',   'Global HQ: Gurugram // Innovation Node: NYC');

  const modulesPl      = get('modules', 'headline_plain',  'Core');
  const modulesAcc     = get('modules', 'headline_accent', 'Modules');
  const modulesItems   = safeParse<ModuleItem[]>(get('modules', 'items_json', DEFAULT_MODULES), []);

  const integPl        = get('integration', 'headline_plain',  'Fully');
  const integAcc       = get('integration', 'headline_accent', 'Interconnected');
  const integBody      = get('integration', 'body_text',       'Our ecosystem ensures that data from the Learning Core updates the Campus OS in real-time, which then triggers Verification upon mastery. No data silos. No manual handoffs. Just a singular, high-velocity intelligence engine.');
  const integStats     = safeParse<Stat[]>(get('integration', 'stats_json', DEFAULT_STATS), []);
  const integCode      = get('integration', 'code_snippet',    '"Cross-module bridge active. Student ID: #X992 achieved mastery in Neural-Link-v2. Sending verification request to Edu-Cert. Updating Institutional Registrar."');

  const pipelinePl     = get('pipeline', 'headline_plain',  'The Deployment');
  const pipelineAcc    = get('pipeline', 'headline_accent', 'Pipeline');
  const pipelineItems  = safeParse<PipelineStep[]>(get('pipeline', 'items_json', DEFAULT_PIPELINE), []);

  const ctaHeadline    = get('cta', 'headline',           'Architect Your Super-Campus');
  const ctaBody        = get('cta', 'body_text',          'Ready to lead the academic revolution? Connect with our vertical architects to design a bespoke integration of our full capability set.');
  const ctaBtnLabel    = get('cta', 'btn_label',          'Schedule Architecture Deep-Dive');
  const ctaLocation    = get('cta', 'location_label',     'Global HQ: Gurugram // Innovation Node: NYC');

  const modalBadge     = get('contact_modal', 'badge_label',  'Request a Briefing');
  const modalBtnLabel  = get('contact_modal', 'btn_label',    'Send Request');
  const modalWaNumber  = get('contact_modal', 'whatsapp_number', '918700236923');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const msg = `*📚 Education Inquiry*%0A*Name:* ${formData.name}%0A*Email:* ${formData.email}`;
    setTimeout(() => {
      window.open(`https://wa.me/${modalWaNumber}?text=${msg}`, '_blank');
      setIsSubmitting(false);
      setIsModalOpen(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white overflow-x-hidden font-sans">
      <Navbar />
      <main className="flex-grow pt-24 lg:pt-32 pb-24">

        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <section className="relative pt-12 pb-20 px-6">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(6,182,212,0.1)_0%,_transparent_70%)] -z-10" />
          <div className="max-w-7xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-8 backdrop-blur-md"
              style={{ background: `${accentFrom}1a`, borderColor: `${accentFrom}33` }}>
              <Maximize2 size={14} style={{ color: accentFrom }} />
              <span className="text-[10px] font-black uppercase tracking-[0.3em]" style={{ color: accentFrom }}>{badgeText}</span>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="text-4xl md:text-7xl font-black tracking-tighter leading-[0.85] uppercase italic mb-8">
              {heroPl} <br />
              <span className="not-italic" style={{
                backgroundImage: `linear-gradient(to right, ${accentFrom}, #3b82f6, #6366f1)`,
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>{heroAcc}</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
              className="max-w-3xl mx-auto text-slate-400 text-lg md:text-xl leading-relaxed font-light mb-10">
              {heroBody}
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row justify-center gap-4">
              <button onClick={() => setIsModalOpen(true)}
                className="px-10 py-5 font-black text-base uppercase italic rounded-2xl transition-all hover:scale-105 shadow-2xl"
                style={{ background: accentFrom, color: '#000' }}>
                {heroBtnLabel}
              </button>
            </motion.div>
            <p className="mt-6 text-[10px] font-mono tracking-[0.3em] uppercase italic" style={{ color: `${accentFrom}60` }}>{heroLocation}</p>
          </div>
        </section>

        {/* ── MODULES ──────────────────────────────────────────────────────── */}
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter">
                {modulesPl} <span className="italic" style={{ color: accentFrom }}>{modulesAcc}</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {modulesItems.map((mod, i) => {
                const Icon = ICON_MAP[mod.icon] ?? BrainCircuit;
                const colors = COLOR_MAP[mod.color] ?? COLOR_MAP.cyan;
                return (
                  <motion.div key={i} whileHover={{ y: -8 }}
                    className="group p-10 rounded-[3rem] border transition-all cursor-default"
                    style={{ background: 'rgba(15,23,42,0.4)', borderColor: 'rgba(255,255,255,0.05)' }}
                    onMouseEnter={e => (e.currentTarget.style.borderColor = colors.border)}
                    onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)')}>
                    <div className="flex justify-between items-start mb-10">
                      <div className="p-3 rounded-2xl" style={{ background: colors.bg }}>
                        <Icon size={28} style={{ color: colors.text }} />
                      </div>
                      <span className="text-[9px] font-mono text-slate-600">{mod.moduleId}</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-2 italic">{mod.title}<br />{mod.subtitle}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed mb-6">{mod.desc}</p>
                    <ul className="space-y-2 mb-8">
                      {mod.features.map((f, fi) => (
                        <li key={fi} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest" style={{ color: colors.text }}>
                          <Zap size={10} /> {f}
                        </li>
                      ))}
                    </ul>
                    <div className="pt-5 border-t border-white/5 flex items-center justify-between text-slate-500 group-hover:transition-colors cursor-pointer"
                      style={{ color: undefined }}
                      onMouseEnter={e => (e.currentTarget.style.color = colors.text)}
                      onMouseLeave={e => (e.currentTarget.style.color = '')}>
                      <span className="text-[10px] font-black uppercase">Explore Module</span>
                      <ArrowRight size={14} />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── INTEGRATION ──────────────────────────────────────────────────── */}
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="bg-slate-950 border border-white/10 rounded-[4rem] p-12 md:p-24 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                <Network size={400} />
              </div>
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div>
                  <h2 className="text-4xl md:text-6xl font-black mb-8 italic uppercase tracking-tighter leading-none">
                    {integPl} <br />
                    <span style={{ color: accentFrom }}>{integAcc}</span>
                  </h2>
                  <p className="text-slate-400 text-lg mb-8 leading-relaxed">{integBody}</p>
                  <div className="grid grid-cols-2 gap-8">
                    {integStats.map((stat, i) => (
                      <div key={i}>
                        <p className="text-3xl font-black text-white">{stat.value}</p>
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: accentFrom }}>{stat.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="p-6 bg-white/5 rounded-3xl border border-white/10 font-mono text-xs">
                    <div className="flex items-center gap-2 mb-4" style={{ color: accentFrom }}>
                      <Cpu size={14} />
                      <span>SYSTEM_INTEGRATION_CHECK</span>
                    </div>
                    <p className="text-slate-500 italic leading-relaxed">{integCode}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── PIPELINE ─────────────────────────────────────────────────────── */}
        <section className="py-24 px-6 border-y border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl font-black uppercase italic tracking-widest" style={{ color: accentFrom }}>
                {pipelinePl} {pipelineAcc}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {pipelineItems.map((step, i) => (
                <div key={i} className="text-center p-8 rounded-3xl border border-white/5 relative" style={{ background: 'rgba(15,23,42,0.2)' }}>
                  <span className="absolute top-4 left-4 text-[9px] font-black tracking-widest" style={{ color: `${accentFrom}40` }}>{step.stepId}</span>
                  <p className="text-sm font-black uppercase tracking-widest text-white mt-4">{step.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────────────────── */}
        <section className="py-32 px-6">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase leading-none mb-10">
              {ctaHeadline.split(' ').slice(0, -1).join(' ')} <br />
              <span style={{ color: accentFrom }}>{ctaHeadline.split(' ').slice(-1)[0]}</span>
            </h2>
            <p className="text-slate-400 text-lg md:text-xl mb-10 max-w-2xl mx-auto">{ctaBody}</p>
            <button onClick={() => setIsModalOpen(true)}
              className="px-14 py-7 rounded-full font-black text-xl hover:scale-105 transition-all shadow-2xl uppercase italic"
              style={{ background: accentFrom, color: '#000' }}>
              {ctaBtnLabel}
            </button>
            <p className="mt-6 text-[10px] font-mono tracking-[0.3em] uppercase italic" style={{ color: `${accentFrom}50` }}>{ctaLocation}</p>
          </div>
        </section>
      </main>

      <Footer />

      {/* ── CONTACT MODAL ────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/95 backdrop-blur-md" />
            <motion.div initial={{ scale: 0.9, opacity: 0, y: 30 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 30 }}
              className="relative bg-[#0a0f1d] border border-white/10 p-8 md:p-12 rounded-[2.5rem] max-w-lg w-full shadow-2xl overflow-hidden">
              <button onClick={() => setIsModalOpen(false)} className="absolute top-8 right-8 p-2 text-slate-500 hover:text-white"><X size={22} /></button>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] mb-2" style={{ color: accentFrom }}>{modalBadge}</p>
              <h3 className="text-2xl font-black tracking-tight uppercase mb-8">Education Platform Brief</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={15} />
                  <input required type="text" placeholder="Full Name"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 pl-11 text-sm text-white focus:border-cyan-500 outline-none transition-all placeholder:text-slate-700"
                    value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                </div>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={15} />
                  <input required type="email" placeholder="Email Address"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 pl-11 text-sm text-white focus:border-cyan-500 outline-none transition-all placeholder:text-slate-700"
                    value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                </div>
                <button disabled={isSubmitting} type="submit"
                  className="w-full py-5 text-black font-black uppercase tracking-[0.2em] rounded-2xl flex items-center justify-center gap-3 disabled:opacity-50 text-xs transition-all"
                  style={{ background: accentFrom }}>
                  {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : <>{modalBtnLabel} <ChevronRight size={16} /></>}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}