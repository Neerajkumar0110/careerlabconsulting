// app/freelancex/terms-of-service/page.tsx

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  FileSignature, Handshake, ShieldAlert,
  Wallet, Code2, Gavel, Terminal,
  ChevronRight, Scale,
  MapPin, Phone, Mail,
} from 'lucide-react';
import Link from 'next/link';

import Navbar from '@/components/freelancex/layout/HomeNavbar';
import Footer from '@/components/freelancex/landing/Footer';
import { usePageContent } from '@/hooks/usePageContent';

// ── Icon maps ─────────────────────────────────────────────────────────────────
const CLAUSE_ICON_MAP: Record<string, React.ElementType> = {
  Handshake, ShieldAlert, Wallet, Code2, Scale, FileSignature, Gavel,
};

// ── Types ─────────────────────────────────────────────────────────────────────
interface ClauseBullet  { label: string; text: string; highlight?: string }
interface TermsClause {
  id: string;
  title: string;
  icon: string;
  color: string;
  intro: string;
  bullets: ClauseBullet[];
  note: string;
  noteColor?: string;
}
interface ContactItem { icon: string; title: string; value: string; color: string }

function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

// ── Color map ─────────────────────────────────────────────────────────────────
const COLOR_HEX: Record<string, string> = {
  'text-blue-400':   '#60a5fa',
  'text-indigo-400': '#818cf8',
  'text-emerald-400':'#34d399',
  'text-purple-400': '#c084fc',
  'text-red-400':    '#f87171',
  'text-amber-400':  '#fbbf24',
  'text-slate-400':  '#94a3b8',
};

// ── Defaults ──────────────────────────────────────────────────────────────────
const DEFAULT_CLAUSES = JSON.stringify([
  {
    id: '01', title: 'The Handshake Protocol (Acceptance)', icon: 'Handshake', color: 'text-blue-400',
    intro: 'By initializing a connection to the FreelanceX matrix (creating an account, deploying a sprint, or accessing the ecosystem), you enter into a legally binding contract with Career Lab Consulting. This agreement supersedes all prior communications.',
    bullets: [],
    note: 'If your biological or corporate entity does not agree with these strict directives, you must immediately terminate your session and disconnect from our servers.',
    noteColor: 'blue',
  },
  {
    id: '02', title: 'Node Eligibility & Identity Integrity', icon: 'ShieldAlert', color: 'text-indigo-400',
    intro: 'Access to the ecosystem is a privilege, not a right. To operate as a Talent Node or Enterprise Client, you must:',
    bullets: [
      { label: '', text: 'Be of legal age (18+) in your jurisdiction of operation.' },
      { label: '', text: 'Provide 100% cryptographically and factually accurate identity data.' },
      { label: '', text: 'Pass our AI-autonomous vetting protocols without the use of third-party proxy manipulation.' },
    ],
    note: 'Falsifying identity or skill metrics will result in immediate permanent expulsion from the network.',
    noteColor: 'amber',
  },
  {
    id: '03', title: 'The Escrow Matrix (Capital Processing)', icon: 'Wallet', color: 'text-emerald-400',
    intro: 'To eradicate financial fraud, all capital exchanges are governed by our centralized Escrow Matrix:',
    bullets: [
      { label: 'Deployment Funding',  text: 'Clients must deposit 100% of the milestone capital into the escrow vault before a sprint begins.' },
      { label: 'Capital Release',     text: 'Funds are automatically disbursed to the Talent Node upon algorithmic or manual verification of the delivered codebase/assets.' },
      { label: 'Dispute Arbitration', text: 'In the event of a protocol breakdown, our internal tribunal will review the codebase and mandate a final, non-negotiable ruling.' },
    ],
    note: '', noteColor: '',
  },
  {
    id: '04', title: 'Intellectual Property Sovereignty', icon: 'Code2', color: 'text-purple-400',
    intro: 'FreelanceX enforces strict IP transfer protocols. Upon the successful release of escrow funds, all intellectual property rights, source code, designs, and architectural blueprints are immediately and irrevocably transferred from the Talent Node to the Enterprise Client.',
    bullets: [],
    note: 'The Talent Node retains zero ownership or licensing rights unless explicitly codified in a separate NDA/Contract.',
    noteColor: 'purple',
  },
  {
    id: '05', title: 'Circumvention & Network Expulsion', icon: 'ShieldAlert', color: 'text-red-400',
    intro: 'The 0x99 Protocol strictly forbids "Platform Circumvention". Specifically:',
    bullets: [
      { label: '', text: 'Attempting to process payments outside the FreelanceX Escrow Matrix after connecting through our network.' },
      { label: '', text: 'Sharing direct contact data (Skype, personal email) prior to initiating a verified contract.' },
    ],
    note: 'Violation triggers an automatic IP ban and potential legal action for lost platform revenue.',
    noteColor: 'red',
  },
  {
    id: '06', title: 'Limitation of System Liability', icon: 'Scale', color: 'text-slate-400',
    intro: 'FreelanceX provides the matching matrix and escrow infrastructure "AS-IS". We do not warrant that the network will be 100% error-free or uninterrupted. In no event shall Career Lab Consulting be held liable for indirect, incidental, or consequential damages resulting from the use of delivered software.',
    bullets: [],
    note: '', noteColor: '',
  },
]);

const DEFAULT_CONTACT = JSON.stringify([
  { icon: 'MapPin', title: 'Headquarters', value: 'DLF Cyber City, 5th Floor, Cyber Green-2, Sec-25, Gurugram, India', color: 'text-blue-400' },
  { icon: 'Phone',  title: 'Direct Line',  value: '+91 870023 6923',                                                     color: 'text-emerald-400' },
  { icon: 'Mail',   title: 'Email Support', value: 'info@careerlabconsulting.com',                                        color: 'text-purple-400' },
]);

const CONTACT_ICON_MAP: Record<string, React.ElementType> = { MapPin, Phone, Mail };
const CONTACT_BG_MAP: Record<string, string> = {
  'text-blue-400':   'bg-blue-500/10 border-blue-500/20 hover:border-blue-500/40',
  'text-emerald-400':'bg-emerald-500/10 border-emerald-500/20 hover:border-emerald-500/40',
  'text-purple-400': 'bg-purple-500/10 border-purple-500/20 hover:border-purple-500/40',
};
const NOTE_STYLE: Record<string, { text: string; border: string; bg: string }> = {
  amber:  { text: 'text-amber-400/80',   border: 'border-amber-500/50',  bg: 'bg-amber-500/5'  },
  red:    { text: 'text-red-400/80',     border: 'border-red-500/50',    bg: 'bg-red-500/5'    },
  blue:   { text: 'text-blue-400/80',    border: 'border-blue-500/50',   bg: 'bg-blue-500/5'   },
  purple: { text: 'text-purple-400/80',  border: 'border-purple-500/50', bg: 'bg-purple-500/5' },
  green:  { text: 'text-emerald-400/80', border: 'border-emerald-500/50',bg: 'bg-emerald-500/5'},
};

export default function TermsOfServicePage() {
  const { get } = usePageContent('freelancex-terms');

  // ── Hero ──────────────────────────────────────────────────────────────────
  const badgeText      = get('hero', 'badge_text',       'Rules of Engagement');
  const headlinePlain  = get('hero', 'headline_plain',   'Master');
  const headlineAccent = get('hero', 'headline_accent',  'Agreement.');
  const versionLabel   = get('hero', 'version_label',    'V 3.4.1');
  const compiledDate   = get('hero', 'compiled_date',    'Last Compiled: March 2026');
  const accentFrom     = get('hero', 'accent_from',      '#94a3b8');
  const accentTo       = get('hero', 'accent_to',        '#64748b');

  // ── Intro terminal ────────────────────────────────────────────────────────
  const terminalCmd    = get('intro', 'terminal_command', '> system.loadLegalDirectives()');
  const terminalLine1  = get('intro', 'terminal_line_1',  'Welcome to the FreelanceX Infrastructure.');
  const terminalLine2  = get('intro', 'terminal_line_2',  'By authenticating your identity and utilizing this platform, you legally bind yourself to the following algorithmic and ethical directives. Read them carefully; ignorance is not a valid defense protocol.');

  // ── Clauses ───────────────────────────────────────────────────────────────
  const clauses        = safeParse<TermsClause[]>(get('clauses', 'clauses_json', DEFAULT_CLAUSES), []);

  // ── Contact ───────────────────────────────────────────────────────────────
  const contactTitle   = get('contact', 'section_title',  'Contact Hub');
  const contactItems   = safeParse<ContactItem[]>(get('contact', 'items_json', DEFAULT_CONTACT), []);

  // ── CTA ───────────────────────────────────────────────────────────────────
  const ctaHeadline    = get('cta', 'headline',          'Initialize Contract');
  const ctaBody        = get('cta', 'body_text',         'If you require clarification on any of the aforementioned directives, contact our legal architecture team before deploying any assets.');
  const ctaBtnAccept   = get('cta', 'btn_accept_label',  'I Accept, Enter Matrix');
  const ctaBtnContact  = get('cta', 'btn_contact_label', 'Contact Legal Node');
  const ctaSignupHref  = get('cta', 'signup_href',       '/freelancex/signup');
  const ctaContactEmail= get('cta', 'contact_email',     'info@careerlabconsulting.com');

  return (
    <div className="min-h-screen bg-[#020617] text-slate-300 flex flex-col font-sans selection:bg-indigo-500/30 overflow-x-hidden">
      <Navbar />

      <main className="flex-grow pt-24 md:pt-32 pb-16 md:pb-24 relative">
        <div className="absolute top-0 left-0 w-full md:w-[600px] h-[300px] md:h-[500px] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none -z-0" />
        <div className="absolute bottom-1/4 right-0 w-full md:w-[600px] h-[300px] md:h-[500px] bg-red-600/5 blur-[120px] rounded-full pointer-events-none -z-0" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-soft-light pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16 md:space-y-20">

          {/* ── HERO ─────────────────────────────────────────────────────── */}
          <div className="text-center space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
              <Gavel size={14} className="text-slate-400" />
              <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">{badgeText}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-black tracking-tighter leading-tight text-white">
              {headlinePlain}{' '}
              <span className="text-transparent bg-clip-text"
                style={{ backgroundImage: `linear-gradient(to right, ${accentFrom}, ${accentTo})` }}>
                {headlineAccent}
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="flex flex-wrap items-center justify-center gap-3 text-xs font-bold uppercase tracking-widest text-slate-500">
              <span className="flex items-center gap-1"><Terminal size={12} /> {versionLabel}</span>
              <span className="hidden sm:block w-1.5 h-1.5 rounded-full bg-slate-700" />
              <span>{compiledDate}</span>
            </motion.div>
          </div>

          {/* ── INTRO TERMINAL ───────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="bg-[#0a0f1d] border border-white/10 rounded-2xl md:rounded-3xl p-6 md:p-8 backdrop-blur-xl shadow-2xl font-mono text-xs md:text-sm text-slate-400">
            <div className="flex gap-2 mb-4 border-b border-white/10 pb-4">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
            </div>
            <p className="text-emerald-400 mb-2">{terminalCmd}</p>
            <p>{terminalLine1}</p>
            <p className="mt-2">{terminalLine2}</p>
          </motion.div>

          {/* ── CLAUSES ──────────────────────────────────────────────────── */}
          <div className="space-y-8 md:space-y-10">
            {clauses.map((clause, idx) => {
              const Icon = CLAUSE_ICON_MAP[clause.icon] ?? FileSignature;
              const iconColor = COLOR_HEX[clause.color] ?? '#94a3b8';
              const noteStyle = NOTE_STYLE[clause.noteColor ?? ''] ?? NOTE_STYLE['green'];
              return (
                <motion.div
                  key={clause.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ delay: idx * 0.07 }}
                  className="bg-white/[0.02] border border-white/5 rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-10 hover:bg-white/[0.04] transition-all group">
                  <div className="flex items-center gap-4 mb-6 border-b border-white/5 pb-6">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-[#020617] border border-white/10 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform"
                      style={{ color: iconColor }}>
                      <Icon size={20} />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-slate-500 tracking-widest uppercase block mb-1">Clause_0x{clause.id}</span>
                      <h2 className="text-lg md:text-2xl font-black text-white leading-tight">{clause.title}</h2>
                    </div>
                  </div>
                  <div className="text-sm md:text-base leading-relaxed font-medium text-slate-300 space-y-4">
                    <p>{clause.intro}</p>
                    {clause.bullets.length > 0 && (
                      <ul className="list-disc pl-5 space-y-2 text-slate-400">
                        {clause.bullets.map((b, bi) => (
                          <li key={bi}>
                            {b.label && <strong className="text-slate-300">{b.label}: </strong>}
                            {b.text}
                          </li>
                        ))}
                      </ul>
                    )}
                    {clause.note && (
                      <p className={`text-sm italic border-l-2 pl-4 py-1 ${noteStyle.text} ${noteStyle.border} ${noteStyle.bg}`}>
                        {clause.note}
                      </p>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* ── CONTACT HUB ──────────────────────────────────────────────── */}
          <div className="pt-8">
            <h3 className="text-center text-2xl font-black text-white mb-8">{contactTitle}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {contactItems.map((item, i) => {
                const Icon = CONTACT_ICON_MAP[item.icon] ?? Mail;
                const bgClass = CONTACT_BG_MAP[item.color] ?? 'bg-slate-500/10 border-slate-500/20 hover:border-slate-500/40';
                const iconColor = COLOR_HEX[item.color] ?? '#94a3b8';
                return (
                  <div key={i} className={`bg-[#0a0f1d]/60 border rounded-3xl p-8 flex flex-col items-center text-center gap-4 transition-colors ${bgClass}`}>
                    <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ background: `${iconColor}1a` }}>
                      <Icon size={24} style={{ color: iconColor }} />
                    </div>
                    <div>
                      <h4 className="text-white font-bold mb-2">{item.title}</h4>
                      <p className="text-slate-400 text-sm leading-relaxed">{item.value}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── CTA ──────────────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="relative rounded-[2rem] md:rounded-[3rem] overflow-hidden bg-gradient-to-br from-[#0a0f1d] to-[#020617] border border-white/10 p-8 md:p-16 text-center shadow-2xl">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light pointer-events-none" />
            <div className="relative z-10 space-y-6">
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto border border-white/10 text-white">
                <FileSignature size={28} />
              </div>
              <h3 className="text-2xl md:text-4xl font-black text-white">{ctaHeadline}</h3>
              <p className="text-slate-400 text-sm md:text-base max-w-lg mx-auto">{ctaBody}</p>
              <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  href={ctaSignupHref}
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 md:py-5 bg-white text-black font-black text-[10px] md:text-xs uppercase tracking-widest rounded-xl hover:bg-slate-200 transition-all shadow-xl">
                  {ctaBtnAccept} <ChevronRight size={16} />
                </Link>
                <a
                  href={`mailto:${ctaContactEmail}`}
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 md:py-5 bg-white/5 border border-white/10 text-white font-black text-[10px] md:text-xs uppercase tracking-widest rounded-xl hover:bg-white/10 transition-all">
                  {ctaBtnContact}
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