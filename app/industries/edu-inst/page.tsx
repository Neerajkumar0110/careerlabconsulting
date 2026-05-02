'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Building2, ShieldCheck, Database, Users,
  BarChart3, ArrowRight, ChevronRight,
  Globe, Lock, Zap, X, Loader2, Mail,
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import { usePageContent } from '@/hooks/usePageContent';

// ── Helpers ───────────────────────────────────────────────────────────────────
function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

// ── Types ─────────────────────────────────────────────────────────────────────
interface MetricCard  { label: string; value: string; color: string }
interface GovernanceItem { icon: string; title: string; desc: string }

// ── Defaults ──────────────────────────────────────────────────────────────────
const DEFAULT_CONTROL_METRICS = JSON.stringify([
  { label: 'Grant Utilization', value: '92.4%', color: '#3b82f6' },
  { label: 'Operational ROI',   value: '+18%',  color: '#10b981' },
]);

const DEFAULT_GOVERNANCE_ITEMS = JSON.stringify([
  { icon: 'ShieldCheck', title: 'Automated Compliance Audits', desc: 'Real-time monitoring of Title IX and financial reporting requirements.' },
  { icon: 'Database',    title: 'Unified Research Data Lake',  desc: 'Centralized, secure storage for cross-departmental intellectual property.' },
  { icon: 'Users',       title: 'Faculty Workload Optimization', desc: 'AI-driven scheduling and resource allocation across departments.' },
]);

const ICON_MAP: Record<string, React.ElementType> = {
  Building2, ShieldCheck, Database, Users, BarChart3, Globe, Lock, Zap,
};

export default function InstitutionalAIPage() {
  const [isModalOpen, setIsModalOpen]   = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData]         = useState({ name: '', email: '' });

  const { get } = usePageContent('industry-institutional');

  // ── CMS values ─────────────────────────────────────────────────────────────
  const accentFrom       = get('hero', 'accent_from',       '#2563eb');
  const accentTo         = get('hero', 'accent_to',         '#6366f1');
  const accentGreen      = get('hero', 'accent_green',      '#10b981');
  const badgeText        = get('hero', 'badge_text',        'Institutional Governance 4.0');
  const heroPl           = get('hero', 'headline_plain',    'The Smart');
  const heroAcc          = get('hero', 'headline_accent',   'Foundation');
  const heroBody         = get('hero', 'body_text',         'Architecting secure, autonomous infrastructures for global universities and districts. We integrate Predictive Enrollment, Zero-Trust Security, and Automated Governance into one unified campus OS.');
  const heroBtnPrimary   = get('hero', 'btn_primary_label', 'Request Blueprint');
  const heroBtnSecond    = get('hero', 'btn_secondary_label','Security Briefing');
  const waNumber         = get('hero', 'whatsapp_number',   '918700236923');

  const controlLabel     = get('control_plane', 'live_label',     'Live_Campus_Intelligence');
  const controlTitle     = get('control_plane', 'card_title',     'Institutional Control Plane');
  const controlDesc      = get('control_plane', 'card_desc',      'Centralizing cross-departmental data into a single source of truth for real-time decision making.');
  const controlMetrics   = safeParse<MetricCard[]>(get('control_plane', 'metrics_json', DEFAULT_CONTROL_METRICS), []);
  const zeroTrustTitle   = get('control_plane', 'zero_trust_title', 'Zero-Trust Campus Safety');
  const zeroTrustDesc    = get('control_plane', 'zero_trust_desc',  'AI-driven perimeter defense and encrypted student data silos.');
  const zeroTrustLink    = get('control_plane', 'zero_trust_link',  'Read Security Protocol');
  const globalTitle      = get('control_plane', 'global_title',    'Global Accreditation');
  const globalSubLabel   = get('control_plane', 'global_sublabel', 'Multi-Region Compliance');
  const globalDesc       = get('control_plane', 'global_desc',     'Automated data mapping for FERPA, GDPR, and Title IX audits.');
  const yieldTitle       = get('control_plane', 'yield_title',     'Predictive Yield Modeling');
  const yieldDesc        = get('control_plane', 'yield_desc',      'Optimize admissions and financial aid distribution with 94% accuracy in student success forecasting.');

  const govPl            = get('governance', 'headline_plain',    'Sovereign');
  const govAcc           = get('governance', 'headline_accent',   'Governance.');
  const govBody          = get('governance', 'body_text',         'We empower institutional leadership with autonomous workflows. From high-speed procurement auditing to grant lifecycle management, our AI handles the bureaucracy so you can focus on the mission.');
  const govItemsJson     = get('governance', 'items_json',        DEFAULT_GOVERNANCE_ITEMS);

  const ctaHeadline      = get('cta', 'headline',            'Modernize Your Institution');
  const ctaAcc           = get('cta', 'headline_accent',     'Institution');
  const ctaBody          = get('cta', 'body_text',           'Our institutional architects at DLF Cyber City are ready to engineer the future of your campus. Secure, Scalable, and Autonomous.');
  const ctaBtnLabel      = get('cta', 'btn_label',           'Download Institutional Roadmap');
  const ctaLocation      = get('cta', 'location_label',      'Gurugram // Global Innovation Hub');

  const modalBadge       = get('modal', 'badge_label',       'Institutional AI Blueprint');
  const modalBtnLabel    = get('modal', 'btn_label',         'Request Blueprint');
  const modalFooterNote  = get('modal', 'footer_note',       'FERPA, GDPR & Title IX compliant deployment');
  const modalWaNumber    = get('modal', 'whatsapp_number',   '918700236923');

  const govItems = safeParse<GovernanceItem[]>(govItemsJson, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const msg = `*🏛️ Institutional AI Blueprint*%0A*Name:* ${formData.name}%0A*Email:* ${formData.email}`;
    setTimeout(() => {
      window.open(`https://wa.me/${modalWaNumber}?text=${msg}`, '_blank');
      setIsSubmitting(false);
      setIsModalOpen(false);
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-[#020617] text-slate-100 overflow-x-hidden selection:bg-blue-500/30">
      <Navbar />

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-16 md:pt-52 md:pb-32 px-6">
        <div className="absolute inset-0 opacity-20 -z-10"
          style={{ backgroundImage: 'linear-gradient(to right,#1e293b 1px,transparent 1px),linear-gradient(to bottom,#1e293b 1px,transparent 1px)', backgroundSize: '4rem 4rem', maskImage: 'radial-gradient(ellipse 60% 50% at 50% 0%,#000 70%,transparent 100%)' }} />

        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 px-4 py-2 rounded-full mb-8 backdrop-blur-xl"
            style={{ background: `${accentFrom}0d`, border: `1px solid ${accentFrom}33` }}>
            <Building2 className="w-4 h-4" style={{ color: accentFrom }} />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]" style={{ color: `${accentFrom}cc` }}>{badgeText}</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-4xl md:text-7xl lg:text-9xl font-black tracking-tighter leading-[0.85] uppercase mb-10">
            {heroPl} <br />
            <span className="text-transparent bg-clip-text italic" style={{ backgroundImage: `linear-gradient(to right, ${accentFrom}, ${accentTo})` }}>
              {heroAcc}
            </span>
          </motion.h1>

          <p className="max-w-2xl text-slate-400 text-base md:text-xl leading-relaxed mb-12">{heroBody}</p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button onClick={() => setIsModalOpen(true)}
              className="px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 shadow-2xl"
              style={{ background: accentFrom, boxShadow: `0 20px 40px ${accentFrom}40` }}>
              {heroBtnPrimary} <ArrowRight className="w-4 h-4" />
            </button>
            <button className="px-10 py-5 bg-white/5 border border-white/10 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-white/10 transition-all">
              {heroBtnSecond}
            </button>
          </div>
        </div>
      </section>

      {/* ── CONTROL PLANE GRID ────────────────────────────────────────────── */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Main card */}
          <div className="md:col-span-8 p-8 md:p-12 rounded-[2.5rem] bg-slate-900/40 border border-white/5 relative overflow-hidden group">
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-8">
                <div className="w-3 h-3 rounded-full animate-pulse" style={{ background: accentFrom }} />
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest" style={{ color: accentFrom }}>{controlLabel}</span>
              </div>
              <h3 className="text-3xl font-bold mb-4 tracking-tight text-white">{controlTitle}</h3>
              <p className="max-w-md text-slate-400 text-sm leading-relaxed mb-8 italic">{`"${controlDesc}"`}</p>
              <div className="grid grid-cols-2 gap-4 mt-8">
                {controlMetrics.map((m, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/5">
                    <p className="text-[10px] text-slate-500 uppercase font-bold mb-1">{m.label}</p>
                    <p className="text-2xl font-black" style={{ color: m.color }}>{m.value}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full blur-[100px] group-hover:opacity-100 transition-colors duration-700" style={{ background: `${accentFrom}1a` }} />
          </div>

          {/* Zero-Trust */}
          <div className="md:col-span-4 p-8 rounded-[2.5rem] flex flex-col justify-between group"
            style={{ background: `${accentTo}14`, border: `1px solid ${accentTo}33` }}>
            <div className="space-y-6">
              <div className="p-4 rounded-2xl w-fit" style={{ background: `${accentTo}1a` }}>
                <Lock className="w-6 h-6" style={{ color: accentTo }} />
              </div>
              <h3 className="text-xl font-bold text-white">{zeroTrustTitle}</h3>
              <p className="text-slate-400 text-sm">{zeroTrustDesc}</p>
            </div>
            <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between font-bold text-xs uppercase tracking-widest cursor-pointer transition-colors"
              style={{ color: accentTo }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.7')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
              {zeroTrustLink} <ChevronRight className="w-4 h-4" />
            </div>
          </div>

          {/* Global accreditation */}
          <div className="md:col-span-4 p-8 rounded-[2.5rem] bg-slate-900/40 border border-white/5 group">
            <Globe className="w-8 h-8 mb-6 group-hover:rotate-12 transition-transform" style={{ color: accentFrom }} />
            <h3 className="text-xl font-bold mb-2 text-white">{globalTitle}</h3>
            <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: accentFrom }}>{globalSubLabel}</p>
            <p className="text-slate-400 text-sm">{globalDesc}</p>
          </div>

          {/* Yield modeling */}
          <div className="md:col-span-8 p-8 md:p-12 rounded-[2.5rem] bg-white/[0.02] border border-white/5 flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1">
              <Zap className="w-10 h-10 mb-6" style={{ color: '#f59e0b' }} />
              <h3 className="text-2xl font-bold mb-2 text-white">{yieldTitle}</h3>
              <p className="text-slate-400 text-sm">{yieldDesc}</p>
            </div>
            <div className="w-full md:w-48 aspect-video md:aspect-square bg-slate-800/50 rounded-2xl flex items-center justify-center border border-dashed border-white/10">
              <BarChart3 className="w-12 h-12" style={{ color: `${accentFrom}80` }} />
            </div>
          </div>
        </div>
      </section>

      {/* ── SOVEREIGN GOVERNANCE ──────────────────────────────────────────── */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-4xl md:text-7xl font-black uppercase italic leading-none mb-8 text-white">
              {govPl} <br />
              <span style={{ color: accentFrom }}>{govAcc}</span>
            </h2>
            <p className="text-slate-400 text-lg mb-10 leading-relaxed">{govBody}</p>
            <div className="space-y-6">
              {govItems.map((item, i) => {
                const Icon = ICON_MAP[item.icon] ?? ShieldCheck;
                return (
                  <div key={i} className="flex gap-5 group">
                    <div className="mt-1"><Icon className="w-5 h-5" style={{ color: accentFrom }} /></div>
                    <div>
                      <h4 className="text-sm font-black uppercase tracking-widest text-white mb-1">{item.title}</h4>
                      <p className="text-slate-500 text-sm">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-4 rounded-[3rem] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              style={{ background: `linear-gradient(to top right, ${accentFrom}33, ${accentTo}33)` }} />
            <div className="relative rounded-[3rem] overflow-hidden border border-white/10 bg-slate-950 p-4">
              <div className="aspect-[4/5] md:aspect-square bg-slate-900 rounded-[2rem] flex items-center justify-center">
                <Building2 className="w-24 h-24" style={{ color: `${accentFrom}33` }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto bg-gradient-to-b from-slate-900 to-black border border-white/10 rounded-[4rem] p-12 md:p-24 text-center relative overflow-hidden shadow-3xl">
          <div className="absolute inset-0" style={{ background: `radial-gradient(circle at 50% 0%, ${accentFrom}1a 0%, transparent 50%)` }} />
          <div className="relative z-10">
            <h2 className="text-4xl md:text-8xl font-black text-white mb-8 tracking-tighter uppercase italic leading-none">
              Modernize Your <br />
              <span style={{ color: accentFrom }}>Institution</span>
            </h2>
            <p className="text-slate-400 text-lg md:text-xl mb-12 max-w-2xl mx-auto">{ctaBody}</p>
            <div className="flex flex-col items-center gap-6">
              <button onClick={() => setIsModalOpen(true)}
                className="px-16 py-7 bg-white rounded-2xl font-black text-xl hover:scale-105 active:scale-95 shadow-2xl uppercase transition-all"
                style={{ color: accentFrom }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = accentFrom; (e.currentTarget as HTMLButtonElement).style.color = '#fff'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = '#fff'; (e.currentTarget as HTMLButtonElement).style.color = accentFrom; }}>
                {ctaBtnLabel}
              </button>
              <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.4em]" style={{ color: `${accentFrom}99` }}>
                {ctaLocation}
              </div>
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
              className="relative bg-[#0a0f1d] border border-white/10 p-8 md:p-12 rounded-[2.5rem] max-w-lg w-full shadow-3xl">
              <button onClick={() => setIsModalOpen(false)} className="absolute top-8 right-8 p-2 text-slate-500 hover:text-white transition-colors"><X size={24} /></button>
              <div className="mb-10">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] mb-3" style={{ color: accentFrom }}>{modalBadge}</p>
                <h3 className="text-2xl font-black tracking-tight uppercase text-white">Blueprint Request</h3>
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