// app/hirex/gdpr-compliance/page.tsx
'use client';

import React, { useState } from 'react';
import Navbar from '@/components/hirex/layout/Navbar';
import Footer from '@/components/hirex/home/Footer';
import Link from 'next/link';
import {
  ShieldCheck, UserCheck, Database, FileKey,
  Trash2, RefreshCw, FileSearch, Globe,
  CheckCircle2, X, Send, ArrowRight,
  Scale, Fingerprint, Lock, EyeOff, ShieldAlert,
  FileText, History, ClipboardCheck
} from 'lucide-react';
import { usePageContent } from '@/hooks/usePageContent';

function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

// ── Types ─────────────────────────────────────────────────────────────────────
interface MetricStat      { label: string; value: string; iconName: string }
interface CandidateRight  { title: string; desc: string; iconName: string; color: string; bg: string; border: string }
interface ProcessStep     { title: string; desc: string; iconName: string }
interface ComplianceBadge { label: string; iconName: string }

// ── Icon map ──────────────────────────────────────────────────────────────────
const ICON_MAP: Record<string, React.ElementType> = {
  Globe, History, UserCheck, ClipboardCheck, Trash2, FileKey, FileSearch, RefreshCw,
  EyeOff, Fingerprint, Scale, Lock, ShieldAlert, FileText, ShieldCheck,
};

// ── Defaults ──────────────────────────────────────────────────────────────────
const DEFAULT_METRICS = JSON.stringify([
  { label: 'Data Residency',   value: 'EU & IND', iconName: 'Globe'         },
  { label: 'Right to Erasure', value: 'Instant',  iconName: 'History'       },
  { label: 'Consent Logic',    value: 'Active',   iconName: 'UserCheck'     },
  { label: 'Data Audits',      value: 'Monthly',  iconName: 'ClipboardCheck'},
]);

const DEFAULT_RIGHTS = JSON.stringify([
  { title: 'Right to Erasure',    desc: 'Candidates can request complete deletion of their profile, Neural Ledger, and AI interview transcripts at any time.',                                               iconName: 'Trash2',     color: 'text-red-400',     bg: 'bg-red-500/10',     border: 'border-red-500/30'     },
  { title: 'Data Portability',    desc: 'Users can export their complete AI assessment scores and technical matrices in machine-readable JSON or PDF formats.',                                              iconName: 'FileKey',    color: 'text-blue-400',    bg: 'bg-blue-500/10',    border: 'border-blue-500/10'    },
  { title: 'Right to Access',     desc: 'Total transparency. Candidates can view the exact logic and criteria the AI engine used to calculate their scores.',                                                iconName: 'FileSearch', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30' },
  { title: 'Right to Rectification', desc: 'Easily update or correct profile information, GitHub links, and work history before or after an AI evaluation.',                                               iconName: 'RefreshCw',  color: 'text-cyan-400',    bg: 'bg-cyan-500/10',    border: 'border-cyan-500/30'    },
]);

const DEFAULT_PROCESS_STEPS = JSON.stringify([
  { title: 'Redaction Layer',       desc: 'Automated stripping of names and locations from technical code reviews.',                                           iconName: 'EyeOff'      },
  { title: 'Neural Ledger Storage', desc: 'Technical scores are cryptographically hashed on a decentralized TiDB cluster.',                                   iconName: 'Fingerprint' },
  { title: 'Localized Shredding',   desc: 'Instant data deletion across all backup nodes upon candidate request.',                                             iconName: 'Trash2'      },
]);

const DEFAULT_BADGES = JSON.stringify([
  { label: 'SOC 2 Type II',  iconName: 'Lock'        },
  { label: 'GDPR Ready',     iconName: 'ShieldAlert'  },
  { label: 'ISO 27001',      iconName: 'FileText'     },
  { label: 'CCPA Compliant', iconName: 'Globe'        },
]);

const PAGE_KEY = 'hirex-gdpr-compliance';

export default function GDPRCompliancePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', role: 'Candidate / User', requestType: 'Data Export Request' });
  const { get } = usePageContent(PAGE_KEY);

  // ── CMS Values ────────────────────────────────────────────────────────────
  const accentColor      = get('hero', 'accent_color',          '#22d3ee');
  const accentTo         = get('hero', 'accent_to',             '#6366f1');
  const badgeText        = get('hero', 'badge_text',            'EU Privacy Standards');
  const headlinePlain    = get('hero', 'headline_plain',        'Privacy by');
  const headlineAccent   = get('hero', 'headline_accent',       'Default Design');
  const bodyText         = get('hero', 'body_text',             'HireX autonomous hiring infrastructure complies fully with the GDPR, giving candidates absolute control over their digital footprint and technical identity.');
  const primaryBtnLabel  = get('hero', 'primary_btn_label',     'Submit Privacy Request');
  const waNumber         = get('hero', 'whatsapp_number',       '918700236923');

  const metricsRaw       = get('metrics', 'stats_json',         DEFAULT_METRICS);

  const rightsTitle      = get('rights', 'section_title',       'Candidate Empowerment');
  const rightsSubtitle   = get('rights', 'section_subtitle',    'Automated tools to exercise your legal data rights without manual HR intervention.');
  const rightsRaw        = get('rights', 'items_json',          DEFAULT_RIGHTS);

  const processTitle     = get('process', 'section_title',      'How We Process Your Data');
  const processBody      = get('process', 'body_text',          'HireX utilizes a non-identifiable ingestion layer. When you submit code or take an AI assessment, your PII is separated from your technical output.');
  const processImageUrl  = get('process', 'image_url',          'https://img.freepik.com/free-photo/standard-quality-control-concept-m_23-2150041839.jpg?w=1480');
  const processStepsRaw  = get('process', 'steps_json',         DEFAULT_PROCESS_STEPS);

  const badgesRaw        = get('badges', 'items_json',          DEFAULT_BADGES);

  const ctaTitle         = get('cta', 'section_title',          'Exercise Your Privacy.');
  const ctaBody          = get('cta', 'body_text',              'Whether you need a full data export or are requesting complete erasure from the Neural Ledger, our DPO is ready to assist.');
  const ctaBtnLabel      = get('cta', 'btn_label',              'Initialize Privacy Request');

  const modalTitle       = get('modal', 'title',                'Data Protection Office');
  const modalSubtitle    = get('modal', 'subtitle',             'Submit your request securely');
  const modalBtnLabel    = get('modal', 'btn_label',            'Submit Secure Request');
  const modalFooterNote  = get('modal', 'footer_note',          'Destination: DPO_OFFICE_IND (+91 870023 6923)');

  // ── Parsed ────────────────────────────────────────────────────────────────
  const metrics      = safeParse<MetricStat[]>(metricsRaw, []);
  const rights       = safeParse<CandidateRight[]>(rightsRaw, []);
  const processSteps = safeParse<ProcessStep[]>(processStepsRaw, []);
  const badges       = safeParse<ComplianceBadge[]>(badgesRaw, []);

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `*HireX Privacy/GDPR Request*%0A%0A*Name:* ${formData.name}%0A*Email:* ${formData.email}%0A*Role:* ${formData.role}%0A*Request Type:* ${formData.requestType}%0A%0A_Requesting formal data handling review._`;
    window.open(`https://wa.me/${waNumber}?text=${message}`, '_blank');
    setIsModalOpen(false);
  };

  return (
    <main className="min-h-screen relative overflow-hidden bg-[#020617] text-white font-sans">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] md:w-[900px] h-[500px] md:h-[900px] blur-[150px] rounded-full translate-x-1/4 -translate-y-1/4"
          style={{ background: `${accentColor}1a` }} />
        <div className="absolute bottom-0 left-0 w-[400px] md:w-[700px] h-[400px] md:h-[700px] blur-[120px] rounded-full -translate-x-1/4 translate-y-1/4"
          style={{ background: `${accentTo}1a` }} />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] opacity-20" />
      </div>

      <Navbar />

      <div className="relative z-10 pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* ── HERO ───────────────────────────────────────────────────────── */}
          <div className="max-w-4xl mx-auto text-center mb-16 md:mb-24 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono uppercase tracking-widest mb-6"
              style={{ background: `${accentColor}1a`, border: `1px solid ${accentColor}4d`, color: accentColor, boxShadow: `0 0 20px ${accentColor}33` }}>
              <Scale className="w-3.5 h-3.5 md:w-4 md:h-4" /> {badgeText}
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6 leading-tight">
              {headlinePlain}{' '}
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(to right, ${accentColor}, ${accentTo})` }}>
                {headlineAccent}
              </span>
            </h1>
            <p className="text-sm md:text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto mb-10">{bodyText}</p>
            <button onClick={() => setIsModalOpen(true)}
              className="w-full sm:w-auto px-8 py-4 font-black rounded-xl transition-all flex items-center justify-center gap-2 group mx-auto"
              style={{ background: accentColor, color: '#020617', boxShadow: `0 0 20px ${accentColor}66` }}>
              {primaryBtnLabel} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* ── METRICS ────────────────────────────────────────────────────── */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-20 md:mb-32">
            {metrics.map((stat, idx) => {
              const Icon = ICON_MAP[stat.iconName] ?? Globe;
              return (
                <div key={idx} className="bg-slate-900/40 backdrop-blur-md border border-white/10 p-6 md:p-8 rounded-2xl md:rounded-[2rem] text-center flex flex-col items-center transition-all duration-300 shadow-xl"
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = `${accentColor}4d`}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)'}>
                  <Icon className="w-6 h-6 md:w-8 md:h-8 mb-4" style={{ color: accentColor }} />
                  <h3 className="text-2xl md:text-3xl font-black text-white mb-1">{stat.value}</h3>
                  <p className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-slate-500">{stat.label}</p>
                </div>
              );
            })}
          </div>

          {/* ── CANDIDATE RIGHTS ───────────────────────────────────────────── */}
          <div className="mb-20 md:mb-32">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">{rightsTitle}</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">{rightsSubtitle}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {rights.map((right, idx) => {
                const Icon = ICON_MAP[right.iconName] ?? ShieldCheck;
                return (
                  <div key={idx} className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 md:p-10 hover:border-white/20 transition-all duration-300 group overflow-hidden relative shadow-2xl">
                    <div className={`absolute -right-10 -bottom-10 w-40 h-40 ${right.bg} blur-3xl rounded-full opacity-50 group-hover:opacity-100 transition-opacity`} />
                    <div className="flex flex-col sm:flex-row items-start gap-6 relative z-10">
                      <div className={`w-14 h-14 rounded-2xl ${right.bg} border ${right.border} flex items-center justify-center shrink-0 shadow-lg`}>
                        <Icon className={`w-7 h-7 ${right.color}`} />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white mb-3">{right.title}</h3>
                        <p className="text-slate-400 text-sm md:text-base leading-relaxed">{right.desc}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── PROCESS / SPLIT ────────────────────────────────────────────── */}
          <div className="rounded-[2rem] md:rounded-[3rem] p-8 md:p-16 mb-20 md:mb-32 shadow-2xl overflow-hidden"
            style={{ background: '#0b0f1f', border: `1px solid ${accentColor}33`, boxShadow: `0 0 50px ${accentColor}1a` }}>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-black mb-6 leading-tight text-white">{processTitle}</h2>
                <p className="text-slate-400 leading-relaxed mb-8 text-base">{processBody}</p>
                <div className="space-y-6">
                  {processSteps.map((item, i) => {
                    const Icon = ICON_MAP[item.iconName] ?? EyeOff;
                    return (
                      <div key={i} className="flex items-start gap-4">
                        <div className="w-8 h-8 mt-1 rounded-full flex items-center justify-center shrink-0"
                          style={{ background: `${accentColor}33` }}>
                          <Icon className="w-4 h-4" style={{ color: accentColor }} />
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
                  style={{ backgroundImage: `linear-gradient(to right, ${accentColor}, ${accentTo})` }} />
                <div className="relative aspect-video w-full rounded-3xl overflow-hidden border border-white/10 bg-slate-900 flex items-center justify-center">
                  <img src={processImageUrl} alt="GDPR Privacy Shield"
                    className="absolute w-full h-full object-cover transition-all duration-700" />
                </div>
              </div>
            </div>
          </div>

          {/* ── COMPLIANCE BADGES ──────────────────────────────────────────── */}
          <div className="text-center mb-20 md:mb-32">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em] mb-10">Compliance & Security Standards</p>
            <div className="flex flex-wrap justify-center gap-6 md:gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
              {badges.map((badge, i) => {
                const Icon = ICON_MAP[badge.iconName] ?? ShieldCheck;
                return (
                  <div key={i} className="flex flex-col items-center gap-2">
                    <Icon className="w-8 h-8 text-white" />
                    <span className="text-[10px] font-bold text-white uppercase">{badge.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── CTA BANNER ─────────────────────────────────────────────────── */}
          <div className="max-w-5xl mx-auto p-8 md:p-14 rounded-[2rem] md:rounded-[3rem] flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden"
            style={{ background: 'linear-gradient(to bottom right, #0f172a, #0b0f1f)', border: `1px solid ${accentColor}4d` }}>
            <div className="relative z-10 text-center md:text-left max-w-xl">
              <h2 className="text-2xl md:text-4xl font-black text-white mb-4">{ctaTitle}</h2>
              <p className="text-sm md:text-lg leading-relaxed" style={{ color: `${accentColor}cc` }}>{ctaBody}</p>
            </div>
            <button onClick={() => setIsModalOpen(true)}
              className="relative z-10 w-full md:w-auto px-8 py-4 font-black rounded-2xl hover:scale-105 transition-transform flex items-center justify-center gap-2"
              style={{ background: accentColor, color: '#020617', boxShadow: `0 10px 40px ${accentColor}4d` }}>
              {ctaBtnLabel} <Send className="w-5 h-5" />
            </button>
          </div>

        </div>
      </div>

      {/* ── MODAL ──────────────────────────────────────────────────────────── */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-300">
          <div className="relative w-full max-w-lg bg-[#0b0f1f] rounded-[2.5rem] overflow-hidden shadow-2xl"
            style={{ border: `1px solid ${accentColor}4d`, boxShadow: `0 0 50px ${accentColor}33` }}>
            <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 p-2 text-slate-500 hover:text-white transition-colors bg-white/5 rounded-full z-10">
              <X className="w-5 h-5" />
            </button>
            <div className="p-8 md:p-10 relative">
              <div className="absolute -top-20 -left-20 w-40 h-40 blur-3xl rounded-full" style={{ background: `${accentColor}33` }} />
              <div className="mb-8 text-center relative z-10">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 border shadow-xl"
                  style={{ background: `${accentColor}1a`, borderColor: `${accentColor}33`, color: accentColor }}>
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white">{modalTitle}</h3>
                <p className="text-slate-400 text-sm mt-1">{modalSubtitle}</p>
              </div>
              <form onSubmit={handleWhatsAppSubmit} className="space-y-4 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input required type="text" placeholder="Full Name"
                    className="bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-white outline-none w-full"
                    onFocus={e => (e.target as HTMLInputElement).style.borderColor = accentColor}
                    onBlur={e => (e.target as HTMLInputElement).style.borderColor = 'rgba(255,255,255,0.1)'}
                    value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                  <input required type="email" placeholder="Your Email"
                    className="bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-white outline-none w-full"
                    onFocus={e => (e.target as HTMLInputElement).style.borderColor = accentColor}
                    onBlur={e => (e.target as HTMLInputElement).style.borderColor = 'rgba(255,255,255,0.1)'}
                    value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                </div>
                <select className="bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-slate-300 outline-none w-full appearance-none"
                  value={formData.role} onChange={e => setFormData({ ...formData, role: e.target.value })}>
                  <option value="Candidate / User" className="bg-slate-900 text-white">I am a Candidate</option>
                  <option value="Enterprise / Employer" className="bg-slate-900 text-white">I am an Employer</option>
                  <option value="Legal Agent" className="bg-slate-900 text-white">I am a Legal Agent</option>
                </select>
                <select className="bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-slate-300 outline-none w-full appearance-none"
                  value={formData.requestType} onChange={e => setFormData({ ...formData, requestType: e.target.value })}>
                  <option value="Data Export Request" className="bg-slate-900 text-white">Request Data Export (Portability)</option>
                  <option value="Account Deletion Request" className="bg-slate-900 text-white">Request Account Deletion (Erasure)</option>
                  <option value="General Privacy Inquiry" className="bg-slate-900 text-white">General Privacy Inquiry</option>
                </select>
                <button type="submit"
                  className="w-full font-black py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg active:scale-95 mt-6"
                  style={{ background: accentColor, color: '#020617' }}>
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
    </main>
  );
}