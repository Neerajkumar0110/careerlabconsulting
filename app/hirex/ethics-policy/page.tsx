// app/hirex/ethics-policy/page.tsx

'use client';

import React, { useState } from 'react';
import Navbar from '@/components/hirex/layout/Navbar';
import Footer from '@/components/hirex/home/Footer';
import Link from 'next/link';
import {
  Scale, HeartHandshake, Eye, UserCheck,
  ShieldAlert, MessageSquare, Gavel,
  CheckCircle2, X, Send, ArrowRight,
  BrainCircuit, AlertCircle, ScanFace,
  History, ShieldCheck, Globe, Zap, FileText,
  UserX, Search, Lock
} from 'lucide-react';
import { usePageContent } from '@/hooks/usePageContent';

// ── Icon Maps ─────────────────────────────────────────────────────────────────
const PILLAR_ICON_MAP: Record<string, React.ElementType> = {
  Scale, Eye, UserCheck, ShieldAlert, BrainCircuit, HeartHandshake, Gavel, Lock,
};
const STAT_ICON_MAP: Record<string, React.ElementType> = {
  UserX, Search, Gavel, Lock, ShieldCheck, Globe, Scale, Eye,
};
const XAI_ICON_MAP: Record<string, React.ElementType> = {
  FileText, BrainCircuit, History, ShieldCheck, Globe, Lock,
};
const COMPLIANCE_ICON_MAP: Record<string, React.ElementType> = {
  Globe, ShieldCheck, HeartHandshake, FileText, Scale, Lock,
};

// ── Helpers ───────────────────────────────────────────────────────────────────
function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

// ── Types ─────────────────────────────────────────────────────────────────────
interface EthicsPillar  { title: string; desc: string; icon: string; color: string; bg: string; border: string }
interface StatItem      { label: string; value: string; icon: string; color: string }
interface XaiFeature    { title: string; desc: string; icon: string }
interface ComplianceItem{ label: string; icon: string }

// ── Defaults ─────────────────────────────────────────────────────────────────
const DEFAULT_PILLARS = JSON.stringify([
  { title: 'Zero-Bias Architecture',  desc: 'Our engine strips all demographic identifiers before evaluation. Candidates are scored purely on logic, code quality, and system design.',                                            icon: 'Scale',      color: 'text-sky-400',     bg: 'bg-sky-500/10',     border: 'border-sky-500/30'    },
  { title: 'Explainable AI (XAI)',    desc: 'We do not believe in "black box" hiring. Every technical score is accompanied by a transparent, human-readable breakdown of reasoning.',                                        icon: 'Eye',        color: 'text-violet-400',  bg: 'bg-violet-500/10',  border: 'border-violet-500/30' },
  { title: 'Human-in-the-Loop',       desc: 'HireX acts as a screener, but final hiring ALWAYS rests with a human. We augment HR teams; we do not replace human judgment.',                                                 icon: 'UserCheck',  color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30'},
  { title: 'Continuous Auditing',     desc: 'Our neural networks undergo rigorous third-party audits to detect and mitigate any emerging biases in evaluation matrices.',                                                    icon: 'ShieldAlert',color: 'text-rose-400',    bg: 'bg-rose-500/10',    border: 'border-rose-500/30'   },
]);
const DEFAULT_STATS = JSON.stringify([
  { label: 'Identity Blind', value: '100%',   icon: 'UserX',      color: 'text-sky-400'     },
  { label: 'Pedigree Bias',  value: 'Zero',   icon: 'Search',     color: 'text-violet-400'  },
  { label: 'Score Disputes', value: '< 0.1%', icon: 'Gavel',      color: 'text-emerald-400' },
  { label: 'Data Safety',    value: 'E2EE',   icon: 'Lock',       color: 'text-cyan-400'    },
]);
const DEFAULT_XAI_FEATURES = JSON.stringify([
  { title: 'Transparency Reports', desc: 'Available for both candidates and employers for every session.',               icon: 'FileText'     },
  { title: 'Sovereign Logic',      desc: 'Our models are strictly confined to technical documentation, preventing social drift.', icon: 'BrainCircuit' },
  { title: 'Auditability',         desc: 'External researchers can request access to our non-identifiable datasets.',    icon: 'History'      },
]);
const DEFAULT_COMPLIANCE = JSON.stringify([
  { label: 'IEEE 7000',      icon: 'Globe'        },
  { label: 'EU AI Act',      icon: 'ShieldCheck'  },
  { label: 'Trustworthy AI', icon: 'HeartHandshake'},
  { label: 'ISO 42001',      icon: 'FileText'     },
]);

// ── Color/bg/border mapping for tailwind classes from JSON ────────────────────
// (Tailwind purges dynamic classes; we map known values to inline styles where needed)
const COLOR_MAP: Record<string, string> = {
  'text-sky-400':     '#38bdf8',
  'text-violet-400':  '#a78bfa',
  'text-emerald-400': '#34d399',
  'text-rose-400':    '#fb7185',
  'text-cyan-400':    '#22d3ee',
};
const BG_MAP: Record<string, string> = {
  'bg-sky-500/10':     'rgba(14,165,233,0.1)',
  'bg-violet-500/10':  'rgba(139,92,246,0.1)',
  'bg-emerald-500/10': 'rgba(16,185,129,0.1)',
  'bg-rose-500/10':    'rgba(244,63,94,0.1)',
};
const BORDER_MAP: Record<string, string> = {
  'border-sky-500/30':     'rgba(14,165,233,0.3)',
  'border-violet-500/30':  'rgba(139,92,246,0.3)',
  'border-emerald-500/30': 'rgba(16,185,129,0.3)',
  'border-rose-500/30':    'rgba(244,63,94,0.3)',
};

export default function EthicsPolicyPage() {
  const [isModalOpen, setIsModalOpen]   = useState(false);
  const [formData, setFormData]         = useState({ name: '', email: '', category: 'Algorithm Bias Concern', message: '' });

  const { get } = usePageContent('hirex-ethics-policy');

  // ── CMS Values ────────────────────────────────────────────────────────────
  // Hero
  const accentPrimary      = get('hero', 'accent_primary',     '#0ea5e9');
  const accentSecondary    = get('hero', 'accent_secondary',   '#7c3aed');
  const badgeText          = get('hero', 'badge_text',         'Responsible AI Deployment');
  const heroHeadline       = get('hero', 'headline',           'Democratizing Opportunity');
  const heroBody           = get('hero', 'body_text',          'Technology should elevate potential, not automate inequality. Read our core manifesto on how we ensure fairness, transparency, and human dignity.');
  const heroBtnLabel       = get('hero', 'btn_label',          'Report Algorithm Bias');
  const xaiBgImageUrl      = get('hero', 'xai_bg_image_url',  'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1965&auto=format&fit=crop');
  const auditBgImageUrl    = get('hero', 'audit_bg_image_url', 'https://www.transparenttextures.com/patterns/cubes.png');
  const waNumber           = get('hero', 'whatsapp_number',    '918700236923');

  // Stats
  const statsItems         = safeParse<StatItem[]>(get('stats', 'items_json', DEFAULT_STATS), []);

  // Pillars
  const pillarsHeadline    = get('pillars', 'headline',        'The 4 Ethics Pillars');
  const pillarsItems       = safeParse<EthicsPillar[]>(get('pillars', 'items_json', DEFAULT_PILLARS), []);

  // XAI
  const xaiHeadlinePl      = get('xai', 'headline_plain',     'XAI: Explainable');
  const xaiHeadlineAcc     = get('xai', 'headline_accent',    'Intelligence');
  const xaiBody            = get('xai', 'body_text',          'Every decision HireX makes is accompanied by a technical transcript. We visualize the exact logical operators and system design choices that led to a score.');
  const xaiFeatures        = safeParse<XaiFeature[]>(get('xai', 'features_json', DEFAULT_XAI_FEATURES), []);
  const xaiGuardLabel      = get('xai', 'guard_label',        'Ethics_Guard_Active');

  // Compliance
  const complianceLabel    = get('compliance', 'section_label',  'Aligned with Global Integrity Frameworks');
  const complianceItems    = safeParse<ComplianceItem[]>(get('compliance', 'items_json', DEFAULT_COMPLIANCE), []);

  // Audit CTA
  const auditHeadline      = get('audit_cta', 'headline',         'Request an Independent Audit');
  const auditBody          = get('audit_cta', 'body_text',        'We believe in total accountability. Corporate partners and ethics researchers can request a deep-dive audit into our fairness methodology.');
  const auditDocLinkLabel  = get('audit_cta', 'doc_link_label',   'View Transparency Documentation');
  const auditBtnLabel      = get('audit_cta', 'btn_label',        'Contact Ethics Board');
  const auditDocUrl        = get('audit_cta', 'doc_url',          '/hirex/documentation');

  // Modal
  const modalBadgeLabel    = get('modal', 'badge_label',          'AI Ethics Board');
  const modalSubtitle      = get('modal', 'subtitle',             'Submit your concern securely');
  const modalBtnLabel      = get('modal', 'btn_label',            'Confirm & Send Request');
  const modalFooterNote    = get('modal', 'footer_note',          'SECURE_LINE: DPO_OFFICE (+91 870023 6923)');
  const modalWaNumber      = get('modal', 'whatsapp_number',      '918700236923');

  // ── Actions ───────────────────────────────────────────────────────────────
  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `*HireX AI Ethics Inquiry*%0A%0A*Name:* ${formData.name}%0A*Email:* ${formData.email}%0A*Category:* ${formData.category}%0A*Message:* ${formData.message}%0A%0A_Requesting ethics board review._`;
    window.open(`https://wa.me/${modalWaNumber}?text=${msg}`, '_blank');
    setIsModalOpen(false);
  };

  return (
    <main className="min-h-screen relative overflow-hidden bg-[#020617] text-white selection:bg-sky-500/30 font-sans">

      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[500px] md:w-[900px] h-[500px] rounded-full -translate-x-1/4"
          style={{ background: `${accentPrimary}1a`, filter: 'blur(150px)' }} />
        <div className="absolute bottom-0 right-0 w-[400px] md:w-[700px] h-[400px] rounded-full translate-x-1/4"
          style={{ background: `${accentSecondary}1a`, filter: 'blur(120px)' }} />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] opacity-20" />
      </div>

      <Navbar />

      <div className="relative z-10 pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* ── HERO ─────────────────────────────────────────────────────── */}
          <div className="max-w-4xl mx-auto text-center mb-16 md:mb-28 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] md:text-xs font-mono uppercase tracking-widest mb-6"
              style={{ background: `${accentPrimary}1a`, border: `1px solid ${accentPrimary}4d`, color: accentPrimary, boxShadow: `0 0 20px ${accentPrimary}33` }}>
              <HeartHandshake className="w-3.5 h-3.5 md:w-4 md:h-4" /> {badgeText}
            </div>
            <h1 className="text-4xl md:text-4xl lg:text-5xl font-black tracking-tight mb-6 leading-tight">
              {heroHeadline}
            </h1>
            <p className="text-base md:text-[14px] text-slate-400 leading-relaxed max-w-2xl mx-auto mb-10">
              {heroBody}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full sm:w-auto px-8 py-4 font-black rounded-xl transition-all flex items-center justify-center gap-2 text-[#020617]"
                style={{ background: accentPrimary, boxShadow: `0 0 20px ${accentPrimary}66` }}>
                {heroBtnLabel} <ShieldAlert className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* ── STATS ────────────────────────────────────────────────────── */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-20 md:mb-32 text-center">
            {statsItems.map((stat, idx) => {
              const Icon = STAT_ICON_MAP[stat.icon] ?? ShieldCheck;
              const iconColor = COLOR_MAP[stat.color] ?? accentPrimary;
              return (
                <div key={idx} className="bg-slate-900/40 backdrop-blur-md border border-white/10 p-6 md:p-8 rounded-2xl md:rounded-[2rem] transition-all shadow-xl"
                  onMouseEnter={e => (e.currentTarget.style.borderColor = `${accentPrimary}4d`)}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}>
                  <Icon style={{ color: iconColor }} className="w-6 h-6 md:w-8 md:h-8 mb-4 mx-auto" />
                  <h3 className="text-2xl md:text-4xl font-black text-white mb-1">{stat.value}</h3>
                  <p className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-slate-500">{stat.label}</p>
                </div>
              );
            })}
          </div>

          {/* ── ETHICS PILLARS ───────────────────────────────────────────── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20 md:mb-32">
            {pillarsItems.map((pillar, idx) => {
              const Icon       = PILLAR_ICON_MAP[pillar.icon]   ?? Scale;
              const iconColor  = COLOR_MAP[pillar.color]         ?? accentPrimary;
              const bgColor    = BG_MAP[pillar.bg]               ?? 'rgba(14,165,233,0.1)';
              const borderColor= BORDER_MAP[pillar.border]       ?? 'rgba(14,165,233,0.3)';
              return (
                <div key={idx} className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 md:p-10 transition-all group overflow-hidden relative shadow-2xl"
                  onMouseEnter={e => (e.currentTarget.style.background = 'rgba(15,23,42,0.7)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'rgba(15,23,42,0.5)')}>
                  <div className="absolute -right-10 -bottom-10 w-40 h-40 blur-3xl rounded-full opacity-40 group-hover:opacity-100 transition-opacity"
                    style={{ background: bgColor }} />
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center mb-6 relative z-10 shadow-lg"
                    style={{ background: bgColor, border: `1px solid ${borderColor}` }}>
                    <Icon style={{ color: iconColor }} className="w-6 h-6 md:w-7 md:h-7" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-3 relative z-10">{pillar.title}</h3>
                  <p className="text-slate-400 text-sm md:text-base leading-relaxed relative z-10">{pillar.desc}</p>
                </div>
              );
            })}
          </div>

          {/* ── XAI SECTION ──────────────────────────────────────────────── */}
          <div className="backdrop-blur-2xl border rounded-[2rem] md:rounded-[3rem] p-8 md:p-16 mb-20 md:mb-32 overflow-hidden"
            style={{ background: 'rgba(11,15,31,0.8)', borderColor: `${accentPrimary}33`, boxShadow: `0 0 50px ${accentPrimary}1a` }}>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight text-white">
                  {xaiHeadlinePl}<br />
                  <span style={{ color: accentPrimary }}>{xaiHeadlineAcc}</span>
                </h2>
                <p className="text-slate-400 leading-relaxed mb-8 text-base md:text-lg">{xaiBody}</p>
                <div className="space-y-6">
                  {xaiFeatures.map((item, i) => {
                    const Icon = XAI_ICON_MAP[item.icon] ?? FileText;
                    return (
                      <div key={i} className="flex items-start gap-4">
                        <div className="w-8 h-8 mt-1 rounded-full flex items-center justify-center shrink-0"
                          style={{ background: `${accentPrimary}33` }}>
                          <Icon style={{ color: accentPrimary }} className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-white font-bold text-base">{item.title}</h4>
                          <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="relative group flex items-center justify-center">
                <div className="absolute -inset-1 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000"
                  style={{ backgroundImage: `linear-gradient(to right, ${accentPrimary}, ${accentSecondary})` }} />
                <div className="relative aspect-video w-full rounded-3xl overflow-hidden border border-white/10 bg-slate-900 flex items-center justify-center">
                  <div className="absolute inset-0 bg-cover opacity-40 grayscale group-hover:grayscale-0 transition-all duration-700"
                    style={{ backgroundImage: `url('${xaiBgImageUrl}')` }} />
                  <div className="relative z-10 text-center">
                    <ShieldCheck className="w-16 h-16 mx-auto mb-4 animate-pulse" style={{ color: accentPrimary }} />
                    <span className="px-6 py-2 rounded-full font-mono text-xs tracking-widest shadow-xl uppercase"
                      style={{ background: `${accentPrimary}1a`, border: `1px solid ${accentPrimary}4d`, color: accentPrimary }}>
                      {xaiGuardLabel}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── COMPLIANCE ───────────────────────────────────────────────── */}
          <div className="text-center mb-20 md:mb-32">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em] mb-10">{complianceLabel}</p>
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
              {complianceItems.map((item, idx) => {
                const Icon = COMPLIANCE_ICON_MAP[item.icon] ?? Globe;
                return (
                  <div key={idx} className="flex flex-col items-center gap-3">
                    <Icon className="w-10 h-10 text-white" />
                    <span className="text-[10px] font-bold text-white uppercase tracking-widest">{item.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── AUDIT CTA ────────────────────────────────────────────────── */}
          <div className="max-w-5xl mx-auto p-8 md:p-14 rounded-[2rem] md:rounded-[3.5rem] border flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden"
            style={{ background: 'linear-gradient(to bottom right, #0f172a, #0b0f1f)', borderColor: `${accentPrimary}4d` }}>
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none"
              style={{ backgroundImage: `url('${auditBgImageUrl}')` }} />
            <div className="relative z-10 text-center md:text-left max-w-xl">
              <h2 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight">{auditHeadline}</h2>
              <p className="text-sky-100 text-sm md:text-lg leading-relaxed mb-4">{auditBody}</p>
              <a href={auditDocUrl}
                className="font-bold text-sm flex items-center gap-1 hover:opacity-80 transition-colors"
                style={{ color: accentPrimary }}>
                {auditDocLinkLabel} <ArrowRight className="w-4 h-4" />
              </a>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="relative z-10 w-full md:w-auto px-10 py-5 bg-white text-[#020617] font-black rounded-2xl hover:scale-105 transition-transform shadow-xl flex items-center justify-center gap-3 group"
              style={{ boxShadow: `0 10px 40px ${accentPrimary}4d` }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = accentPrimary; (e.currentTarget as HTMLButtonElement).style.color = '#fff'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = '#fff'; (e.currentTarget as HTMLButtonElement).style.color = '#020617'; }}>
              {auditBtnLabel} <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </div>
      </div>

      {/* ── RSVP MODAL ─────────────────────────────────────────────────────── */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-300">
          <div className="relative w-full max-w-lg bg-[#0b0f1f] rounded-[2.5rem] overflow-hidden shadow-2xl"
            style={{ border: `1px solid ${accentPrimary}4d` }}>
            <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 p-2 text-slate-500 hover:text-white transition-colors bg-white/5 rounded-full z-10 shadow-lg">
              <X className="w-5 h-5" />
            </button>
            <div className="p-8 md:p-10 relative">
              <div className="absolute -top-20 -left-20 w-40 h-40 rounded-full" style={{ background: `${accentPrimary}33`, filter: 'blur(3rem)' }} />
              <div className="mb-8 text-center relative z-10">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 border shadow-xl"
                  style={{ background: `${accentPrimary}1a`, borderColor: `${accentPrimary}33`, color: accentPrimary }}>
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white">{modalBadgeLabel}</h3>
                <p className="text-slate-400 text-sm mt-1">{modalSubtitle}</p>
              </div>
              <form onSubmit={handleWhatsAppSubmit} className="space-y-4 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input required type="text" placeholder="Your Name"
                    className="bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-white outline-none w-full placeholder:text-slate-600 transition-all focus:border-sky-500"
                    value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                  <input required type="email" placeholder="Your Email"
                    className="bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-white outline-none w-full placeholder:text-slate-600 transition-all focus:border-sky-500"
                    value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                </div>
                <select className="bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-slate-300 outline-none w-full appearance-none transition-all cursor-pointer focus:border-sky-500"
                  value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })}>
                  <option value="Algorithm Bias Concern"  className="bg-slate-900 text-white">Algorithm Bias Concern</option>
                  <option value="Research & Audit Request" className="bg-slate-900 text-white">Research & Audit Request</option>
                  <option value="Candidate Score Dispute" className="bg-slate-900 text-white">Candidate Score Dispute</option>
                </select>
                <textarea required placeholder="Please provide technical details or specific event context..."
                  className="bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-white outline-none w-full resize-none placeholder:text-slate-600 h-32 focus:border-sky-500"
                  value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} />
                <button type="submit"
                  className="w-full text-[#020617] font-black py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg active:scale-95 mt-6"
                  style={{ background: accentPrimary }}>
                  {modalBtnLabel} <Send className="w-4 h-4" />
                </button>
                <p className="text-[10px] text-center text-slate-500 uppercase tracking-widest font-mono mt-6 border-t border-white/5 pt-4 leading-relaxed">
                  {modalFooterNote}
                </p>
              </form>
            </div>
          </div>
        </div>
      )}

      <Footer />

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </main>
  );
}