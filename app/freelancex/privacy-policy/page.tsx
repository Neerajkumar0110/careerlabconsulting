// app/freelancex/privacy-policy/page.tsx

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  ShieldCheck, Lock, Eye, Database,
  Server, Fingerprint, Network, Mail,
} from 'lucide-react';

import Navbar from '@/components/freelancex/layout/HomeNavbar';
import Footer from '@/components/freelancex/landing/Footer';
import { usePageContent } from '@/hooks/usePageContent';

// ── Icon maps ─────────────────────────────────────────────────────────────────
const DIRECTIVE_ICON_MAP: Record<string, React.ElementType> = {
  Database, Network, Lock, Fingerprint, Eye, ShieldCheck, Server,
};

// ── Types ─────────────────────────────────────────────────────────────────────
interface PolicyBullet  { label: string; text: string }
interface PolicySection {
  id: string; title: string; icon: string; color: string;
  intro: string; bullets: PolicyBullet[]; note: string;
}

function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

// ── Default ───────────────────────────────────────────────────────────────────
const DEFAULT_SECTIONS = JSON.stringify([
  {
    id: '01', title: 'Telemetry & Node Data Collection', icon: 'Database', color: 'text-blue-400',
    intro: 'To operate the FreelanceX autonomous network, we collect specific data points from registered nodes (users) and enterprise clients. This includes:',
    bullets: [
      { label: 'Identity Vectors',    text: 'Name, professional email, verified phone numbers, and cryptographic wallet addresses.' },
      { label: 'Technical Footprint', text: 'GitHub repositories, past sprint histories, tech stack proficiency, and AI assessment scores.' },
      { label: 'System Telemetry',    text: 'IP addresses, browser types, and interaction logs within our secure application matrix.' },
    ],
    note: '',
  },
  {
    id: '02', title: 'Data Utilization & Processing', icon: 'Network', color: 'text-indigo-400',
    intro: 'Your data is strictly processed to optimize the matching algorithm and secure the ecosystem. We utilize your data to:',
    bullets: [
      { label: '', text: 'Execute zero-latency matchmaking between elite talent and enterprise requirements.' },
      { label: '', text: 'Process secure escrow payments and automate contract generation.' },
      { label: '', text: 'Detect and neutralize fraudulent activity or unauthorized access attempts.' },
    ],
    note: 'We do not sell, rent, or lease your biological or technical data to third-party brokers under any circumstances.',
  },
  {
    id: '03', title: 'Cryptographic Security Standards', icon: 'Lock', color: 'text-emerald-400',
    intro: 'The 0x99 Protocol enforces military-grade security. All data traversing our network is subjected to:',
    bullets: [
      { label: 'End-to-End Encryption (E2EE)', text: 'AES-256 encryption for data at rest and TLS 1.3 for data in transit.' },
      { label: 'Zero-Trust Architecture',      text: 'Continuous authentication is required for every internal API request.' },
      { label: 'Decentralized Vaults',         text: 'Sensitive financial and personal identifiers are stored in isolated, air-gapped server nodes.' },
    ],
    note: '',
  },
  {
    id: '04', title: 'Node Access & Data Sovereignty', icon: 'Fingerprint', color: 'text-purple-400',
    intro: 'You maintain total sovereignty over your digital footprint. Under international data protection laws (including GDPR and CCPA), you have the right to:',
    bullets: [
      { label: '', text: 'Request a complete export of your neural and technical profile data.' },
      { label: '', text: 'Demand the absolute erasure of your node from our ecosystem ("Right to be Forgotten").' },
      { label: '', text: 'Restrict the processing of your data for specific matchmaking algorithms.' },
    ],
    note: '',
  },
  {
    id: '05', title: 'Tracking & Cookie Protocols', icon: 'Eye', color: 'text-amber-400',
    intro: 'Our interface utilizes minimal cryptographic cookies to maintain session states and verify user integrity. These include:',
    bullets: [
      { label: 'Authentication Tokens', text: 'Strictly necessary for maintaining your secure login state.' },
      { label: 'Security Analytics',    text: 'Used to detect DDoS attacks and anomalous behavior.' },
    ],
    note: '',
  },
]);

// Tailwind color class → hex
const COLOR_HEX: Record<string, string> = {
  'text-blue-400':   '#60a5fa', 'text-indigo-400': '#818cf8',
  'text-emerald-400':'#34d399', 'text-purple-400': '#c084fc',
  'text-amber-400':  '#fbbf24',
};

export default function PrivacyPolicyPage() {
  const { get } = usePageContent('freelancex-privacy-policy');

  // ── Hero ──────────────────────────────────────────────────────────────────
  const badgeText       = get('hero', 'badge_text',      'Legal Documentation');
  const headlinePlain   = get('hero', 'headline_plain',  'Data Privacy');
  const headlineAccent  = get('hero', 'headline_accent', 'Protocol.');
  const effectiveDate   = get('hero', 'effective_date',  'Effective Date: March 2026');
  const versionLabel    = get('hero', 'version_label',   'Version: 2.1.0');
  const accentFrom      = get('hero', 'accent_from',     '#60a5fa');
  const accentTo        = get('hero', 'accent_to',       '#818cf8');

  // ── Intro ─────────────────────────────────────────────────────────────────
  const introBody = get('intro', 'body_text', 'At Career Lab Consulting (FreelanceX Ecosystem), we engineer trust. Your privacy is not a feature; it is the foundational architecture of our protocol. This document outlines how we extract, encrypt, and manage the data flowing through our network. By initializing a connection to our servers, you acknowledge and consent to these directives.');

  // ── Directives ────────────────────────────────────────────────────────────
  const policySections = safeParse<PolicySection[]>(get('directives', 'sections_json', DEFAULT_SECTIONS), []);

  // ── Contact CTA ───────────────────────────────────────────────────────────
  const ctaHeadline    = get('contact_cta', 'headline',      'Data Protection Node');
  const ctaBody        = get('contact_cta', 'body_text',     'For inquiries regarding data extraction, sovereignty, or to execute your "Right to be Forgotten", contact our compliance architecture team.');
  const ctaBtnLabel    = get('contact_cta', 'btn_label',     'Contact Legal Operations');
  const contactEmail   = get('contact_cta', 'contact_email', 'careerlabconsulting@gmail.com');

  return (
    <div className="min-h-screen bg-[#020617] text-slate-300 flex flex-col font-sans selection:bg-indigo-500/30 overflow-x-hidden">
      <Navbar />

      <main className="flex-grow pt-24 md:pt-32 pb-16 md:pb-24 relative">
        <div className="absolute top-0 right-0 w-full md:w-[600px] h-[300px] md:h-[500px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none -z-0" />
        <div className="absolute top-1/2 left-0 w-full md:w-[600px] h-[300px] md:h-[500px] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none -z-0" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-soft-light pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16 md:space-y-20">

          {/* ── HERO ─────────────────────────────────────────────────────── */}
          <div className="text-center space-y-6">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
              <ShieldCheck size={14} className="text-emerald-400" />
              <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">{badgeText}</span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-black tracking-tighter leading-tight text-white">
              {headlinePlain}{' '}
              <span className="text-transparent bg-clip-text"
                style={{ backgroundImage: `linear-gradient(to right, ${accentFrom}, ${accentTo})` }}>
                {headlineAccent}
              </span>
            </motion.h1>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="flex items-center justify-center gap-4 text-xs font-bold uppercase tracking-widest text-slate-500">
              <span>{effectiveDate}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-slate-700" />
              <span>{versionLabel}</span>
            </motion.div>
          </div>

          {/* ── INTRO ────────────────────────────────────────────────────── */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="bg-[#0a0f1d]/80 border border-white/10 rounded-3xl p-6 md:p-10 backdrop-blur-xl shadow-2xl">
            <p className="text-sm md:text-base leading-relaxed text-slate-300 font-medium">{introBody}</p>
          </motion.div>

          {/* ── POLICY DIRECTIVES ────────────────────────────────────────── */}
          <div className="space-y-8 md:space-y-12">
            {policySections.map((section, idx) => {
              const Icon = DIRECTIVE_ICON_MAP[section.icon] ?? Database;
              const iconColor = COLOR_HEX[section.color] ?? '#60a5fa';
              return (
                <motion.div key={section.id} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-100px' }} transition={{ delay: idx * 0.1 }}
                  className="relative pl-6 md:pl-12 group">
                  <div className="absolute left-0 top-0 bottom-0 w-1 rounded-full"
                    style={{ background: `linear-gradient(to bottom, ${iconColor}33, transparent)` }} />

                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-[#0a0f1d] border border-white/10 flex items-center justify-center shadow-lg">
                      <Icon size={20} style={{ color: iconColor }} />
                    </div>
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Directive {section.id}</span>
                      <h2 className="text-xl md:text-2xl font-black text-white">{section.title}</h2>
                    </div>
                  </div>

                  <div className="text-sm md:text-base leading-relaxed font-medium bg-white/[0.01] p-6 rounded-2xl border border-white/[0.03]">
                    <p className="mb-4 text-slate-300">{section.intro}</p>
                    <ul className="list-disc pl-5 space-y-2 text-slate-400">
                      {section.bullets.map((b, bi) => (
                        <li key={bi}>
                          {b.label && <strong className="text-slate-300">{b.label}: </strong>}
                          {b.text}
                        </li>
                      ))}
                    </ul>
                    {section.note && (
                      <p className="mt-4 text-sm italic border-l-2 pl-4 py-1"
                        style={{ color: '#34d399cc', borderColor: 'rgba(52,211,153,0.5)', background: 'rgba(52,211,153,0.05)' }}>
                        Note: {section.note}
                      </p>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* ── CONTACT CTA ──────────────────────────────────────────────── */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="relative rounded-[2rem] overflow-hidden border border-indigo-500/20 p-8 md:p-12 text-center shadow-2xl"
            style={{ background: 'linear-gradient(to bottom right, rgba(49,46,129,0.4), #020617)' }}>
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light pointer-events-none" />
            <div className="relative z-10 space-y-6">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto border border-indigo-500/20"
                style={{ background: 'rgba(99,102,241,0.1)' }}>
                <Server className="text-indigo-400" size={28} />
              </div>
              <h3 className="text-2xl md:text-3xl font-black text-white">{ctaHeadline}</h3>
              <p className="text-slate-400 text-sm md:text-base max-w-lg mx-auto">{ctaBody}</p>
              <div className="pt-4">
                <a href={`mailto:${contactEmail}`}
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-black font-black text-[10px] md:text-xs uppercase tracking-widest rounded-xl hover:bg-indigo-50 hover:text-indigo-900 transition-all shadow-xl">
                  <Mail size={16} /> {ctaBtnLabel}
                </a>
              </div>
            </div>
          </motion.div>

        </div>
      </main>

      <Footer />
    </div>
  );
}