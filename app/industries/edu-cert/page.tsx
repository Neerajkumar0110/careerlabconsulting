'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Award, ShieldCheck, Zap, Search, ArrowUpRight,
  BadgeCheck, Cpu, History, Briefcase,
  X, Loader2, Mail, Users, ChevronRight,
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import { usePageContent } from '@/hooks/usePageContent';

// ── Helpers ───────────────────────────────────────────────────────────────────
function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

// ── Types ─────────────────────────────────────────────────────────────────────
interface FeatureCard { title: string; desc: string; icon: string }
interface TrustItem   { icon: string; text: string }

// ── Defaults ──────────────────────────────────────────────────────────────────
const DEFAULT_FEATURES = JSON.stringify([
  { title: 'Neural Proctoring',      desc: 'Next-gen eye-tracking and behavioral biometrics to ensure exam integrity without invading privacy.',                                              icon: 'Cpu'       },
  { title: 'Smart Syllabus Mapping', desc: 'AI that scrapes global job postings to ensure your certification curriculum stays relevant to 2026 industry standards.',                          icon: 'Briefcase' },
  { title: 'Fraud Detection',        desc: 'Identifying AI-generated certificate forgery and credential manipulation via neural pattern matching.',                                            icon: 'ShieldCheck' },
]);

const DEFAULT_TRUST_ITEMS = JSON.stringify([
  { icon: 'Search',  text: 'Automated Competency-Gap Analysis'  },
  { icon: 'History', text: 'Dynamic Certificate Expiry Tracking' },
  { icon: 'Zap',     text: 'Real-time Skill Verification API'   },
]);

const ICON_MAP: Record<string, React.ElementType> = {
  Award, ShieldCheck, Zap, Search, BadgeCheck, Cpu, History, Briefcase,
};

export default function CertificationAIPage() {
  const [isModalOpen, setIsModalOpen]   = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData]         = useState({ name: '', email: '' });

  const { get } = usePageContent('industry-certification');

  // ── CMS values ─────────────────────────────────────────────────────────────
  const accentFrom       = get('hero', 'accent_from',       '#d97706');
  const accentTo         = get('hero', 'accent_to',         '#f59e0b');
  const badgeText        = get('hero', 'badge_text',        'Competency Verification AI');
  const heroPl           = get('hero', 'headline_plain',    'Immutable');
  const heroAcc          = get('hero', 'headline_accent',   'Credentials');
  const heroBody         = get('hero', 'body_text',         'Eliminating credential fraud and the "Skills Gap." We build AI engines that validate expertise, automate proctoring, and map certifications directly to real-time labor market demands.');
  const heroBtnLabel     = get('hero', 'btn_label',         'VALIDATE REPOSITORY');
  const featuresJson     = get('hero', 'features_json',     DEFAULT_FEATURES);
  const waNumber         = get('hero', 'whatsapp_number',   '918700236923');

  const endPl            = get('end_of_fiction', 'headline_plain',   'The End of');
  const endMid           = get('end_of_fiction', 'headline_mid',     'Resume');
  const endAcc           = get('end_of_fiction', 'headline_accent',  'Fiction.');
  const endBody          = get('end_of_fiction', 'body_text',        'We move from "declared skills" to demonstrated mastery. Our AI agents analyze real-world project output, code commits, and problem-solving velocity to issue dynamic, verifiable digital badges.');
  const trustItemsJson   = get('end_of_fiction', 'trust_items_json', DEFAULT_TRUST_ITEMS);

  const ctaHeadline      = get('cta', 'headline',           'Authorize The Future');
  const ctaBody          = get('cta', 'body_text',          'Our certification architects at DLF Cyber City are engineering the gold standard for global competency.');
  const ctaBtnLabel      = get('cta', 'btn_label',          'Get Certified');
  const ctaLocation      = get('cta', 'location_label',     'Verification Lab // Gurugram, India');

  const modalBadge       = get('modal', 'badge_label',      'Certification AI Consultation');
  const modalBtnLabel    = get('modal', 'btn_label',        'Initialize Verification');
  const modalFooterNote  = get('modal', 'footer_note',      'SOC2 compliant & GDPR-ready certification infrastructure');
  const modalWaNumber    = get('modal', 'whatsapp_number',  '918700236923');

  const features    = safeParse<FeatureCard[]>(featuresJson, []);
  const trustItems  = safeParse<TrustItem[]>(trustItemsJson, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const msg = `*🏆 Certification AI Consultation*%0A*Name:* ${formData.name}%0A*Email:* ${formData.email}`;
    setTimeout(() => {
      window.open(`https://wa.me/${modalWaNumber}?text=${msg}`, '_blank');
      setIsSubmitting(false);
      setIsModalOpen(false);
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-[#020617] text-slate-100 overflow-x-hidden selection:bg-amber-500/30">
      <Navbar />

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-16 md:pt-52 md:pb-32 px-6">
        <div className="absolute inset-0 -z-10" style={{ background: `radial-gradient(circle at 50% 0%, ${accentFrom}14 0%, transparent 50%)` }} />

        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 px-4 py-2 rounded-full mb-8 backdrop-blur-xl"
            style={{ background: `${accentFrom}0d`, border: `1px solid ${accentFrom}33` }}>
            <BadgeCheck className="w-4 h-4" style={{ color: accentFrom }} />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]" style={{ color: `${accentTo}cc` }}>{badgeText}</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-4xl md:text-7xl lg:text-9xl font-black tracking-tighter leading-[0.85] uppercase mb-10">
            {heroPl} <br />
            <span className="text-transparent bg-clip-text italic" style={{ backgroundImage: `linear-gradient(to right, ${accentTo}, ${accentFrom}, #92400e)` }}>
              {heroAcc}
            </span>
          </motion.h1>

          <p className="max-w-2xl text-slate-400 text-base md:text-xl leading-relaxed mb-12">{heroBody}</p>

          <button onClick={() => setIsModalOpen(true)}
            className="px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 shadow-2xl"
            style={{ background: accentFrom, boxShadow: `0 20px 40px ${accentFrom}40` }}>
            {heroBtnLabel} <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* ── FEATURES ──────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((item, i) => {
              const Icon = ICON_MAP[item.icon] ?? Zap;
              return (
                <motion.div key={i} whileHover={{ y: -6 }}
                  className="p-10 rounded-[2.5rem] bg-slate-900/40 border border-white/5 transition-all group"
                  onMouseEnter={e => (e.currentTarget.style.borderColor = `${accentFrom}4d`)}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)')}>
                  <div className="mb-6">
                    <Icon className="w-8 h-8" style={{ color: accentFrom }} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── END OF RESUME FICTION ─────────────────────────────────────────── */}
      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Terminal */}
          <div className="relative order-2 lg:order-1">
            <div className="absolute -inset-10 rounded-full blur-[100px]" style={{ background: `${accentFrom}0d` }} />
            <div className="relative bg-[#020817] border rounded-[3rem] p-10 shadow-2xl font-mono" style={{ borderColor: `${accentFrom}33` }}>
              <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-4">
                <div className="flex items-center gap-2 font-black italic text-[10px]" style={{ color: accentFrom }}>
                  <Award className="w-4 h-4" /> CERT_VERIFICATION_KERNEL
                </div>
                <div className="text-[10px] text-slate-500 uppercase">Status: Secure</div>
              </div>
              <div className="mt-8 space-y-4">
                <div className="p-4 rounded-xl border" style={{ background: `${accentFrom}0d`, borderColor: `${accentFrom}33` }}>
                  <p className="text-[10px] font-black italic mb-2" style={{ color: accentFrom }}>! ANOMALY_DETECTION:</p>
                  <p className="text-[11px] text-white italic">"High similarity detected in 'Solution Architecture' response pattern. Possible synthetic generation flagged for human review."</p>
                </div>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <h2 className="text-4xl md:text-7xl font-black mb-8 italic tracking-tighter uppercase leading-[0.9] text-white">
              {endPl} <br />{endMid} <br />
              <span className="font-normal underline underline-offset-8" style={{ color: accentFrom, textDecorationColor: 'rgba(255,255,255,0.2)' }}>{endAcc}</span>
            </h2>
            <p className="text-slate-400 text-lg mb-8 leading-relaxed">{endBody}</p>
            <div className="space-y-4">
              {trustItems.map((item, idx) => {
                const Icon = ICON_MAP[item.icon] ?? Zap;
                return (
                  <div key={idx}
                    className="flex items-center gap-4 p-5 rounded-2xl bg-slate-900/50 border border-white/10 hover:border-amber-500/30 transition-all group cursor-default">
                    <Icon className="w-5 h-5" style={{ color: accentFrom }} />
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-200 group-hover:text-amber-100 transition-colors">{item.text}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto border rounded-[4rem] p-12 md:p-24 text-center backdrop-blur-3xl relative overflow-hidden group"
          style={{ background: `linear-gradient(to bottom right, ${accentFrom}1a, #000)`, borderColor: `${accentFrom}33` }}>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-7xl font-black mb-8 italic tracking-tighter uppercase leading-tight">{ctaHeadline}</h2>
            <p className="text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed" style={{ color: `${accentTo}b3` }}>{ctaBody}</p>
            <div className="flex flex-col items-center gap-6">
              <button onClick={() => setIsModalOpen(true)}
                className="px-16 py-6 rounded-2xl font-black text-2xl hover:scale-105 transition-all shadow-2xl uppercase italic text-white"
                style={{ background: accentFrom, boxShadow: `0 20px 40px ${accentFrom}40` }}>
                {ctaBtnLabel}
              </button>
              <div className="font-mono text-[10px] tracking-[0.4em] uppercase" style={{ color: `${accentFrom}80` }}>{ctaLocation}</div>
            </div>
          </div>
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
                <h3 className="text-2xl font-black tracking-tight uppercase text-white">Let&apos;s Verify Together</h3>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={16} />
                  <input required type="text" placeholder="Full Name"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 pl-12 text-sm text-white outline-none transition-all placeholder:text-slate-700"
                    onFocus={e => (e.currentTarget.style.borderColor = accentFrom)}
                    onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}
                    value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                </div>
                <div className="relative">
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