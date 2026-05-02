// app/hirex/audit-logs/page.tsx
'use client';

import React, { useState } from 'react';
import Navbar from '@/components/hirex/layout/Navbar';
import Footer from '@/components/hirex/home/Footer';
import {
  FileSignature, Search, CheckCircle2,
  Database, Lock, Activity, Download, Terminal,
  Globe, Key, UserCog, FileOutput,
  X, Send, Building, Clock,
  ShieldCheck, FileCheck, HardDrive, Cpu, Fingerprint,
  Zap, ArrowRight
} from 'lucide-react';
import { usePageContent } from '@/hooks/usePageContent';

function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

// ── Types ─────────────────────────────────────────────────────────────────────
interface StatItem      { label: string; value: string; iconName: string; color: string }
interface ComplianceCard{ title: string; desc: string; iconName: string; color: string }
interface AuditEvent    { id: string; timestamp: string; actor: string; ip: string; type: string; action: string; status: string; iconName: string; color: string; bg: string; border: string }
interface FilterTag     { label: string }

// ── Icon map ──────────────────────────────────────────────────────────────────
const ICON_MAP: Record<string, React.ElementType> = {
  Activity, Database, Zap, Download, ShieldCheck, FileCheck, HardDrive,
  Key, FileOutput, Lock, UserCog, Globe, Terminal, Fingerprint, Cpu, FileSignature,
};

// ── Defaults ──────────────────────────────────────────────────────────────────
const DEFAULT_STATS = JSON.stringify([
  { label: 'Events Recorded',  value: '14.2M+',  iconName: 'Activity',  color: 'text-blue-400'   },
  { label: 'Retention Policy', value: '7 Years',  iconName: 'Database',  color: 'text-amber-400'  },
  { label: 'Sync Latency',     value: '< 2ms',   iconName: 'Zap',       color: 'text-emerald-400'},
  { label: 'Export Readiness', value: 'Verified', iconName: 'Download',  color: 'text-purple-400' },
]);

const DEFAULT_COMPLIANCE_CARDS = JSON.stringify([
  { title: 'SOC 2 Type II',    desc: 'Continuous monitoring and logging of all organizational security practices and data access.',                                                       iconName: 'ShieldCheck', color: 'text-blue-400'    },
  { title: 'GDPR Compliance',  desc: 'Automated audit trails for all Data Erasure (Right to be Forgotten) and Portability requests.',                                                   iconName: 'FileCheck',   color: 'text-emerald-400' },
  { title: 'ISO 27001',        desc: 'Systematic logging of information security risks and administrative configuration changes.',                                                       iconName: 'HardDrive',   color: 'text-purple-400'  },
]);

const DEFAULT_AUDIT_EVENTS = JSON.stringify([
  { id: 'LOG-992-SEC', timestamp: '2026-03-01 14:32:05 UTC', actor: 'admin@careerlab.com',    ip: '192.168.1.4',   type: 'SECURITY',      action: 'Generated new Enterprise API Key for Greenhouse Integration.',              status: 'success',  iconName: 'Key',       color: 'text-amber-400',   bg: 'bg-amber-500/10',   border: 'border-amber-500/20'  },
  { id: 'LOG-991-CMP', timestamp: '2026-03-01 12:15:22 UTC', actor: 'system_core_dpo',        ip: 'Internal',       type: 'COMPLIANCE',    action: 'Executed GDPR Data Erasure request for candidate HX-5521.',                status: 'success',  iconName: 'FileOutput', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20'},
  { id: 'LOG-990-ACC', timestamp: '2026-03-01 10:05:11 UTC', actor: 'hr_director@client.co',  ip: '45.22.19.88',    type: 'ACCESS',        action: 'Failed SSO Login attempt. Reason: Invalid SAML Assertion.',                status: 'critical', iconName: 'Lock',       color: 'text-rose-400',    bg: 'bg-rose-500/10',    border: 'border-rose-500/20'   },
  { id: 'LOG-989-CFG', timestamp: '2026-03-01 09:45:00 UTC', actor: 'tech_lead@client.co',   ip: '112.44.55.12',   type: 'CONFIGURATION', action: "Updated AI Assessment Matrix rigor from 'Standard' to 'Extreme'.",         status: 'info',     iconName: 'UserCog',    color: 'text-blue-400',    bg: 'bg-blue-500/10',    border: 'border-blue-500/20'   },
]);

const DEFAULT_FILTER_TAGS = JSON.stringify([
  { label: 'All Events' }, { label: 'Security' }, { label: 'Access' },
  { label: 'Compliance' }, { label: 'Configuration' }, { label: 'System' },
]);

const PAGE_KEY = 'hirex-audit-logs';

export default function AuditLogsPage() {
  const [searchQuery, setSearchQuery]   = useState('');
  const [activeFilter, setActiveFilter] = useState('All Events');
  const [isModalOpen, setIsModalOpen]   = useState(false);
  const [formData, setFormData]         = useState({ name: '', email: '', company: '', timeframe: 'Last 30 Days' });
  const { get } = usePageContent(PAGE_KEY);

  // ── CMS Values ────────────────────────────────────────────────────────────
  const accentColor      = get('hero', 'accent_color',         '#f59e0b');
  const accentTo         = get('hero', 'accent_to',            '#f97316');
  const badgeText        = get('hero', 'badge_text',           'Immutable Audit Infrastructure');
  const headlinePlain    = get('hero', 'headline_plain',       'System');
  const headlineAccent   = get('hero', 'headline_accent',      'Audit Trail');
  const bodyText         = get('hero', 'body_text',            'Real-time cryptographic logging of every administrative action. satisfing SOC2, GDPR, and ISO 27001 requirements for enterprise data governance.');
  const waNumber         = get('hero', 'whatsapp_number',      '918700236923');

  const statsRaw         = get('stats', 'items_json',          DEFAULT_STATS);

  const complianceTitle  = get('compliance', 'section_title',  'Compliance Standards');
  const compCardsRaw     = get('compliance', 'cards_json',     DEFAULT_COMPLIANCE_CARDS);

  const explorerTitle    = get('explorer', 'section_title',    'Live Log Explorer');
  const searchPlaceholder= get('explorer', 'search_placeholder','Filter by Actor Email, IP Address, or Action...');
  const auditEventsRaw   = get('explorer', 'events_json',      DEFAULT_AUDIT_EVENTS);
  const filterTagsRaw    = get('explorer', 'filter_tags_json', DEFAULT_FILTER_TAGS);
  const exportBtnLabel   = get('explorer', 'export_btn_label', 'Request Secure Export');

  const hashTitle        = get('hashing', 'section_title',     'SHA-256 Neural Hashing');
  const hashBody         = get('hashing', 'body_text',         'Data tampering is prevented through automatic cryptographic hashing. Every log entry is hashed against the previous block, creating an unbreakable chain of evidence.');
  const hashImageUrl     = get('hashing', 'image_url',         'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop');

  const ctaHeadline      = get('cta', 'headline',              'Request Enterprise Audit Access');
  const ctaBody          = get('cta', 'body_text',             'Connect with our compliance engineering team to discuss log forwarding, custom retention policies, and high-frequency audit reports.');
  const ctaBtnLabel      = get('cta', 'btn_label',             'Contact Compliance Hub');

  const modalTitle       = get('modal', 'title',               'Export Audit Data');
  const modalSubtitle    = get('modal', 'subtitle',            'Securely extract logs for organizational compliance.');
  const modalBtnLabel    = get('modal', 'btn_label',           'Send Encrypted Request');
  const modalFooterNote  = get('modal', 'footer_note',         'Destination: Audit_Comms_IND (+91 870023 6923)');

  // ── Parsed ────────────────────────────────────────────────────────────────
  const stats          = safeParse<StatItem[]>(statsRaw, []);
  const compCards      = safeParse<ComplianceCard[]>(compCardsRaw, []);
  const auditEvents    = safeParse<AuditEvent[]>(auditEventsRaw, []);
  const filterTags     = safeParse<FilterTag[]>(filterTagsRaw, []);

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `*HireX Audit Export Request*%0A%0A*Name:* ${formData.name}%0A*Email:* ${formData.email}%0A*Company:* ${formData.company}%0A*Audit Timeframe:* ${formData.timeframe}%0A%0A_Requesting secure CSV/PDF export of system audit logs._`;
    window.open(`https://wa.me/${waNumber}?text=${message}`, '_blank');
    setIsModalOpen(false);
  };

  const filteredLogs = auditEvents.filter(log => {
    const matchesSearch = log.actor.toLowerCase().includes(searchQuery.toLowerCase()) || log.action.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'All Events' || log.type.toLowerCase() === activeFilter.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  return (
    <main className="min-h-screen relative bg-[#020617] text-white font-sans">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] md:w-[800px] h-[500px] blur-[120px] rounded-full translate-x-1/4 -translate-y-1/4"
          style={{ background: `${accentColor}0d` }} />
        <div className="absolute bottom-0 left-0 w-[400px] md:w-[600px] h-[400px] blur-[120px] rounded-full -translate-x-1/4 translate-y-1/4" style={{ background: 'rgba(37,99,235,0.05)' }} />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] opacity-20" />
      </div>

      <Navbar />

      <div className="relative z-10 pt-32 pb-16 md:pt-40 md:pb-24">

        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-20">
          <div className="text-center max-w-3xl mx-auto mb-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono uppercase tracking-widest mb-6"
              style={{ background: `${accentColor}1a`, border: `1px solid ${accentColor}4d`, color: accentColor }}>
              <FileSignature className="w-3.5 h-3.5" /> {badgeText}
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
              {headlinePlain}{' '}
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(to right, ${accentColor}, ${accentTo})` }}>
                {headlineAccent}
              </span>
            </h1>
            <p className="text-base md:text-lg text-slate-400 leading-relaxed">{bodyText}</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {stats.map((stat, i) => {
              const Icon = ICON_MAP[stat.iconName] ?? Activity;
              return (
                <div key={i} className="bg-slate-900/60 backdrop-blur-xl border border-white/10 p-5 md:p-6 rounded-2xl md:rounded-3xl transition-all group"
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = `${accentColor}4d`}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)'}>
                  <Icon className={`w-6 h-6 mb-3 ${stat.color} group-hover:scale-110 transition-transform`} />
                  <h3 className="text-2xl md:text-3xl font-black text-white">{stat.value}</h3>
                  <p className="text-[10px] uppercase font-bold text-slate-500 tracking-widest mt-1">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── COMPLIANCE CARDS ───────────────────────────────────────────────── */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-20 md:mb-32">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {compCards.map((card, idx) => {
              const Icon = ICON_MAP[card.iconName] ?? ShieldCheck;
              return (
                <div key={idx} className="bg-white/[0.02] border border-white/10 p-8 rounded-3xl hover:bg-white/[0.04] transition-colors group">
                  <Icon className={`w-10 h-10 ${card.color} mb-6 group-hover:animate-pulse`} />
                  <h3 className="text-xl font-bold mb-2 text-white">{card.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{card.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── LOG EXPLORER ───────────────────────────────────────────────────── */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-20 md:mb-32" id="log-explorer">
          <div className="bg-slate-900/60 backdrop-blur-3xl border border-white/10 rounded-[2rem] md:rounded-[3rem] shadow-2xl overflow-hidden flex flex-col">
            {/* Search & Filter Bar */}
            <div className="p-6 md:p-10 border-b border-white/5 flex flex-col lg:flex-row gap-6 items-center justify-between bg-black/40">
              <div className="relative w-full lg:w-[450px]">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input type="text" placeholder={searchPlaceholder} value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-sm text-white outline-none transition-all placeholder:text-slate-600"
                  onFocus={e => (e.target as HTMLInputElement).style.borderColor = accentColor}
                  onBlur={e => (e.target as HTMLInputElement).style.borderColor = 'rgba(255,255,255,0.1)'} />
              </div>
              <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto no-scrollbar pb-1 lg:pb-0">
                {filterTags.map(tag => (
                  <button key={tag.label} onClick={() => setActiveFilter(tag.label)}
                    className="px-5 py-2.5 rounded-xl text-xs font-bold transition-all border whitespace-nowrap"
                    style={activeFilter === tag.label
                      ? { background: accentColor, borderColor: accentColor, color: '#0f172a', boxShadow: `0 0 20px ${accentColor}66` }
                      : { background: 'rgba(255,255,255,0.05)', color: '#64748b', borderColor: 'rgba(255,255,255,0.1)' }}>
                    {tag.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Column Headers */}
            <div className="hidden lg:grid grid-cols-12 gap-6 px-10 py-5 bg-black/60 border-b border-white/5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
              <div className="col-span-3">Timestamp & Type</div>
              <div className="col-span-3">Origin (Actor / IP)</div>
              <div className="col-span-5">Audit Description</div>
              <div className="col-span-1 text-right">Integrity</div>
            </div>

            {/* Log Rows */}
            <div className="p-6 md:p-10 space-y-4">
              {filteredLogs.length === 0 ? (
                <div className="py-20 text-center text-slate-500 flex flex-col items-center">
                  <Terminal className="w-12 h-12 mb-4 opacity-20" />
                  <p className="text-lg font-medium italic">No audit records match your current security parameters.</p>
                </div>
              ) : filteredLogs.map(log => {
                const Icon = ICON_MAP[log.iconName] ?? Key;
                return (
                  <div key={log.id} className="group bg-white/[0.02] border border-white/5 p-6 rounded-2xl transition-all lg:grid lg:grid-cols-12 lg:gap-6 lg:items-center flex flex-col gap-4 relative"
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = `${accentColor}4d`}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.05)'}>
                    <div className="lg:col-span-3 flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-2xl ${log.bg} border ${log.border} flex items-center justify-center shrink-0`}>
                        <Icon className={`w-6 h-6 ${log.color}`} />
                      </div>
                      <div>
                        <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-black tracking-widest ${log.bg} ${log.color} mb-1.5`}>{log.type}</span>
                        <p className="text-xs text-slate-400 font-mono flex items-center gap-1.5"><Clock className="w-3 h-3" /> {log.timestamp.split(' ')[1]}</p>
                      </div>
                    </div>
                    <div className="lg:col-span-3">
                      <p className="text-sm font-bold text-white mb-1 truncate">{log.actor}</p>
                      <p className="text-xs text-slate-500 font-mono flex items-center gap-1.5"><Globe className="w-3 h-3" /> {log.ip}</p>
                    </div>
                    <div className="lg:col-span-5">
                      <p className="text-sm text-slate-300 leading-relaxed">{log.action}</p>
                      <p className="text-[10px] text-slate-600 font-mono mt-2 uppercase tracking-tighter">Event_ID: {log.id}</p>
                    </div>
                    <div className="lg:col-span-1 flex lg:justify-end">
                      <div className={`w-2 h-2 rounded-full ${log.status === 'critical' ? 'bg-rose-500 animate-pulse shadow-[0_0_10px_#f43f5e]' : 'bg-emerald-500 shadow-[0_0_10px_#10b981]'}`} />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer */}
            <div className="p-8 md:p-10 border-t border-white/5 bg-black/40 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <p className="text-white font-bold flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Database Integrity Verified</p>
                <p className="text-xs text-slate-500 mt-1">Showing latest system events. SHA-256 Checksum Active.</p>
              </div>
              <button onClick={() => setIsModalOpen(true)}
                className="w-full sm:w-auto px-10 py-4 text-white font-bold rounded-2xl transition-all flex items-center justify-center gap-2 hover:-translate-y-1"
                style={{ background: accentColor, boxShadow: `0 0 20px ${accentColor}4d` }}>
                <Download className="w-5 h-5" /> {exportBtnLabel}
              </button>
            </div>
          </div>
        </section>

        {/* ── HASHING SPLIT ──────────────────────────────────────────────────── */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-20 md:mb-32">
          <div className="bg-slate-900/50 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] overflow-hidden flex flex-col lg:flex-row items-stretch shadow-2xl">
            <div className="lg:w-1/2 relative min-h-[300px] lg:min-h-full">
              <img src={hashImageUrl} alt="Cryptographic Hashing Visualization"
                className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale-[50%]" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#020617] hidden lg:block" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent lg:hidden" />
            </div>
            <div className="lg:w-1/2 p-8 md:p-16 flex flex-col justify-center relative z-10">
              <Fingerprint className="w-12 h-12 mb-6" style={{ color: accentColor }} />
              <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight">{hashTitle}</h2>
              <p className="text-slate-400 text-lg leading-relaxed mb-8">{hashBody}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {['Point-in-time Recovery', 'Verifiable Action History'].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 border"
                      style={{ background: `${accentColor}1a`, borderColor: `${accentColor}33` }}>
                      <CheckCircle2 className="w-4 h-4" style={{ color: accentColor }} />
                    </div>
                    <p className="text-sm text-slate-300">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── FINAL CTA ──────────────────────────────────────────────────────── */}
        <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="p-8 md:p-16 rounded-[2.5rem] md:rounded-[3.5rem] relative overflow-hidden shadow-2xl flex flex-col items-center text-center"
            style={{ backgroundImage: `linear-gradient(to bottom right, ${accentColor}, ${accentTo})` }}>
            <div className="absolute inset-0 opacity-20 pointer-events-none"
              style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/cubes.png')" }} />
            <div className="relative z-10 max-w-2xl">
              <Cpu className="w-16 h-16 text-white/40 mx-auto mb-8 animate-pulse" />
              <h2 className="text-3xl md:text-5xl font-black text-white mb-6">{ctaHeadline}</h2>
              <p className="text-amber-100 text-lg mb-10 leading-relaxed">{ctaBody}</p>
              <button onClick={() => setIsModalOpen(true)}
                className="w-full sm:w-auto px-10 py-5 bg-white text-black font-black rounded-2xl hover:scale-105 transition-transform shadow-2xl flex items-center justify-center gap-3 group mx-auto">
                <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" /> {ctaBtnLabel}
              </button>
            </div>
          </div>
        </section>

      </div>

      <Footer />

      {/* ── MODAL ──────────────────────────────────────────────────────────── */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-300">
          <div className="relative w-full max-w-lg bg-slate-900 rounded-[2rem] overflow-hidden shadow-2xl"
            style={{ border: `1px solid ${accentColor}33`, boxShadow: `0 0 80px ${accentColor}33` }}>
            <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 p-2 text-slate-500 hover:text-white transition-colors bg-white/5 rounded-full z-10">
              <X className="w-5 h-5" />
            </button>
            <div className="p-8 md:p-10 relative">
              <div className="absolute -top-20 -left-20 w-40 h-40 blur-3xl rounded-full pointer-events-none"
                style={{ background: `${accentColor}1a` }} />
              <div className="mb-8 text-center relative z-10">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 border shadow-xl"
                  style={{ background: `${accentColor}1a`, borderColor: `${accentColor}33`, color: accentColor }}>
                  <FileOutput className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white">{modalTitle}</h3>
                <p className="text-slate-400 text-sm mt-1 leading-relaxed">{modalSubtitle}</p>
              </div>
              <form onSubmit={handleWhatsAppSubmit} className="space-y-4 relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input required type="text" placeholder="Admin Name"
                    className="bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-white outline-none w-full transition-all"
                    onFocus={e => (e.target as HTMLInputElement).style.borderColor = accentColor}
                    onBlur={e => (e.target as HTMLInputElement).style.borderColor = 'rgba(255,255,255,0.1)'}
                    value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                  <input required type="email" placeholder="Corporate Email"
                    className="bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-white outline-none w-full transition-all"
                    onFocus={e => (e.target as HTMLInputElement).style.borderColor = accentColor}
                    onBlur={e => (e.target as HTMLInputElement).style.borderColor = 'rgba(255,255,255,0.1)'}
                    value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                </div>
                <div className="relative">
                  <Building className="absolute left-4 top-4 w-4 h-4 text-slate-500" />
                  <input required type="text" placeholder="Organization / Agency Name"
                    className="bg-white/5 border border-white/10 rounded-xl p-4 pl-12 text-sm text-white outline-none w-full transition-all"
                    onFocus={e => (e.target as HTMLInputElement).style.borderColor = accentColor}
                    onBlur={e => (e.target as HTMLInputElement).style.borderColor = 'rgba(255,255,255,0.1)'}
                    value={formData.company} onChange={e => setFormData({ ...formData, company: e.target.value })} />
                </div>
                <select className="bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-slate-300 outline-none w-full appearance-none transition-all"
                  value={formData.timeframe} onChange={e => setFormData({ ...formData, timeframe: e.target.value })}>
                  <option value="Last 24 Hours" className="bg-slate-900">Last 24 Hours</option>
                  <option value="Last 7 Days" className="bg-slate-900">Last 7 Days</option>
                  <option value="Last 30 Days" className="bg-slate-900">Last 30 Days</option>
                </select>
                <button type="submit"
                  className="w-full text-white font-black py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg active:scale-95 mt-6"
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

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </main>
  );
}