// app/hirex/data-security/page.tsx
'use client';

import React, { useState } from 'react';
import Navbar from '@/components/hirex/layout/Navbar';
import Footer from '@/components/hirex/home/Footer';
import {
  ShieldCheck, Lock, Key, Database,
  Server, Fingerprint, EyeOff, FileCode2,
  CheckCircle2, X, Send, ArrowRight, Shield,
  Activity, Network, Globe, LockKeyhole
} from 'lucide-react';
import { usePageContent } from '@/hooks/usePageContent';

function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

// ── Types ─────────────────────────────────────────────────────────────────────
interface TelemetryStat  { label: string; value: string; iconName: string; color: string }
interface SecurityPillar { title: string; desc: string; iconName: string; colSpan: string; color: string; bg: string; border: string }
interface CheckItem      { text: string }

// ── Icon map ──────────────────────────────────────────────────────────────────
const ICON_MAP: Record<string, React.ElementType> = {
  Shield, Activity, Fingerprint, Globe, EyeOff, Key, Database, LockKeyhole, ShieldCheck, Lock, Server,
};

// ── Defaults ──────────────────────────────────────────────────────────────────
const DEFAULT_TELEMETRY = JSON.stringify([
  { label: 'Threats Mitigated',  value: '24.1k+',    iconName: 'Shield',      color: 'text-emerald-400' },
  { label: 'Encryption Uptime',  value: '100%',       iconName: 'Activity',    color: 'text-teal-400'    },
  { label: 'Neural Audit Trail', value: 'Immutable',  iconName: 'Fingerprint', color: 'text-cyan-400'    },
  { label: 'Global Compliance',  value: 'Certified',  iconName: 'Globe',       color: 'text-blue-400'    },
]);

const DEFAULT_PILLARS = JSON.stringify([
  { title: 'Zero-Trust Architecture',   desc: 'Every request, whether from an internal microservice or an external ATS API, is explicitly authenticated and authorized.',                                                 iconName: 'EyeOff',   colSpan: 'lg:col-span-2', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30' },
  { title: 'AES-256 Encryption',        desc: 'All candidate PII, codebase logs, and AI neural hashes are encrypted at rest and in transit.',                                                                           iconName: 'Key',      colSpan: 'lg:col-span-1', color: 'text-teal-400',    bg: 'bg-teal-500/10',    border: 'border-teal-500/30'    },
  { title: 'Data Residency',            desc: 'Deploy localized TiDB instances to ensure data never leaves your sovereign borders (EU, US, IND).',                                                                     iconName: 'Database', colSpan: 'lg:col-span-1', color: 'text-cyan-400',    bg: 'bg-cyan-500/10',    border: 'border-cyan-500/30'    },
  { title: 'Automated Threat Defense',  desc: 'The Gemini AI engine continuously monitors session logs for IP anomalies, mirroring, and DDOS patterns.',                                                               iconName: 'Shield',   colSpan: 'lg:col-span-2', color: 'text-blue-400',    bg: 'bg-blue-500/10',    border: 'border-blue-500/30'    },
]);

const DEFAULT_CHECK_ITEMS = JSON.stringify([
  { text: 'Sovereign Cloud Deployment (EU, US, Asia)'    },
  { text: 'PII Data Anonymization on Ingestion'          },
  { text: 'Automated Right-to-be-Forgotten Execution'    },
  { text: 'Dedicated Security Isolated Environments'     },
]);

const PAGE_KEY = 'hirex-data-security';

export default function DataSecurityPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', company: '', requirement: 'Request Security Whitepaper' });
  const { get } = usePageContent(PAGE_KEY);

  // ── CMS Values ────────────────────────────────────────────────────────────
  const accentColor      = get('hero', 'accent_color',           '#10b981');
  const accentTo         = get('hero', 'accent_to',              '#22d3ee');
  const badgeText        = get('hero', 'badge_text',             'Enterprise-Grade Protocols');
  const headlinePlain    = get('hero', 'headline_plain',         'Uncompromisable');
  const headlineAccent   = get('hero', 'headline_accent',        'Data Defense');
  const bodyText         = get('hero', 'body_text',              'Built for high-stakes hiring. We treat your corporate technical matrices and candidate PII as sovereign assets, protected by cryptographic neural logging.');
  const primaryBtnLabel  = get('hero', 'primary_btn_label',      'Access Compliance Vault');
  const waNumber         = get('hero', 'whatsapp_number',        '918700236923');

  const telemetryRaw     = get('telemetry', 'stats_json',        DEFAULT_TELEMETRY);

  const pillarsTitle     = get('pillars', 'section_title',       'Advanced Protection Matrix');
  const pillarsSubtitle  = get('pillars', 'section_subtitle',    'Enterprise infrastructure engineered for absolute data integrity across every layer.');
  const pillarsRaw       = get('pillars', 'items_json',          DEFAULT_PILLARS);

  const residencyTitle   = get('residency', 'section_title',     'Data Residency & Sovereignty');
  const residencyBody    = get('residency', 'body_text',         'HireX leverages localized TiDB serverless clusters to guarantee that sensitive hiring data never leaves your preferred jurisdiction.');
  const residencyImageUrl= get('residency', 'image_url',         'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop');
  const checkItemsRaw    = get('residency', 'check_items_json',  DEFAULT_CHECK_ITEMS);
  const infra_badge      = get('residency', 'infra_badge_label', 'INFRA_SECURED');

  const ctaTitle         = get('cta', 'section_title',           'Validate Our Security.');
  const ctaBody          = get('cta', 'body_text',               "Request access to our latest SOC2 Type II reports, penetration testing summaries, and architectural deep-dives.");
  const ctaBtnLabel      = get('cta', 'btn_label',               'Contact Security Lead');

  const modalTitle       = get('modal', 'title',                 'Enterprise InfoSec Portal');
  const modalSubtitle    = get('modal', 'subtitle',              'Direct encrypted link to our compliance team.');
  const modalBtnLabel    = get('modal', 'btn_label',             'Confirm Request & Connect');
  const modalFooterNote  = get('modal', 'footer_note',           'Secured Transmission: +91 870023 6923');

  // ── Parsed ────────────────────────────────────────────────────────────────
  const telemetry  = safeParse<TelemetryStat[]>(telemetryRaw, []);
  const pillars    = safeParse<SecurityPillar[]>(pillarsRaw, []);
  const checkItems = safeParse<CheckItem[]>(checkItemsRaw, []);

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `*HireX Security Inquiry*%0A%0A*Name:* ${formData.name}%0A*Email:* ${formData.email}%0A*Company:* ${formData.company}%0A*Request:* ${formData.requirement}%0A%0A_Requesting compliance review._`;
    window.open(`https://wa.me/${waNumber}?text=${message}`, '_blank');
    setIsModalOpen(false);
  };

  return (
    <main className="min-h-screen relative overflow-hidden bg-[#020617] text-white selection:bg-emerald-500/30 font-sans">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] md:w-[900px] h-[500px] blur-[120px] rounded-full translate-x-1/4"
          style={{ background: `${accentColor}1a` }} />
        <div className="absolute bottom-0 left-0 w-[400px] md:w-[700px] h-[400px] blur-[120px] rounded-full -translate-x-1/4"
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
              <ShieldCheck className="w-3.5 h-3.5 md:w-4 md:h-4" /> {badgeText}
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6 leading-tight">
              {headlinePlain}{' '}
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(to right, ${accentColor}, ${accentTo})` }}>
                {headlineAccent}
              </span>
            </h1>
            <p className="text-sm md:text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto mb-10">{bodyText}</p>
            <button onClick={() => setIsModalOpen(true)}
              className="w-full sm:w-auto px-8 py-4 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 group mx-auto"
              style={{ background: accentColor, boxShadow: `0 0 20px ${accentColor}4d` }}>
              {primaryBtnLabel} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* ── TELEMETRY STATS ────────────────────────────────────────────── */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-20 md:mb-32">
            {telemetry.map((stat, idx) => {
              const Icon = ICON_MAP[stat.iconName] ?? Shield;
              return (
                <div key={idx} className="bg-slate-900/40 backdrop-blur-md border border-white/10 p-6 md:p-8 rounded-2xl md:rounded-[2rem] text-center flex flex-col items-center transition-all duration-300"
                  style={{ ['--hover-border' as any]: `${accentColor}4d` }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = `${accentColor}4d`}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)'}>
                  <Icon className={`w-6 h-6 md:w-8 md:h-8 mb-4 ${stat.color}`} />
                  <h3 className="text-2xl md:text-3xl font-black text-white mb-1">{stat.value}</h3>
                  <p className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-slate-500">{stat.label}</p>
                </div>
              );
            })}
          </div>

          {/* ── SECURITY PILLARS ───────────────────────────────────────────── */}
          <div className="mb-20 md:mb-32">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">{pillarsTitle}</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">{pillarsSubtitle}</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {pillars.map((feat, idx) => {
                const Icon = ICON_MAP[feat.iconName] ?? Shield;
                return (
                  <div key={idx} className={`${feat.colSpan} bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 md:p-10 hover:border-white/20 transition-all duration-300 group overflow-hidden relative shadow-2xl`}>
                    <div className={`absolute -right-10 -bottom-10 w-40 h-40 ${feat.bg} blur-3xl rounded-full opacity-50 group-hover:opacity-100 transition-opacity`} />
                    <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl ${feat.bg} border ${feat.border} flex items-center justify-center mb-6 relative z-10 shadow-lg`}>
                      <Icon className={`w-6 h-6 md:w-7 md:h-7 ${feat.color}`} />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-3 relative z-10">{feat.title}</h3>
                    <p className="text-slate-400 text-sm md:text-base leading-relaxed relative z-10 max-w-md">{feat.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── RESIDENCY / SPLIT SECTION ──────────────────────────────────── */}
          <div className="rounded-[2rem] md:rounded-[3rem] p-8 md:p-16 mb-20 md:mb-32 shadow-2xl overflow-hidden"
            style={{ background: '#0b0f1f', border: `1px solid ${accentColor}33`, boxShadow: `0 0 50px ${accentColor}1a` }}>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1 relative group">
                <div className="absolute -inset-1 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000"
                  style={{ backgroundImage: `linear-gradient(to right, ${accentColor}, ${accentTo})` }} />
                <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 bg-slate-900 flex items-center justify-center">
                  <img src={residencyImageUrl} alt="Cyber Network Infrastructure"
                    className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-700" />
                  <div className="relative z-10 text-center">
                    <LockKeyhole className="w-16 h-16 mx-auto mb-4 animate-pulse" style={{ color: accentColor }} />
                    <span className="px-6 py-2 rounded-full font-mono text-xs tracking-widest"
                      style={{ background: `${accentColor}1a`, border: `1px solid ${accentColor}4d`, color: accentColor }}>
                      {infra_badge}
                    </span>
                  </div>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight">{residencyTitle}</h2>
                <p className="text-slate-400 leading-relaxed mb-8 text-lg">{residencyBody}</p>
                <div className="space-y-4">
                  {checkItems.map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0"
                        style={{ background: `${accentColor}33` }}>
                        <CheckCircle2 className="w-4 h-4" style={{ color: accentColor }} />
                      </div>
                      <span className="text-sm md:text-base text-slate-300">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── CTA BANNER ─────────────────────────────────────────────────── */}
          <div className="max-w-5xl mx-auto p-8 md:p-14 rounded-[2rem] md:rounded-[3rem] flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden"
            style={{ background: 'linear-gradient(to bottom right, #0f172a, #0b0f1f)', border: `1px solid ${accentColor}33` }}>
            <div className="relative z-10 text-center md:text-left max-w-xl">
              <h2 className="text-3xl md:text-4xl font-black text-white mb-4">{ctaTitle}</h2>
              <p className="text-sm md:text-lg" style={{ color: `${accentColor}cc` }}>{ctaBody}</p>
            </div>
            <button onClick={() => setIsModalOpen(true)}
              className="relative z-10 w-full md:w-auto px-8 py-4 text-white font-black rounded-2xl hover:scale-105 transition-all flex items-center justify-center gap-2 group"
              style={{ background: accentColor, boxShadow: `0 10px 40px ${accentColor}4d` }}>
              {ctaBtnLabel} <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </div>
      </div>

      <Footer />

      {/* ── MODAL ──────────────────────────────────────────────────────────── */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-300">
          <div className="relative w-full max-w-lg bg-[#0b0f1f] rounded-[2rem] overflow-hidden shadow-2xl"
            style={{ border: `1px solid ${accentColor}4d`, boxShadow: `0 0 50px ${accentColor}33` }}>
            <button onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 p-2 text-slate-500 hover:text-white transition-colors bg-white/5 rounded-full z-10">
              <X className="w-5 h-5" />
            </button>
            <div className="p-8 md:p-10 relative">
              <div className="absolute -top-20 -left-20 w-40 h-40 blur-3xl rounded-full"
                style={{ background: `${accentColor}33` }} />
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
                    className="bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-white outline-none w-full transition-all"
                    style={{ ['--tw-ring-color' as any]: accentColor }}
                    onFocus={e => (e.target as HTMLInputElement).style.borderColor = accentColor}
                    onBlur={e => (e.target as HTMLInputElement).style.borderColor = 'rgba(255,255,255,0.1)'}
                    value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                  <input required type="email" placeholder="Official Email"
                    className="bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-white outline-none w-full transition-all"
                    onFocus={e => (e.target as HTMLInputElement).style.borderColor = accentColor}
                    onBlur={e => (e.target as HTMLInputElement).style.borderColor = 'rgba(255,255,255,0.1)'}
                    value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                </div>
                <div className="relative">
                  <Server className="absolute left-4 top-4 w-4 h-4 text-slate-500" />
                  <input required type="text" placeholder="Organization Name"
                    className="bg-white/5 border border-white/10 rounded-xl p-4 pl-12 text-sm text-white outline-none w-full transition-all"
                    onFocus={e => (e.target as HTMLInputElement).style.borderColor = accentColor}
                    onBlur={e => (e.target as HTMLInputElement).style.borderColor = 'rgba(255,255,255,0.1)'}
                    value={formData.company} onChange={e => setFormData({ ...formData, company: e.target.value })} />
                </div>
                <select className="bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-slate-300 outline-none w-full appearance-none transition-all"
                  value={formData.requirement} onChange={e => setFormData({ ...formData, requirement: e.target.value })}>
                  <option value="Request Security Whitepaper" className="bg-slate-900">Request Security Whitepaper</option>
                  <option value="SOC2 / ISO Certifications" className="bg-slate-900">Request SOC2 / ISO Certifications</option>
                  <option value="Penetration Test Reports" className="bg-slate-900">Penetration Test Reports</option>
                </select>
                <button type="submit"
                  className="w-full text-white font-black py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg active:scale-95"
                  style={{ background: accentColor }}>
                  {modalBtnLabel} <Send className="w-4 h-4" />
                </button>
                <p className="text-[10px] text-center text-slate-500 uppercase tracking-widest font-mono mt-6 border-t border-white/5 pt-4">
                  {modalFooterNote}
                </p>
              </form>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}