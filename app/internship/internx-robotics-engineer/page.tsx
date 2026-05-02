// app/internx/robotics-engineer/page.tsx

'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bot, Cpu, Settings, Activity, Factory,
  ArrowRight, Radar, X, Loader2,
  ChevronRight, Mail, Users,
} from 'lucide-react';
import Link from 'next/link';
import B2CHeader from '@/components/b2c/B2CHeader';
import Footer from '@/components/b2c/Footer';
import { usePageContent } from '@/hooks/usePageContent';

const ICON_MAP: Record<string, React.ElementType> = {
  Bot, Cpu, Settings, Activity, Factory, ArrowRight, Radar,
};

function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

const DEFAULT_STATS = JSON.stringify([
  { label: 'Weeks',             value: '16+' },
  { label: 'Robotics Projects', value: '8+'  },
  { label: 'Hardware Labs',     value: '6+'  },
  { label: 'Career Support',    value: '100%'},
]);
const DEFAULT_WHY_FEATURES = JSON.stringify([
  { icon: 'Factory',  title: 'Industry Automation',   desc: 'Robotics drives automation in manufacturing, logistics, and smart factories.' },
  { icon: 'Activity', title: 'Intelligent Machines',  desc: 'Build robots that perceive, decide, and act intelligently.' },
  { icon: 'Cpu',      title: 'AI + Hardware',         desc: 'Combine AI software with real hardware systems.' },
]);
const DEFAULT_LEARN_ITEMS = JSON.stringify([
  'Robotics fundamentals & kinematics',
  'Sensors, actuators & embedded systems',
  'Control systems & motion planning',
  'Robot perception & computer vision',
  'AI for robotics & autonomy',
  'ROS (Robot Operating System) basics',
  'Industrial automation workflows',
  'Simulation & testing',
  'Safety & reliability in robotics',
  'Deployment of robotic systems',
]);
const DEFAULT_EXPERIENCE_FEATURES = JSON.stringify([
  { icon: 'Bot',       title: 'Robotics Projects',  desc: 'Hands-on work with real robotic systems and simulations.' },
  { icon: 'Settings',  title: 'System Integration', desc: 'Integrate hardware, software, and AI models.' },
  { icon: 'ArrowRight',title: 'Career Readiness',   desc: 'Portfolio projects, interview prep, and robotics career guidance.' },
]);

interface StatItem    { label: string; value: string }
interface FeatureItem { icon: string; title: string; desc: string }

export default function InternXRoboticsEngineerPage() {
  const [isModalOpen, setIsModalOpen]   = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData]         = useState({ name: '', email: '' });

  const { get } = usePageContent('internx-robotics');

  // ── CMS values ────────────────────────────────────────────────────────────
  const accentColor      = get('hero', 'accent_color',     '#0ea5e9');
  const accentShadow     = get('hero', 'accent_shadow',    'rgba(14,165,233,0.3)');
  const badgeText        = get('hero', 'badge_text',       'InternX Program');
  const heroHeadline     = get('hero', 'headline',         'Robotics Engineer Internship');
  const heroBody         = get('hero', 'body_text',        'Design, build, and deploy intelligent robotic systems. Work on real-world robotics, automation, and AI-powered machines used in manufacturing, logistics, healthcare, and smart cities.');
  const heroImageUrl     = get('hero', 'hero_image_url',   'https://img.freepik.com/free-photo/group-young-people-doing-experiments-robotics-laboratory-girls-protective-glasses_1268-24389.jpg');
  const applyBtnLabel    = get('hero', 'apply_btn_label',  'Apply Now');
  const finderBtnLabel   = get('hero', 'finder_btn_label', 'Find My Program');
  const waNumber         = get('hero', 'whatsapp_number',  '918700236923');

  const statsItems       = safeParse<StatItem[]>(get('stats', 'items_json', DEFAULT_STATS), []);

  const whySectionTitle  = get('why', 'section_title', 'Why Robotics Engineering?');
  const whyFeatures      = safeParse<FeatureItem[]>(get('why', 'features_json', DEFAULT_WHY_FEATURES), []);

  const learnTitle       = get('learn', 'section_title', 'What You Will Learn');
  const learnItems       = safeParse<string[]>(get('learn', 'items_json', DEFAULT_LEARN_ITEMS), []);

  const expTitle         = get('experience', 'section_title', 'Internship Experience');
  const expFeatures      = safeParse<FeatureItem[]>(get('experience', 'features_json', DEFAULT_EXPERIENCE_FEATURES), []);

  const ctaHeadline      = get('cta', 'headline',          'Build the Robots of Tomorrow');
  const ctaBody          = get('cta', 'body_text',         'Launch your career in robotics, automation, and intelligent machines.');
  const ctaApplyLabel    = get('cta', 'apply_btn_label',   'Apply Now');
  const ctaAdvisorLabel  = get('cta', 'advisor_btn_label', 'Talk to Advisor');

  const modalBadge       = get('apply_modal', 'badge_label',      'Robotics Engineer Internship – Apply');
  const modalBtnLabel    = get('apply_modal', 'btn_label',        'Submit Application');
  const modalFooterNote  = get('apply_modal', 'footer_note',      'Secure application powered by InternX Career Lab');
  const modalWaNumber    = get('apply_modal', 'whatsapp_number',  '918700236923');

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const msg = `*🤖 Robotics Engineer Internship Application*%0A*Name:* ${formData.name}%0A*Email:* ${formData.email}`;
    setTimeout(() => {
      window.open(`https://wa.me/${modalWaNumber}?text=${msg}`, '_blank');
      setIsSubmitting(false);
      setIsModalOpen(false);
    }, 1500);
  };

  return (
    <main className="bg-[#0a0a0a] text-white">
      <B2CHeader />

      {/* HERO */}
      <section className="relative pt-36 pb-28 overflow-hidden border-b border-white/10">
        <div className="absolute inset-0" style={{ background: `radial-gradient(circle at top, ${accentColor}2e, transparent 60%)` }} />
        <div className="relative max-w-[1200px] mx-auto px-6 grid md:grid-cols-2 gap-14 items-center">
          <div>
            <span className="inline-flex items-center gap-2 mb-5 px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest"
              style={{ border: `1px solid ${accentColor}4d`, background: `${accentColor}1a`, color: accentColor }}>
              {badgeText}
            </span>
            <h1 className="text-2xl md:text-4xl font-black leading-tight">{heroHeadline}</h1>
            <p className="mt-6 text-sm text-slate-400 max-w-xl">{heroBody}</p>
            <div className="mt-12 flex flex-wrap gap-4">
              <button onClick={() => setIsModalOpen(true)}
                className="px-10 py-4 rounded-xl font-black text-xs uppercase tracking-widest flex items-center gap-2 shadow-xl transition-all hover:scale-105 active:scale-95"
                style={{ background: accentColor, boxShadow: `0 20px 40px ${accentShadow}` }}>
                {applyBtnLabel} <ArrowRight className="w-4 h-4" />
              </button>
              <Link href="/b2c/program-finder"
                className="border border-white/20 hover:border-white/40 px-10 py-4 rounded-xl font-bold text-xs uppercase tracking-widest transition-all">
                {finderBtnLabel}
              </Link>
            </div>
          </div>
          <div className="relative hidden md:flex justify-end">
            <img src={heroImageUrl} alt={heroHeadline} className="drop-shadow-2xl rounded-2xl" />
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-16 border-b border-white/10 bg-[#0d0d0d]">
        <div className="max-w-[1200px] mx-auto px-6 grid md:grid-cols-4 gap-8 text-center">
          {statsItems.map((s, i) => (
            <div key={i}>
              <div className="text-3xl font-black" style={{ color: accentColor }}>{s.value}</div>
              <div className="mt-2 text-sm text-slate-400 uppercase tracking-widest">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* WHY */}
      <section className="py-28 border-b border-white/10">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-black mb-16">{whySectionTitle}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {whyFeatures.map((f, i) => {
              const Icon = ICON_MAP[f.icon] ?? Activity;
              return (
                <motion.div key={i} whileHover={{ y: -6 }}
                  className="p-8 rounded-2xl border border-white/10 bg-white/5 transition-all"
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = `${accentColor}4d`; (e.currentTarget as HTMLElement).style.background = `${accentColor}0d`; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)'; (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)'; }}>
                  <Icon className="w-7 h-7 mb-5" style={{ color: accentColor }} />
                  <h3 className="font-bold text-lg mb-3">{f.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{f.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* LEARN */}
      <section className="py-28 border-b border-white/10 bg-[#0d0d0d]">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-black mb-16">{learnTitle}</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {learnItems.map((item, i) => (
              <motion.div key={i} whileHover={{ x: 4 }}
                className="p-5 rounded-xl border border-white/10 bg-white/5 flex items-center gap-3 transition-all cursor-default"
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = `${accentColor}4d`; (e.currentTarget as HTMLElement).style.background = `${accentColor}0d`; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)'; (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)'; }}>
                <ChevronRight className="w-4 h-4 flex-shrink-0" style={{ color: accentColor }} />
                {item}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section className="py-28 border-b border-white/10">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-black mb-16">{expTitle}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {expFeatures.map((f, i) => {
              const Icon = ICON_MAP[f.icon] ?? Activity;
              return (
                <motion.div key={i} whileHover={{ y: -6 }}
                  className="p-8 rounded-2xl border border-white/10 bg-white/5 transition-all"
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = `${accentColor}4d`; (e.currentTarget as HTMLElement).style.background = `${accentColor}0d`; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)'; (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)'; }}>
                  <Icon className="w-7 h-7 mb-5" style={{ color: accentColor }} />
                  <h3 className="font-bold text-lg mb-3">{f.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{f.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0" style={{ background: `linear-gradient(to top right, ${accentColor}33, transparent)` }} />
        <div className="relative max-w-[900px] mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-black">{ctaHeadline}</h2>
          <p className="mt-6 text-slate-400">{ctaBody}</p>
          <div className="mt-14 flex justify-center gap-4 flex-wrap">
            <button onClick={() => setIsModalOpen(true)}
              className="px-14 py-5 rounded-xl font-black text-xs uppercase tracking-widest shadow-xl hover:scale-105 transition-all active:scale-95"
              style={{ background: accentColor, boxShadow: `0 20px 40px ${accentShadow}` }}>
              {ctaApplyLabel}
            </button>
            <Link href="/b2c/contact"
              className="border border-white/20 px-14 py-5 rounded-xl font-bold text-xs uppercase tracking-widest hover:border-white/40 transition-all">
              {ctaAdvisorLabel}
            </Link>
          </div>
        </div>
      </section>

      <Footer />

      {/* APPLY MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/95 backdrop-blur-md" />
            <motion.div initial={{ scale: 0.9, opacity: 0, y: 30 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 30 }}
              className="relative bg-[#0d0d0d] border border-white/10 p-8 md:p-12 rounded-[2.5rem] max-w-lg w-full shadow-3xl overflow-hidden">
              <button onClick={() => setIsModalOpen(false)} className="absolute top-8 right-8 p-2 text-slate-500 hover:text-white transition-colors"><X size={24} /></button>
              <div className="mb-10">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] mb-3" style={{ color: accentColor }}>{modalBadge}</p>
                <h3 className="text-2xl font-black tracking-tight">{heroHeadline}</h3>
              </div>
              <form onSubmit={handleApply} className="space-y-4">
                <div className="relative">
                  <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={16} />
                  <input required type="text" placeholder="Full Name"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 pl-12 text-sm text-white focus:outline-none transition-all placeholder:text-slate-700"
                    onFocus={e => (e.currentTarget.style.borderColor = accentColor)}
                    onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}
                    value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                </div>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={16} />
                  <input required type="email" placeholder="Email Address"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 pl-12 text-sm text-white focus:outline-none transition-all placeholder:text-slate-700"
                    onFocus={e => (e.currentTarget.style.borderColor = accentColor)}
                    onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}
                    value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                </div>
                <button disabled={isSubmitting} type="submit"
                  className="w-full py-5 text-white font-black uppercase tracking-[0.2em] rounded-2xl shadow-xl transition-all flex items-center justify-center gap-3 disabled:opacity-50 text-[10px] active:scale-95"
                  style={{ background: accentColor }}>
                  {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : <>{modalBtnLabel} <ChevronRight size={18} /></>}
                </button>
                <p className="text-[8px] font-black text-center text-slate-600 uppercase tracking-widest mt-6 leading-relaxed border-t border-white/5 pt-4">
                  {modalFooterNote}
                </p>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}