'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BrainCircuit, Code2, Briefcase, ArrowRight, ShieldCheck, Timer, Trophy, Sparkles } from 'lucide-react';
import { usePageContent } from '@/hooks/usePageContent';

// ── Types ─────────────────────────────────────────────────────────────────────
interface CTACard { icon: string; title: string; body: string; color: string }

function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

const DEFAULT_CARDS: CTACard[] = [
  { icon: 'Timer',     title: '15 Mins',    body: 'Time-bound strict evaluation format.',  color: 'blue'   },
  { icon: 'Code2',     title: '25 Hard Qs', body: 'Advanced algorithms & system design.', color: 'rose'   },
  { icon: 'Shield',    title: 'Proctored',  body: 'AI tracks tab switches & focus loss.',  color: 'green'  },
  { icon: 'Briefcase', title: 'Direct Hire', body: 'Skip round 1. Go straight to HR.',    color: 'purple' },
];

const ICON_MAP: Record<string, React.ElementType> = { Timer, Code2, Shield: ShieldCheck, Briefcase, BrainCircuit, Trophy, Sparkles };
function resolveIcon(name: string): React.ElementType { return ICON_MAP[name] ?? Timer; }

const COLOR_CLASSES: Record<string, { bg: string; border: string; icon: string; hover: string }> = {
  blue:   { bg: 'bg-blue-500/10',   border: 'hover:border-blue-500/30',   icon: 'text-blue-400',   hover: '' },
  rose:   { bg: 'bg-rose-500/10',   border: 'hover:border-rose-500/30',   icon: 'text-rose-400',   hover: '' },
  green:  { bg: 'bg-green-500/10',  border: 'hover:border-green-500/30',  icon: 'text-green-400',  hover: '' },
  purple: { bg: 'bg-purple-500/20', border: 'hover:border-purple-400/50', icon: 'text-purple-400', hover: '' },
};

// ── Component ─────────────────────────────────────────────────────────────────
export default function AptitudeCTA() {
  const { get } = usePageContent('hirex-home');

  const accentColor  = get('aptitude_cta', 'accent_color', '#a855f7');
  const badgeText    = get('aptitude_cta', 'badge_text',   'Exclusive College Hiring');
  const headline1    = get('aptitude_cta', 'headline_1',   'Prove Your Skills.');
  const headline2    = get('aptitude_cta', 'headline_2',   'Get Hired Instantly.');
  const bodyText     = get('aptitude_cta', 'body_text',    'Bypass the traditional resume screening. Take our AI-Proctored Technical Assessment. Top 10% scorers are directly fast-tracked to final HR interviews.');
  const btnLabel     = get('aptitude_cta', 'btn_label',    'Start Assessment');
  const btnHref      = get('aptitude_cta', 'btn_href',     '/hirex/aptitude-test');
  const footnote     = get('aptitude_cta', 'footnote',     '* Requires a stable internet connection and webcam access.');
  const cardsRaw     = get('aptitude_cta', 'cards_json',   '[]');
  const cards        = safeParse<CTACard[]>(cardsRaw, DEFAULT_CARDS);

  return (
    <section className="relative py-24 md:py-32 px-4 bg-[#020617] overflow-hidden border-t border-white/5 font-sans">
      {/* Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] blur-[150px] rounded-full pointer-events-none" style={{ background: `${accentColor}1a` }} />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Badge */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border" style={{ background: `${accentColor}1a`, borderColor: `${accentColor}33`, color: accentColor }}>
            <Sparkles size={14} className="animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">{badgeText}</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="lg:col-span-7 text-center lg:text-left">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tight mb-6">
              {headline1} <br />
              <span className="text-transparent bg-clip-text italic" style={{ backgroundImage: `linear-gradient(135deg, ${accentColor}, #f472b6, #3b82f6)` }}>
                {headline2}
              </span>
            </h2>
            <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto lg:mx-0 mb-8 leading-relaxed font-medium">{bodyText}</p>

            <Link href={btnHref}>
              <button className="group relative inline-flex items-center justify-center gap-3 bg-white text-black px-10 py-5 rounded-[1.5rem] text-sm font-black uppercase tracking-widest hover:bg-slate-200 transition-all active:scale-95 overflow-hidden w-full sm:w-auto"
                style={{ boxShadow: `0 0 40px ${accentColor}4d` }}>
                <span className="relative z-10 flex items-center gap-2">
                  {btnLabel} <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            </Link>
            <p className="mt-5 text-xs text-slate-500 font-medium">{footnote}</p>
          </motion.div>

          {/* Right — cards */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 grid grid-cols-2 gap-4 mt-8 lg:mt-0">
            {cards.map((card, i) => {
              const Icon = resolveIcon(card.icon);
              const colors = COLOR_CLASSES[card.color] ?? COLOR_CLASSES.blue;
              const isPurple = card.color === 'purple';
              return (
                <div key={i} className={`${isPurple ? 'bg-gradient-to-br from-purple-900/40 to-transparent border-purple-500/30' : `bg-gradient-to-br from-white/[0.05] to-transparent border-white/10`} border p-6 rounded-3xl backdrop-blur-sm ${colors.border} transition-colors group relative overflow-hidden`}>
                  {isPurple && <div className="absolute top-0 right-0 p-3 opacity-20 group-hover:opacity-40 transition-opacity"><Trophy size={40} className="text-purple-400" /></div>}
                  <div className={`w-10 h-10 rounded-full ${colors.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon size={20} className={colors.icon} />
                  </div>
                  <h4 className="text-white font-bold text-lg mb-1 relative z-10">{card.title}</h4>
                  <p className={`${isPurple ? 'text-purple-200/60' : 'text-slate-400'} text-xs leading-relaxed relative z-10`}>{card.body}</p>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}